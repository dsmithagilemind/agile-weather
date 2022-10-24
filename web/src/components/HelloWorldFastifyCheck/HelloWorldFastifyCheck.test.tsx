import { render } from '@redwoodjs/testing/web'

import HelloWorldFastifyCheck from './HelloWorldFastifyCheck'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HelloWorldFastifyCheck', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HelloWorldFastifyCheck />)
    }).not.toThrow()
  })
})
