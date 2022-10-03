import { render } from '@redwoodjs/testing/web'

import StationInfo from './StationInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StationInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StationInfo />)
    }).not.toThrow()
  })
})
