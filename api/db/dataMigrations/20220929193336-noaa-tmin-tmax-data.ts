import * as fs from 'fs'

import { parse } from '@fast-csv/parse'
//import { db } from 'api/src/lib/db'
import * as _ from 'radash'

const datasetFilePath = (fileName) => 'api/db/datasets/' + fileName

const noaaMlyTminNormalFile = datasetFilePath('mly-tmin-normal.txt')
const noaaMlyTmaxNormalFile = datasetFilePath('mly-tmax-normal.txt')

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

const tminEntryData = {
  topic: 'normal-tmin',
  period: '1981-2010',
  dataSet: 'noaa-mly-tmin-normal',
}

const tmaxEntryData = {
  topic: 'normal-tmax',
  period: '1981-2010',
  dataSet: 'noaa-mly-tmax-normal',
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

  const records = await db.climateEntry.findMany({
    where: {
      OR: [
        {
          topic: 'normal-tmin',
        },
        {
          topic: 'normal-tmax',
        },
      ],
    },
  })

  const ids = records.flat().map((record) => record.id)

  for (let i = 0; i < ids.length; ++i) {
    await db.climateEntry.update({
      where: {
        id: ids[i],
      },
      data: {
        dataPoints: {
          deleteMany: {},
        },
      },
    })
  }

  await db.$transaction([
    db.climateEntry.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  ])

  console.log('_rollback() completed')
}

export default async ({ db }) => {
  //await _rollback(db)

  console.log('Reading data from ' + noaaMlyTminNormalFile)

  // ! Min
  await new Promise((resolve, reject) => {
    const data = []

    fs.createReadStream(noaaMlyTminNormalFile).pipe(
      parse()
        .on('error', (e) => reject(e))
        // data we're accessing won't be parsed correctly, just pass the first entry (the whole line as str)
        .on('data', ([csvRowStr]) => data.push(new ClimateEntryData(csvRowStr)))
        .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} from ${noaaMlyTminNormalFile}`)
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
            ...tminEntryData,
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

  // ! Max
  await new Promise((resolve, reject) => {
    const data = []

    fs.createReadStream(noaaMlyTmaxNormalFile).pipe(
      parse()
        .on('error', (e) => reject(e))
        // data we're accessing won't be parsed correctly, just pass the first entry (the whole line as str)
        .on('data', ([csvRowStr]) => data.push(new ClimateEntryData(csvRowStr)))
        .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} from ${noaaMlyTmaxNormalFile}`)
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
            ...tmaxEntryData,
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
