import { render } from '@redwoodjs/testing/web'

import StationPage from './StationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StationPage />)
    }).not.toThrow()
  })
})
