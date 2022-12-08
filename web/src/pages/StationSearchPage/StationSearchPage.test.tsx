import { render } from '@redwoodjs/testing/web'

import StationSearchPage from './StationSearchPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StationSearchPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StationSearchPage />)
    }).not.toThrow()
  })
})
