import { render } from '@redwoodjs/testing/web'

import Geolocationinfo from './Geolocationinfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Geolocationinfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Geolocationinfo />)
    }).not.toThrow()
  })
})
