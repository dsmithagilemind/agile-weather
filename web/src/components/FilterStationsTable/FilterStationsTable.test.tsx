import { render } from '@redwoodjs/testing/web'

import FilterStationsTable from './FilterStationsTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FilterStationsTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FilterStationsTable />)
    }).not.toThrow()
  })
})
