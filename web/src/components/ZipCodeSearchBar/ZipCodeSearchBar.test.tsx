import { render } from '@redwoodjs/testing/web'

import ZipCodeSearchBar from './ZipCodeSearchBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ZipCodeSearchBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ZipCodeSearchBar />)
    }).not.toThrow()
  })
})
