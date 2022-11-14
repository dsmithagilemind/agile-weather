import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {

  mockCurrentUser({
    id: 1,
    name: "moderator",
    email: 'moderator@moderator.com',
    roles: 'moderator',
  })

  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  // TODO: ReWrite The Following Test:
  // it('requireAuth has stub implementation. Should not throw when current user', () => {
  //   // If you want to set values in context, pass it through e.g.
  //   // mockRedwoodDirective(requireAuth, { context: { currentUser: { id: 1, name: 'Lebron McGretzky' } }})
  //   const mockExecution = mockRedwoodDirective(requireAuth, { context: {} })

  //   expect(mockExecution).not.toThrowError()
  //   // expect(true).toBe(true)

  // })
})
