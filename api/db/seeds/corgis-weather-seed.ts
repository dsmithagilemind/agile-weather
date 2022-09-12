import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import {parse} from '@fast-csv/parse';
import * as _ from 'radash';
import fs from 'fs';


// cd into directory, run with node ./corgis-weather-seed.js

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


const replaceHeaders = [ // order defined by original csv headers, we want to replace those, easier to work with
    "precipitation",
    "DateFull","DateMonth","DateWeek of","DateYear", // map these into DateTime
    "city","code","location","state", // station data, rest is weather data
    "avgTemp","maxTemp","minTemp",
    "windDirection","windSpeed"
]



async function handleCsvEntryData(entryData) {

    const stationData = _.pick(entryData, ["city","code","location","state"]);

    // weatherData will still need date parsed, and then 
    let weatherData : any = _.pick(entryData, ["precipitation","avgTemp","maxTemp","minTemp","windDirection","windSpeed"]);
    weatherData.date = new Date(entryData.DateFull);

    const weatherRow = await prisma.weather.create(
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


async function main() {

    const stream = parse({headers: replaceHeaders, skipRows: 1})
    .on('error', (error) => console.error(error))
    .on('data', handleCsvEntryData)
    .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));
    
    stream.end();


  // const alice = await prisma.user.upsert({
  //   where: { email: 'alice@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //     posts: {
  //       create: {
  //         title: 'Check out Prisma with Next.js',
  //         content: 'https://www.prisma.io/nextjs',
  //         published: true,
  //       },
  //     },
  //   },
  // })

  // const bob = await prisma.user.upsert({
  //   where: { email: 'bob@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Nexus on Twitter',
  //           content: 'https://twitter.com/nexusgql',
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // })
  // console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
