import type { ClimateEntry } from '@prisma/client'

import {
  climateEntries,
  climateEntry,
  createClimateEntry,
  updateClimateEntry,
  deleteClimateEntry,
} from './climateEntries'
import type { StandardScenario } from './climateEntries.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('climateEntries', () => {
  scenario('returns all climateEntries', async (scenario: StandardScenario) => {
    const result = await climateEntries()

    expect(result.length).toEqual(Object.keys(scenario.climateEntry).length)
  })

  scenario(
    'returns a single climateEntry',
    async (scenario: StandardScenario) => {
      const result = await climateEntry({ id: scenario.climateEntry.one.id })

      expect(result).toEqual(scenario.climateEntry.one)
    }
  )

  scenario('creates a climateEntry', async (scenario: StandardScenario) => {
    const result = await createClimateEntry({
      input: { stationCode: scenario.climateEntry.two.stationCode },
    })

    expect(result.stationCode).toEqual(scenario.climateEntry.two.stationCode)
  })

  scenario('updates a climateEntry', async (scenario: StandardScenario) => {
    const original = (await climateEntry({
      id: scenario.climateEntry.one.id,
    })) as ClimateEntry
    const result = await updateClimateEntry({
      id: original.id,
      input: { stationCode: scenario.climateEntry.two.stationCode },
    })

    expect(result.stationCode).toEqual(scenario.climateEntry.two.stationCode)
  })

  scenario('deletes a climateEntry', async (scenario: StandardScenario) => {
    const original = (await deleteClimateEntry({
      id: scenario.climateEntry.one.id,
    })) as ClimateEntry
    const result = await climateEntry({ id: original.id })

    expect(result).toEqual(null)
  })
})
