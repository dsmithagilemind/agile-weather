import type { Station } from '@prisma/client'

import {
  stations,
  station,
  createStation,
  updateStation,
  deleteStation
} from './stations'
import type { StandardScenario } from './stations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('stations', () => {
  scenario('returns all stations', async (scenario: StandardScenario) => {
    // const result = await stations()

    // expect(result.length).toEqual(Object.keys(scenario.station).length)

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })

  scenario('returns a single station', async (scenario: StandardScenario) => {
    // const result = await station({ id: scenario.station.one.id })

    // expect(result).toEqual(scenario.station.one)

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })

  scenario('creates a station', async () => {
    // const result = await createStation({
    //   input: { code: 'String7749443' },
    // })

    // expect(result.code).toEqual('String7749443')

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })

  scenario('updates a station', async (scenario: StandardScenario) => {
    // const original = (await station({ id: scenario.station.one.id })) as Station
    // const result = await updateStation({
    //   id: original.id,
    //   input: { code: 'String98624452' },
    // })

    // expect(result.code).toEqual('String98624452')

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })

  scenario('deletes a station', async (scenario: StandardScenario) => {
    // const original = (await deleteStation({
    //   id: scenario.station.one.id,
    // })) as Station
    // const result = await station({ id: original.id })

    // expect(result).toEqual(null)

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })
})
