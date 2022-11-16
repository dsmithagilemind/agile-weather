import type { ZipSearch } from '@prisma/client'

import { db } from 'src/lib/db';

import {
  zipSearches,
  zipSearch,
  createZipSearch,
  updateZipSearch,
  deleteZipSearch
} from './zipSearches'
import type { StandardScenario } from './zipSearches.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('zipSearches', () => {

  scenario('returns all zipSearches', async (scenario: StandardScenario) => {
    const result = await zipSearches()
    expect(result.length).toEqual(Object.keys(scenario.zipSearch).length)
  })

  scenario('returns a single zipSearch', async (scenario: StandardScenario) => {
    const result = await zipSearch({ id: scenario.zipSearch.one.id })
    expect(result).toEqual(scenario.zipSearch.one)
  })

  scenario('creates a zipSearch', async (scenario: StandardScenario) => {

    mockCurrentUser(scenario.user.admin)

    const date = new Date();
    const result = await createZipSearch({
      input: { zip: 'String', date: date },
    })

    expect(result.zip).toEqual('String')
    expect(result.date).toEqual(date)
  })

  scenario('updates a zipSearch', async (scenario: StandardScenario) => {

    mockCurrentUser(scenario.user.admin)

    const original = (await zipSearch({
      id: scenario.zipSearch.one.id,
    })) as ZipSearch
    const result = await updateZipSearch({
      id: original.id,
      input: { zip: 'String2' },
    })

    expect(result.zip).toEqual('String2')

  })

  scenario('deletes a zipSearch', async (scenario: StandardScenario) => {

    mockCurrentUser(scenario.user.admin)

    const original = (await deleteZipSearch({
      id: scenario.zipSearch.one.id,
    })) as ZipSearch
    const result = await zipSearch({ id: original.id })

    expect(result).toEqual(null)

  })
})
