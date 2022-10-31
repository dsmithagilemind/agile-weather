import { mockHttpEvent } from '@redwoodjs/testing/api'

import { db } from 'src/lib/db'

import { handler } from './zipSearchesEndpoint'



//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

// TODO: ReWrite The Following Test:
describe('zipSearchesEndpoint function', () => {
  it('Should respond with 200', async () => {

    const zipCode = '12345'

    const record = await db.zipSearch.create({
      data: {
        zip: zipCode,
        date: undefined
      }
    })

    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        id: record.id
      },
    })

    const response = await handler(httpEvent, null)
    const { data } = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(data[0].zip).toBeDefined();
    expect(data.length).toBeGreaterThanOrEqual(1)
  })

})
