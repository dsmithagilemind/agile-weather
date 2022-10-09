import { render } from '@redwoodjs/testing/web'

import GeolocationView from './GeolocationView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GeolocationView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GeolocationView />)
    }).not.toThrow()
  })
})
