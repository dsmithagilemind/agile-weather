import type { ClimateDataPoint } from '@prisma/client'

import {
  climateDataPoints,
  climateDataPoint,
  createClimateDataPoint,
  updateClimateDataPoint,
  deleteClimateDataPoint
} from './climateDataPoints'
import type { StandardScenario } from './climateDataPoints.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('climateDataPoints', () => {
  scenario(
    'returns all climateDataPoints',
    async (scenario: StandardScenario) => {
      const result = await climateDataPoints()

      expect(result.length).toEqual(
        Object.keys(scenario.climateDataPoint).length
      )

    }
  )

  scenario(
    'returns a single climateDataPoint',
    async (scenario: StandardScenario) => {
      const result = await climateDataPoint({
        id: scenario.climateDataPoint.one.id,
      })

      expect(result).toEqual(scenario.climateDataPoint.one)

    }
  )

  scenario('creates a climateDataPoint', async (scenario: StandardScenario) => {
    const result = await createClimateDataPoint({
      input: {
        label: 'String',
        value: 'String',
        climateEntryId: scenario.climateDataPoint.two.climateEntryId,
      },
    })

    expect(result.label).toEqual('String')
    expect(result.value).toEqual('String')
    expect(result.climateEntryId).toEqual(
      scenario.climateDataPoint.two.climateEntryId
    )

  })

  scenario('updates a climateDataPoint', async (scenario: StandardScenario) => {
    const original = (await climateDataPoint({
      id: scenario.climateDataPoint.one.id,
    })) as ClimateDataPoint
    const result = await updateClimateDataPoint({
      id: original.id,
      input: { label: 'String2' },
    })

    expect(result.label).toEqual('String2')

  })

  scenario('deletes a climateDataPoint', async (scenario: StandardScenario) => {


    mockCurrentUser({
      id: 1,
      email: 'admin@agileweather.com',
      name: 'Admin',
      roles: 'admin',
    })

    const original = (await deleteClimateDataPoint({
      id: scenario.climateDataPoint.one.id,
    })) as ClimateDataPoint
    const result = await climateDataPoint({ id: original.id })

    expect(result).toEqual(null)

  })
})
