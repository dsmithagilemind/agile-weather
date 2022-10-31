import { render } from '@redwoodjs/testing/web'

import EditZipSearchModal from './EditZipSearchModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditZipSearchModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditZipSearchModal />)
    }).not.toThrow()
  })
})
