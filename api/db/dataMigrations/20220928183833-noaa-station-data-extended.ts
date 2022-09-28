import * as fs from 'fs'

import { parse } from '@fast-csv/parse'
//import { db } from 'api/src/lib/db'
import * as _ from 'radash'

/*
model GeoLocation {
  id  Int @id @default(autoincrement())

  city String
  zip String?

  fips String?
  county String?

  latitude Float?  // ! NON STRING WILL NEED PARSING
  longitude Float? // ! NON STRING WILL NEED PARSING
  elevation Float? // ! NON STRING WILL NEED PARSING

  state String?
  stateAbbrev String?

  stations Station[]
}

model Station {
  code String @id

  geoLocations GeoLocation[]

  gsn String?
  hcn String?
  wmoid String?

  stationName String?

  climateEntries ClimateEntry[]
  climateDataPoints ClimateDataPoint[]
}
*/

const datasetFile = (fileName) => 'api/db/datasets/' + fileName

// original headers
/*
    ID            1-11   Character
    LATITUDE     13-20   Real
    LONGITUDE    22-30   Real
    ELEVATION    32-37   Real
    STATE        39-40   Character
    NAME         42-71   Character
    GSNFLAG      73-75   Character
    HCNFLAG      77-79   Character
    WMOID        81-85   Character
    METHOD*	    87-99   Character
*/
const noaaStationDataHeaders = [
  'code',
  'latitude',
  'longitude',
  'elevation',
  'stateAbbrev',
  'stationName',
  'gsn',
  'hcn',
  'wmoid',
  'method', // method may be missing in noaaStationData
]
const noaaStationDataIndeces = [
  // [0, 12], // map data to look more like this, see noaa-station-zipcodes
  // [12, 18],
  // [18, undefined],
  11, 20, 30, 37, 40, 71, 75, 79, 85, 99,
].map((val, i, arr) => {
  const prev = i > 0 ? arr[i - 1] : -1
  return [prev + 1, val + 1]
})

const handleRecordRow = (rowStr) => {
  const dataRow = {}
  noaaStationDataIndeces.forEach(([start, stop], i) => {
    dataRow[noaaStationDataHeaders[i]] = rowStr.slice(start, stop).trim()
  })
  return dataRow
}

async function _debugWipetable(db) {
  console.error(
    `
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    !!! debugWipeTable has been called, do NOT use in a prod environment !!!
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    `
  )

  await db.$transaction([
    db.geoLocation.updateMany({
      where: {
        NOT: [
          {
            latitude: null,
          },
        ],
      },
      data: {
        latitude: null,
        longitude: null,
        elevation: null,
      },
    }),
  ])

  await db.$transaction([
    db.station.updateMany({
      where: {
        NOT: [
          {
            stationName: null,
          },
        ],
      },
      data: {
        gsn: null,
        hcn: null,
        wmoid: null,
        stationName: null,
      },
    }),
  ])

  console.log('debugWipeTable completed')
}

export default async ({ db }) => {
  // quick table wipe for data integrity while debugging
  await _debugWipetable(db)

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .then(async (noaaStationData: unkown[]) => {

      /*
      const noaaStationDataHeaders = [
      'code',
      'latitude',
      'longitude',
      'elevation',
      'stateAbbrev',
      'stationName',
      'gsn',
      'hcn',
      'wmoid',
      'method', // method may be missing in noaaStationData
    ]
    */
      const geoLocationData = _.pick(noaaStationData, )

      // for (const stationData of stationZipcodeData) {
      //   // find related geoLocationRecords
      //   let geoLocationRecords = await db.geoLocation.findMany({
      //     where: {
      //       OR: [
      //         {
      //           zip: stationData.zip,
      //         },
      //         {
      //           city: stationData.city,
      //         },
      //       ],
      //     },
      //   })

      //   // if there's no records, create one
      //   if (geoLocationRecords.length == 0) {
      //     const newGeoLocationRecord = await db.geoLocation.create({
      //       data: {
      //         city: stationData.city,
      //         zip: stationData.zip,
      //       },
      //     })
      //     // send single element array
      //     geoLocationRecords = [newGeoLocationRecord]
      //   }

      //   const geoLocationConnectionIds = geoLocationRecords.map(({ id }) => {
      //     return { id: id }
      //   })

      //   // create the stationRecord
      //   await db.station.create({
      //     data: {
      //       code: stationData.code,
      //       geoLocations: {
      //         connect: geoLocationConnectionIds,
      //       },
      //     },
      //     include: {
      //       geoLocations: true,
      //     },
      //   })


      }
      console.log(`Created ${stationZipcodeData.length} rows`)
    })
}
