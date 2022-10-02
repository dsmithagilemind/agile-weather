import type { GeoLocation } from '@prisma/client'

import {
  geoLocations,
  geoLocation,
  createGeoLocation,
  updateGeoLocation,
  deleteGeoLocation,
} from './geoLocations'
import type { StandardScenario } from './geoLocations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('geoLocations', () => {
  scenario('returns all geoLocations', async (scenario: StandardScenario) => {
    const result = await geoLocations()

    expect(result.length).toEqual(Object.keys(scenario.geoLocation).length)
  })

  scenario(
    'returns a single geoLocation',
    async (scenario: StandardScenario) => {
      const result = await geoLocation({ id: scenario.geoLocation.one.id })

      expect(result).toEqual(scenario.geoLocation.one)
    }
  )

  scenario('creates a geoLocation', async () => {
    const result = await createGeoLocation({
      input: { city: 'String' },
    })

    expect(result.city).toEqual('String')
  })

  scenario('updates a geoLocation', async (scenario: StandardScenario) => {
    const original = (await geoLocation({
      id: scenario.geoLocation.one.id,
    })) as GeoLocation
    const result = await updateGeoLocation({
      id: original.id,
      input: { city: 'String2' },
    })

    expect(result.city).toEqual('String2')
  })

  scenario('deletes a geoLocation', async (scenario: StandardScenario) => {
    const original = (await deleteGeoLocation({
      id: scenario.geoLocation.one.id,
    })) as GeoLocation
    const result = await geoLocation({ id: original.id })

    expect(result).toEqual(null)
  })
})
