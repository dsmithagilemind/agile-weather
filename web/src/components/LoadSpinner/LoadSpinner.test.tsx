import { render } from '@redwoodjs/testing/web'

import LoadSpinner from './LoadSpinner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoadSpinner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadSpinner />)
    }).not.toThrow()
  })
})
