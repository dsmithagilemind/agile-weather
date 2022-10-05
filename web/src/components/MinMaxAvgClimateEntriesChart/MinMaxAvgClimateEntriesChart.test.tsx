import { render } from '@redwoodjs/testing/web'

import MinMaxAvgClimateEntriesChart from './MinMaxAvgClimateEntriesChart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MinMaxAvgClimateEntriesChart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MinMaxAvgClimateEntriesChart />)
    }).not.toThrow()
  })
})
