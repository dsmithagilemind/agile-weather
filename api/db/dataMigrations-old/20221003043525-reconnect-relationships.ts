import * as fs from 'fs'

import { parse } from '@fast-csv/parse'
//import { db } from 'api/src/lib/db'
import * as _ from 'radash'

const datasetFile = (fileName) => 'api/db/datasets/' + fileName

// original headers: USC00298845 87575 Tierra Amarilla
const stationZipcodeHeaders = ['code', 'zip', 'city']
const stationColumnIndices = [
  [0, 12],
  [12, 18],
  [18, undefined],
]

const handleRecordRow = (rowStr) => {
  const dataRow = {}
  stationColumnIndices.forEach(([start, stop], i) => {
    dataRow[stationZipcodeHeaders[i]] = rowStr.slice(start, stop).trim()
  })
  return dataRow
}

export default async ({ db }) => {
  // Migration here...

  console.log('Clearing records')
  // wipe out all the current relationships
  const records = await db.geoLocation.findMany({
    where: {
      stations: {
        some: {},
      },
    },
    include: {
      stations: true,
    },
  })

  const ids = records.map((record) => record.id)

  for (const id of ids) {
    await db.$transaction([
      db.geoLocation.update({
        where: {
          id: id,
        },
        data: {
          stations: {
            set: [],
          },
        },
      }),
    ])
  }

  console.log(`Cleared ${ids.length} records`)

  // ! repeat noaa-station-zipcodes
  // reread the noaa station zipcodes daa
  const path = datasetFile('noaa-station-zipcodes.txt')
  console.log('reading data from ' + path)

  await new Promise((resolve, reject) => {
    const data = []

    fs.createReadStream(path).pipe(
      parse()
        .on('error', (e) => reject(e))
        // data we're accessing won't be parsed correctly, just pass the first entry (the whole line as str)
        .on('data', ([csvRowStr]) => data.push(handleRecordRow(csvRowStr)))
        .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} from ${path}`)
          resolve(data)
        })
    )
  })
    .catch((e) => {
      throw e
    })
    // @ts-ignore
    .then(async (stationZipcodeData: unkown[]) => {
      console.log(
        `Connecting relationships of ${stationZipcodeData.length} station records`
      )
      for (const stationData of stationZipcodeData) {
        // find related geoLocationRecords
        const geoLocationRecords = await db.geoLocation.findMany({
          where: {
            OR: [
              {
                zip: stationData.zip,
              },
              {
                city: stationData.city,
              },
            ],
          },
          include: {
            stations: true,
          },
        })

        if (geoLocationRecords.zip == '79830') {
          console.log(geoLocationRecords)
          console.log(stationData)
          throw new Error('STOP')
        }

        if (geoLocationRecords.length == 0) {
          console.error(stationData)
          throw new Error(
            "Couldn't find matching geoLocation data for above stationData, this shouldn't have happened in this migration"
          )
        }

        const stationRecords = await db.station.findMany({
          where: {
            code: stationData.code,
          },
        })

        const stationRecordIDs = stationRecords.map((stationRecord) => {
          return { id: stationRecord.id }
        })

        for (const geoLocationRecord of geoLocationRecords) {
          let stationsSet = stationRecordIDs
          if (geoLocationRecord.stations) {
            stationsSet = [...stationsSet, ...geoLocationRecord.stations]
          }

          await db.geoLocation.update({
            where: {
              id: geoLocationRecord.id,
            },
            data: {
              stations: {
                set: stationsSet.map((station) => {
                  return { id: station.id }
                }),
              },
            },
          })
        }
      }
      console.log(`Fixed ${stationZipcodeData.length} rows`)
    })
}
