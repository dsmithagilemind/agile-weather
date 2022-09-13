import {
  weathers,
  weather,
  createWeather,
  updateWeather,
  deleteWeather,
} from './weathers'
import type { StandardScenario } from './weathers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('weathers', () => {
  scenario('returns all weathers', async (scenario: StandardScenario) => {
    const result = await weathers()

    expect(result.length).toEqual(Object.keys(scenario.weather).length)
  })

  scenario('returns a single weather', async (scenario: StandardScenario) => {
    const result = await weather({ id: scenario.weather.one.id })

    expect(result).toEqual(scenario.weather.one)
  })

  scenario('creates a weather', async (scenario: StandardScenario) => {
    const result = await createWeather({
      input: {
        date: '2022-09-13T21:18:09Z',
        precipitation: 5304461.75170072,
        avgTemp: 405505,
        maxTemp: 859170,
        minTemp: 5529614,
        windDirection: 2298384,
        windSpeed: 2189255.1437036945,
        stationCode: scenario.weather.two.stationCode,
      },
    })

    expect(result.date).toEqual('2022-09-13T21:18:09Z')
    expect(result.precipitation).toEqual(5304461.75170072)
    expect(result.avgTemp).toEqual(405505)
    expect(result.maxTemp).toEqual(859170)
    expect(result.minTemp).toEqual(5529614)
    expect(result.windDirection).toEqual(2298384)
    expect(result.windSpeed).toEqual(2189255.1437036945)
    expect(result.stationCode).toEqual(scenario.weather.two.stationCode)
  })

  scenario('updates a weather', async (scenario: StandardScenario) => {
    const original = await weather({ id: scenario.weather.one.id })
    const result = await updateWeather({
      id: original.id,
      input: { date: '2022-09-14T21:18:09Z' },
    })

    expect(result.date).toEqual('2022-09-14T21:18:09Z')
  })

  scenario('deletes a weather', async (scenario: StandardScenario) => {
    const original = await deleteWeather({ id: scenario.weather.one.id })
    const result = await weather({ id: original.id })

    expect(result).toEqual(null)
  })
})
