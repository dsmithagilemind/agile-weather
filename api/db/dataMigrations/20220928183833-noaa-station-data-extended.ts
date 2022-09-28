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

  const parseDataRowFloats = _.mapValues(
    // @ts-ignore
    _.pick(dataRow, ['latitude', 'longitude', 'elevation']),
    (val) => parseFloat(val)
  )

  return { ...dataRow, ...parseDataRowFloats }
}

async function _rollback(db) {
  console.error(
    `
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    !!! _rollback() has been called, do NOT use this function in a prod environment !!!
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    `
  )

  const resetStationData = _.omit(
    Object.fromEntries(noaaStationDataHeaders.map((key) => [key, null])),
    ['stateAbbrev', 'code', 'method']
  )

  await db.$transaction([
    db.station.updateMany({
      where: {
        NOT: [
          {
            stationName: null,
          },
        ],
      },
      data: resetStationData,
    }),
  ])

  console.log('_rollback() completed')
}

export default async ({ db }) => {
  //await _rollback(db)

  const path = datasetFile('noaa-station-data.txt')
  console.log('Reading data from ' + path)

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
    .then(async (noaaStationData: unkown[]) => {
      for (const noaaStationDataEntry of noaaStationData) {
        // @ts-ignore
        const stationData = _.omit(noaaStationDataEntry, [
          'stateAbbrev',
          'method',
        ])

        await db.station.upsert({
          where: {
            code: stationData.code,
          },
          update: stationData,
          create: stationData,
        })
      }

      console.log(`Created/Updated ${noaaStationData.length} rows`)
    })
}
