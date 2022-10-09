import { render } from '@redwoodjs/testing/web'

import StationDataTable from './StationDataTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StationDataTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StationDataTable />)
    }).not.toThrow()
  })
})
