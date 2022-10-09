import { render } from '@redwoodjs/testing/web'

import ClimateGraphScrollContainer from './ClimateGraphScrollContainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClimateGraphScrollContainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClimateGraphScrollContainer />)
    }).not.toThrow()
  })
})
