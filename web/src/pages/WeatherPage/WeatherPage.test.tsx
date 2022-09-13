import { render } from '@redwoodjs/testing/web'

import WeatherPage from './WeatherPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WeatherPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WeatherPage />)
    }).not.toThrow()
  })
})
