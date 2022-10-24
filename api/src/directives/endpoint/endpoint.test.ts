import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import endpoint from './endpoint'

describe('endpoint directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(endpoint.schema).toBeTruthy()
    expect(getDirectiveName(endpoint.schema)).toBe('endpoint')
  })

  it('has a endpoint implementation transforms the value', () => {
    const mockExecution = mockRedwoodDirective(endpoint, {
      mockedResolvedValue: 'foo',
    })

    expect(mockExecution()).toBe('bar')
  })
})