import * as _ from 'radash'

import testDataJson from '../../db/datasets/test-data.json'

export type ClimateDataPoint = {
  value: string
  label: string
  id: string
  flag: string
  climateEntryId: number
}

export type ClimateEntry = {
  dataSet: string
  period: string
  topic: string
  id: number
  stationId: string
  dataPoints: ClimateDataPoint[]
}

export type Station = {
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

export type GeoLocation = {
  id: number
  city: string
  county: string
  fips: string
  state: string
  stateAbbrev: string
  zip?: string
  stations: Station[]
}

export type TestData = {
  geoLocations: GeoLocation[]
  stations: Station[]
  climateEntries: ClimateEntry[]
  climateDataPoints: ClimateDataPoint[]
}

let testData: TestData
let testDataSanitized: TestData

export function createData() {
  if(!testData) {
    const geoLocations: GeoLocation[] = testDataJson.geoLocations;
    const stations: Station[] = geoLocations.map(g => g.stations).flat()
    const climateEntries: ClimateEntry[] = stations.map((s: Station) => s.climateEntries).flat()
    const climateDataPoints: ClimateDataPoint[] = climateEntries.map(c => c.dataPoints).flat();

    testData = {geoLocations, stations, climateEntries, climateDataPoints}

    testDataSanitized = {
      geoLocations: geoLocations.map(g => {
        delete g.stations
        g.id = undefined;
        return g
      }),
      stations: stations.map(s => {
        s.id = undefined;
        delete s.climateEntries
        return s
      }),
      climateEntries: climateEntries.map(e => {
        e.id = undefined;
        e.stationId = undefined;
        delete e.dataPoints
        return e;
      }),
      climateDataPoints: climateDataPoints.map(d => {
        d.id = undefined;
        d.climateEntryId = undefined;
        return d;
      }),
    }
  }
}

export function getTestData() {
  if(!testData) createData()
  return testData
}

export function getTestDataSanitized() {
  if(!testDataSanitized) createData()
  return testDataSanitized
}
