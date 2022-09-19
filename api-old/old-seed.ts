import * as fs from 'fs'

import { parse } from '@fast-csv/parse'
import { db } from 'api/src/lib/db'
import * as _ from 'radash'

/*
Original CSV Headers:

"Data.Precipitation","Date.Full","Date.Month","Date.Week of","Date.Year",
"Station.City","Station.Code","Station.Location","Station.State",
"Data.Temperature.Avg Temp","Data.Temperature.Max Temp","Data.Temperature.Min Temp",
"Data.Wind.Direction","Data.Wind.Speed"


  model Weather {
    id   Int      @id @default(autoincrement())
    date DateTime
    precipitation Float
    avgTemp Int
    maxTemp Int
    minTemp Int
    windDirection Int
    windSpeed     Float
    station   Station @relation(fields: [stationId], references: [id])
    stationId Int
  }

  model Station {
    id       Int       @id @default(autoincrement())
    code     String
    city     String
    location String
    Weather  Weather[]
  }

*/

const replaceHeaders = [
  // order defined by original csv headers, we want to replace those, easier to work with
  'precipitation',
  'DateFull',
  'DateMonth',
  'DateWeek of',
  'DateYear',
  'city',
  'code',
  'location',
  'state',
  'avgTemp',
  'maxTemp',
  'minTemp',
  'windDirection',
  'windSpeed',
]

async function handleCsvEntryData(entryData) {
  const stationData = _.pick(entryData, ['city', 'code', 'location', 'state'])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const weatherData: any = _.pick(entryData, [
    'precipitation',
    'avgTemp',
    'maxTemp',
    'minTemp',
    'windDirection',
    'windSpeed',
  ])

  try {
    Object.entries(weatherData).forEach(
      ([key, val]) => (weatherData[key] = +val)
    ) // map each entry into it's number type using +num
    weatherData.date = new Date(entryData.DateFull)
  } catch (e) {
    console.log(entryData)
    console.error(e)
  }

  await db.weather.create({
    data: {
      station: {
        connectOrCreate: {
          where: {
            code: stationData.code,
          },
          create: {
            ...stationData,
          },
        },
      },
      ...weatherData,
    },
    include: {
      station: true,
    },
  })
}

export default async () => {
  // try {
  //   fs.createReadStream('api/db/datasets/corgis-weather.csv').pipe(
  //     parse({ headers: replaceHeaders, skipRows: 1 })
  //       .on('error', (error) => console.error(error))
  //       .on('data', handleCsvEntryData)
  //       .on('end', (rowCount) =>
  //         console.log(
  //           `Parsed ${rowCount} from api/db/datasets/corgis-weather.csv and presisted to db`
  //         )
  //       )
  //   )
  // } catch (error) {
  //   console.warn('Please define your seed data.')
  //   console.error(error)
  // }
  return
}
