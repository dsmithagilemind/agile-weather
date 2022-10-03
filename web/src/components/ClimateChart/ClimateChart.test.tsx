import { render } from '@redwoodjs/testing/web'

import ClimateChart from './ClimateChart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClimateChart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClimateChart />)
    }).not.toThrow()
  })
})
