import {
  stations,
  station,
  createStation,
  updateStation,
  deleteStation,
} from './stations'
import type { StandardScenario } from './stations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('stations', () => {
  scenario('returns all stations', async (scenario: StandardScenario) => {
    const result = await stations()

    expect(result.length).toEqual(Object.keys(scenario.station).length)
  })

  scenario('returns a single station', async (scenario: StandardScenario) => {
    const result = await station({ id: scenario.station.one.id })

    expect(result).toEqual(scenario.station.one)
  })

  scenario('creates a station', async () => {
    const result = await createStation({
      input: {
        code: 'String',
        city: 'String',
        location: 'String',
        state: 'String',
      },
    })

    expect(result.code).toEqual('String')
    expect(result.city).toEqual('String')
    expect(result.location).toEqual('String')
    expect(result.state).toEqual('String')
  })

  scenario('updates a station', async (scenario: StandardScenario) => {
    const original = await station({ id: scenario.station.one.id })
    const result = await updateStation({
      id: original.id,
      input: { code: 'String2' },
    })

    expect(result.code).toEqual('String2')
  })

  scenario('deletes a station', async (scenario: StandardScenario) => {
    const original = await deleteStation({ id: scenario.station.one.id })
    const result = await station({ id: original.id })

    expect(result).toEqual(null)
  })
})
