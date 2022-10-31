import { render } from '@redwoodjs/testing/web'

import ChartModal from './ChartModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChartModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChartModal />)
    }).not.toThrow()
  })
})
