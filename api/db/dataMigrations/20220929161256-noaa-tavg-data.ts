import * as fs from 'fs'

import { parse } from '@fast-csv/parse'
//import { db } from 'api/src/lib/db'
import * as _ from 'radash'
/*


model ClimateDataPoint {
  cuid  String @id @default(cuid())

  station   Station @relation(fields: [stationCode], references: [code])
  stationCode String

  label String // ! jan
  value String
  flag  String?

  climateEntry ClimateEntry @relation(fields: [climateEntryId], references: [id])
  climateEntryId Int
}

model ClimateEntry {
  id  Int @id @default(autoincrement())

  station   Station @relation(fields: [stationCode], references: [code])
  stationCode String

  topic String // ! normal-tavg
  period String // ! 1981-2010
  dataSet String // ! noaa-mly-tavg-normal

  dataPoints ClimateDataPoint[]
}


       Variable  Columns  Type
       ----------------------------
       STNID       1- 11  Character
       VALUE1     19- 23  Integer
       FLAG1      24- 24  Character
       - - - - - - - - - - - - - -
       VALUE12    96-100  Integer
       FLAG12    101-101  Character
       ----------------------------

       These variables have the following definitions:

       STNID   is the GHCN-Daily station identification code.
       VALUE1  is the January value.
       FLAG1   is the completeness flag for January. See Flags section below.
       - - - -
       Value12 is the December value.
       Flag12  is the completeness flag for December.

*/
const datasetFilePath = (fileName) => 'api/db/datasets/' + fileName

const noaaMlyTavgNormalFile = datasetFilePath('mly-tavg-normal.txt')

const dataMonths = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

const tavgEntryData = {
  topic: 'normal-tavg',
  period: '1981-2010',
  dataSet: 'noaa-mly-tavg-normal',
}

interface IDataPoint {
  label: string
  value: string
  flag: string
}

interface IClimateEntry {
  code: string
  dataPoints: IDataPoint[]
}
class DataPoint implements IDataPoint {
  label: string
  value: string
  flag: string
  constructor(dataStr: string, label: string) {
    this.label = label
    // 766R => 766, R
    this.flag = dataStr.slice(-1)
    this.value = dataStr.slice(0, -1)
  }
}

class ClimateEntryData implements IClimateEntry {
  static dataPointsSplitRegex = /([^\s]+)/g

  dataPoints: IDataPoint[]
  code: string

  constructor(rowStr: string) {
    this.code = rowStr.substring(0, 12).trim()

    const dataArr: string[] = rowStr
      .substring(12)
      .match(ClimateEntryData.dataPointsSplitRegex)

    this.dataPoints = dataArr.map((str, i) => new DataPoint(str, dataMonths[i]))
  }
}

async function _rollback(db) {
  console.error(
    `
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    !!! _rollback() has been called, do NOT use this function in a prod environment !!!
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    `
  )

  await db.$transaction([
    db.climateDataPoint.deleteMany({}),
    db.climateEntry.deleteMany({}),
  ])

  console.log('_rollback() completed')
}

export default async ({ db }) => {
  // await _rollback(db)

  console.log('Reading data from ' + noaaMlyTavgNormalFile)

  await new Promise((resolve, reject) => {
    const data = []

    fs.createReadStream(noaaMlyTavgNormalFile).pipe(
      parse()
        .on('error', (e) => reject(e))
        // data we're accessing won't be parsed correctly, just pass the first entry (the whole line as str)
        .on('data', ([csvRowStr]) => data.push(new ClimateEntryData(csvRowStr)))
        .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} from ${noaaMlyTavgNormalFile}`)
          resolve(data)
        })
    )
  })
    .catch((e) => {
      throw e
    })
    // @ts-ignore
    .then(async (climateEntries: ClimateEntryData[]) => {
      for (const climateEntry of climateEntries) {
        await db.climateEntry.create({
          data: {
            ...tavgEntryData,
            station: {
              connect: {
                code: climateEntry.code,
              },
            },
            dataPoints: {
              create: climateEntry.dataPoints,
            },
          },
        })
      }
      console.log(`Created/Updated ${climateEntries.length} rows`)
    })
}
