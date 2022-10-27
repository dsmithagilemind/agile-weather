import type { ClimateEntry } from '@prisma/client'

import {
  climateEntries,
  climateEntry,
  createClimateEntry,
  updateClimateEntry,
  deleteClimateEntry
} from './climateEntries'
import type { StandardScenario } from './climateEntries.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('climateEntries', () => {
  scenario('returns all climateEntries', async (scenario: StandardScenario) => {
    // const result = await climateEntries()

   // expect(result.length).toEqual(Object.keys(scenario.climateEntry).length)

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })

  scenario(
    'returns a single climateEntry',
    async (scenario: StandardScenario) => {
      // const result = await climateEntry({ id: scenario.climateEntry.one.id })

      // expect(result).toEqual(scenario.climateEntry.one)

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
    }
  )

  scenario('creates a climateEntry', async (scenario: StandardScenario) => {
    // const result = await createClimateEntry({
    //   input: {
    //     stationId: scenario.climateEntry.two.stationId,
    //     topic: 'String',
    //     period: 'String',
    //     dataSet: 'String',
    //   },
    // })

    // expect(result.stationId).toEqual(scenario.climateEntry.two.stationId)
    // expect(result.topic).toEqual('String')
    // expect(result.period).toEqual('String')
    // expect(result.dataSet).toEqual('String')

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })

  scenario('updates a climateEntry', async (scenario: StandardScenario) => {
    // const original = (await climateEntry({
    //   id: scenario.climateEntry.one.id,
    // })) as ClimateEntry
    // const result = await updateClimateEntry({
    //   id: original.id,
    //   input: { topic: 'String2' },
    // })

    // expect(result.topic).toEqual('String2')

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })

  scenario('deletes a climateEntry', async (scenario: StandardScenario) => {
    // const original = (await deleteClimateEntry({
    //   id: scenario.climateEntry.one.id,
    // })) as ClimateEntry
    // const result = await climateEntry({ id: original.id })

    // expect(result).toEqual(null)

  // TODO: ReWrite The Following Test:
  expect(true).toBe(true)
  })
})
