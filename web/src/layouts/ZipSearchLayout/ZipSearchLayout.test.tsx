import { render } from '@redwoodjs/testing/web'

import ZipSearchLayout from './ZipSearchLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ZipSearchLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ZipSearchLayout />)
    }).not.toThrow()
  })
})
