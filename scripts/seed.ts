import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import {parse} from '@fast-csv/parse';
import * as _ from 'radash';
import * as fs from 'fs';

const replaceHeaders = [ // order defined by original csv headers, we want to replace those, easier to work with
  "precipitation",
  "DateFull","DateMonth","DateWeek of","DateYear", // map these into DateTime
  "city","code","location","state", // station data, rest is weather data
  "avgTemp","maxTemp","minTemp",
  "windDirection","windSpeed"
]


export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    // const data: Prisma.UserExampleCreateArgs['data'][] = [
    //   // To try this example data with the UserExample model in schema.prisma,
    //   // uncomment the lines below and run 'yarn rw prisma migrate dev'
    //   //
    //   // { name: 'alice', email: 'alice@example.com' },
    //   // { name: 'mark', email: 'mark@example.com' },
    //   // { name: 'jackie', email: 'jackie@example.com' },
    //   // { name: 'bob', email: 'bob@example.com' },
    // ]
    // console.log(
    //   "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    // )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    // Promise.all(
    //   //
    //   // Change to match your data model and seeding needs
    //   //
    //   data.map(async (data: Prisma.UserExampleCreateArgs['data']) => {
    //     const record = await db.userExample.create({ data })
    //     console.log(record)
    //   })
    // )

    async function handleCsvEntryData(entryData) {

      const stationData = _.pick(entryData, ["city","code","location","state"]);
  
      // weatherData will still need date parsed, and then 


      /*
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
      */

      let weatherData : any = _.pick(entryData, ["precipitation","avgTemp","maxTemp","minTemp","windDirection","windSpeed"]);
      Object.entries(weatherData).forEach(([key, val]) => weatherData[key] = +val); // map each entry into it's number type using +num
      weatherData.date = new Date(entryData.DateFull);
  
      try {
        const created = await db.weather.create(
          {
            data: {
              station: {
                connectOrCreate: {
                  where: {
                    code: stationData.code
                  },
                  create: {
                    ...stationData
                  }
                }
              },
              ...weatherData
            },
            include: {
              station: true,
            }
          });
        }
      catch(e) {
        throw e;
      }
    }
    

    
    fs.createReadStream('api/db/datasets/corgis-weather.csv')
      .pipe(parse({headers: replaceHeaders, skipRows: 1})
      .on('error', (error) => console.error(error))
      .on('data', handleCsvEntryData)
      .on('end', (rowCount) => console.log(`Parsed ${rowCount} from api/db/datasets/corgis-weather.csv and presisted to db`)));

  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
