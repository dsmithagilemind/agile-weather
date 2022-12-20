// eslint-disable-next-line import/order
import { db } from '../api/src/lib/db'
import * as _ from 'radash'

import testdata from '../api/db/datasets/test-data.json'

type ClimateDataPoint = {
  value: string
  label: string
  id: string
  flag: string
  climateEntryId: number
}

type ClimateEntry = {
  dataSet: string
  period: string
  topic: string
  id: number
  stationId: string
  dataPoints: ClimateDataPoint[]
}

type Station = {
  stationName: string
  longitude: number
  latitude: number
  hcn: string
  gsn: string
  code: string
  elevation: number
  id: string
  wmoid: string
  climateEntries: ClimateEntry[]
}

type GeoLocation = {
  id: number
  city: string
  county: string
  fips: string
  state: string
  stateAbbrev: string
  zip?: string
  stations: Station[]
}

// ! not necessary if jest is running tests, already resets db
const clearData = false;

export default async () => {
  try {

    if(clearData) {
      console.log("Clearing current data...")
      await db.$transaction([
        db.climateDataPoint.deleteMany({}),
        db.climateEntry.deleteMany({}),
        db.station.deleteMany({}),
        db.geoLocation.deleteMany({}),
      ])
      console.log("Done")
    }


    console.log("Parsing test data...")
    const geoLocations: GeoLocation[] = testdata.geoLocations;
    const stations: Station[] = geoLocations.map(g => g.stations).flat()
    const climateEntries: ClimateEntry[] = stations.map((s: Station) => s.climateEntries).flat()
    //const climateDataPoints: ClimateDataPoint[] = climateEntries.map(c => c.dataPoints).flat();

    // for(const geoLocation of geoLocations) {
    //   delete geoLocation.stations;
    // }
    // for(const station of stations) delete station.climateEntries
    // for(const climateEntry of climateEntries) delete climateEntry.dataPoints
    console.log("Done")

    console.log("Creating geoLocation records...")
    await db.geoLocation.createMany({
      data: geoLocations.map(g => _.omit(g, ["stations"]))
    })
    console.log("Done")

    console.log("Creating station records on geoLocation records...")
    for(const geoLocation of geoLocations) {
      await db.geoLocation.update({
        where: {
          id: geoLocation.id
        },
        data: {
          stations: {
            create: geoLocation.stations.map(s => _.omit(s, ["climateEntries"]))
          }
        }
      })
    }
    console.log("Done");

    console.log("Creating climateEntry records on station records...")
    for(const station of stations) {
      await db.station.update({
        where: {
          id: station.id
        },
        data: {
          climateEntries: {
            create: station.climateEntries.map(c => _.omit(c, ["stationId", "dataPoints"]))
          }
        }
      })
    }
    console.log("Done")

    console.log("Creating climateDataPoints on climateEntry records...")
    for(const climateEntry of climateEntries) {
      await db.climateEntry.update({
        where: {
          id: climateEntry.id
        },
        data: {
          dataPoints: {
            create: climateEntry.dataPoints.map(d => _.omit(d, ["climateEntryId"]))
          }
        }
      })
    }
    console.log("Done");

    console.log("Database seeded.")
  }
  catch (error) {
    // console.warn('Please define your seed data.')
    console.log("Could not complete seeding.")
    console.error(error)
  }
}
