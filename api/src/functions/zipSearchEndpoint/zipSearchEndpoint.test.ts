import { mockHttpEvent } from '@redwoodjs/testing/api'

import { db } from 'src/lib/db'
import { createZipSearch } from 'src/services/zipSearches/zipSearches'

import { handler } from './zipSearchEndpoint'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

// TODO: we require an HTTP endpoint which we aren't providing in backend for now
// TODO: revisit with http endpoint in .env
// ! SKIPPING TESTS IN THE MEANTIME DUE TO BREAKING TEST COMPLETIONS
describe('zipSearchEndpoint function', () => {

  const zipCode = '12345'

  scenario('creates a new zipSearch', async () => {


    const result = await createZipSearch({
      input: { zip: zipCode, date: undefined },
    })

    expect(result.zip).toEqual(zipCode)
  })


  scenario('find created zipSearch', async () => {

    const record = await db.zipSearch.findFirst()

    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        id: record.id
      },
    })

    const response = await handler(httpEvent, null)
    const { data } = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(data.zip).toBe(record.zip)
  });

  // it('Should respond with 200', async () => {


  //   const zipCode = '12345'
  //   const date = '2022-10-28T17:44:41.614Z'

  //   const record = await db.zipSearch.create({
  //     data: {zip: zipCode,
  //     }
  //   })


  // })
})
