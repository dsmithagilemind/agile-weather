import { render } from '@redwoodjs/testing/web'

import EndpointTestBar from './EndpointTestBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EndpointTestBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EndpointTestBar />)
    }).not.toThrow()
  })
})
