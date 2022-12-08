import { render } from '@redwoodjs/testing/web'

import ZipSearchSidebar from './ZipSearchSidebar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ZipSearchSidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ZipSearchSidebar />)
    }).not.toThrow()
  })
})
