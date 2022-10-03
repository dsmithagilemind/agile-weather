import * as fs from 'fs'

import { parse } from '@fast-csv/parse'
//import { db } from 'api/src/lib/db'
import * as _ from 'radash'

/*
model GeoLocation {
  id  Int @id @default(autoincrement())

  city String
  zip Int? // ! non-string

  fips String?
  county String?

  latitude Float // ! non-string
  longitude Float // ! non-string
  elivation Float // ! non-string

  state String?
  stateAbbrev String

  weatherStations Station[]
}

model Station {
  code String @id

  geoLocation GeoLocation @relation(fields: [geoLocationId], references: [id])
  geoLocationId Int

  gcn String?
  hcn String?
  wmoid String?

  climateEntries ClimateEntry[]
  climateDataPoints ClimateDataPoint[]
}
*/

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

async function _rollback(db) {
  console.error(
    `
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    !!! _rollback() has been called, do NOT use this function in a prod environment !!!
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    `
  )

  const records = await db.geoLocation.findMany({
    where: {
      stations: {
        some: {},
      },
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

  // ! deletes all of station
  await db.$transaction([db.station.deleteMany({})])

  console.log('_rollback() completed')
}

export default async ({ db }) => {
  // await _rollback(db)

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
      for (const stationData of stationZipcodeData) {
        // find related geoLocationRecords
        let geoLocationRecords = await db.geoLocation.findMany({
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
        })

        // if there's no records, create one
        if (geoLocationRecords.length == 0) {
          const newGeoLocationRecord = await db.geoLocation.create({
            data: {
              city: stationData.city,
              zip: stationData.zip,
            },
          })
          // send single element array
          geoLocationRecords = [newGeoLocationRecord]
        }

        const geoLocationConnectionIds = geoLocationRecords.map(({ id }) => {
          return { id: id }
        })

        // create the stationRecord
        await db.station.create({
          data: {
            code: stationData.code,
            geoLocations: {
              connect: geoLocationConnectionIds,
            },
          },
          include: {
            geoLocations: true,
          },
        })
      }
      console.log(`Created ${stationZipcodeData.length} rows`)
    })
}
