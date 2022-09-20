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

export default async (prisma) => {
  // quick table wipe: await prisma.db.$transaction([prisma.db.geoLocation.deleteMany({})])

  const path = datasetFile('zipcode-state-data.csv')
  console.log('reading data from ' + path)

  await new Promise((resolve, reject) => {
    const data = []

    fs.createReadStream(path).pipe(
      parse({ headers: geoDataObjectHeaders, skipRows: 1 })
        .on('error', (e) => reject(e))
        .on('data', (csvRow) => data.push(handleCsvRow(csvRow)))
        .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} from ${path}`)
          resolve(data)
        })
    )
  })
    .catch((e) => {
      throw e
    })
    .then(async (climateEntries) => {
      // very await on each iteration, but it will have to do
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const entry of climateEntries) {
        await prisma.db.geoLocation.create({ data: entry })
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(`Created ${climateEntries.length} rows`)
    })
}

const handleCsvRow = (csvRowData) => {
  // parse non-string types
  return {
    ...csvRowData, // no additional parsing needed
  }
}
