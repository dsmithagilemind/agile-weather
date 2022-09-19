import type { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as _ from 'radash'
import { parse } from '@fast-csv/parse'
import { db } from 'api/src/lib/db'


/*
model GeoLocation {
  id  Int @id @default(autoincrement())

  city String 
  zip Int?

  fips String?
  county String?

  latitude Float
  longitude Float
  elivation Float

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

model ClimateDataPoint {
  cuid  String @id @default(cuid())

  station   Station @relation(fields: [stationCode], references: [code])
  stationCode String

  value String
  flag  String?

  topic String
  period String
  
  climateEntry ClimateEntry @relation(fields: [climateEntryId], references: [id])
  climateEntryId Int
}
model ClimateEntry {
  id  Int @id @default(autoincrement())

  station   Station @relation(fields: [stationCode], references: [code])
  stationCode String

  dataPoints ClimateDataPoint[]
}
*/


/**
 * ! File Order:
 * zipcode-state-data.csv
 * noaa-station-zipcodes
 * noaa-station-data
 * 
 * mly-tavg
 * myl-tmax
 * myl-tmin
 */

const datasetFile = (fileName) => 'api/db/datasets/' + fileName;

/**
 * Reads zipcode-state-data.csv
 */
async function readZipCodeStateData() {

  // override csv column headers to match GeoLocation schema
  // original headers: state_fips,state,state_abbr,zipcode,county,city 
  const geoDataObjectHeaders = [
    "fip", "state", "stateAbbrev", "zip", "county", "city"
  ];

  const handleCsvRow = (csvRowData) => {
    try {
      // cast data
      csvRowData.zip = parseInt(csvRowData.zip);
      await db.geoLocation.create({
        data: {

        }
      })
    }
    catch(e) {
      console.error("Something went wrong parseing this data: ")
      console.log(csvRowData);
      console.error(e);
    }
  }

  try {
    fs.createReadStream(datasetFile('zipcodes-state-data.csv')).pipe(
      parse({headers: geoDataObjectHeaders, skipRows: 1})
      .on('error', error => console.error(error)) // fast-csv parse specific errors
      .on('data', handleCsvRow)
    )
  }
  catch(error) { // unhandled errors, likely from fs
    console.error(error);
  }

}


export default async ({ db }: { db: PrismaClient }) => {
  // Migration here...

  try {

  }






  
}
