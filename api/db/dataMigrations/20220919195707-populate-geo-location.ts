import * as fs from 'fs'

import { parse } from '@fast-csv/parse'
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

export default async ({ db }) => {
  await geoLocationTransaction(db.$transaction)
}

const geoLocationTransaction = async ({ db }) => {
  // override csv column headers to match GeoLocation schema
  // original headers: state_fips,state,state_abbr,zipcode,county,city
  const geoDataObjectHeaders = [
    'fip',
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
        .on('error', (error) => console.error(error)) // fast-csv parse specific errors
        .on('data', (csvRow) => handleCsvRow(db, csvRow))
        .on('end', (rowCount) =>
          console.log(`Parsed ${rowCount} from ${path} and presisted to db`)
        )
    )
  } catch (error) {
    // unhandled errors, likely from fs
    console.error(error)
  }
}

const handleCsvRow = async (db, csvRowData) => {
  try {
    // parse non-string types
    const geoLocationData = {
      ...csvRowData,
      ...{
        zip: parseInt(csvRowData.zip),
      },
    }

    // first time populating this db entry, safe to just db.table.create
    await db.geoLocation.create({
      data: {
        ...geoLocationData,
      },
    })
  } catch (e) {
    // data related errors
    console.warn(csvRowData)
    console.error(e)
    throw e
  }
}
