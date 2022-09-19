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
*/

const datasetFile = (fileName) => 'api/db/datasets/' + fileName

export default async (prisma) => {
  // override csv column headers to match GeoLocation schema
  // original headers: state_fips,state,state_abbr,zipcode,county,city
  const geoDataObjectHeaders = [
    'fips',
    'state',
    'stateAbbrev',
    'zip',
    'county',
    'city',
  ]

  try {
    const path = datasetFile('zipcode-state-data.csv')
    console.log('reading data from ' + path)

    fs.createReadStream(path).pipe(
      parse({ headers: geoDataObjectHeaders, skipRows: 1 })
        .on('error', (error) => {
          throw error
        }) // fast-csv parse specific errors
        .on('data', (csvRow) => handleCsvRow(prisma.db, csvRow))
        .on('end', (rowCount) =>
          console.log(`Parsed ${rowCount} from ${path} and presisted to db`)
        )
    )
  } catch (error) {
    // unhandled errors, likely from fs
    console.error(error)
    throw error // we REALLY want this error thrown to halt the transaction
  }
}

const handleCsvRow = async (db, csvRowData) => {
  try {
    // parse non-string types
    const geoLocationData = {
      ...csvRowData, // no additional parsing needed
    }

    // first time populating this db entry, safe to just db.table.create

    await db.$transaction([
      db.geoLocation.create({
        data: {
          ...geoLocationData,
        },
      }),
    ])
  } catch (e) {
    // data related errors
    console.warn(csvRowData)
    console.error(e)
    throw e
  }
}
