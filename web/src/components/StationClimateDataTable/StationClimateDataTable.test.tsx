import { render } from '@redwoodjs/testing/web'

import StationClimateDataTable from './StationClimateDataTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StationClimateDataTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StationClimateDataTable />)
    }).not.toThrow()
  })
})
