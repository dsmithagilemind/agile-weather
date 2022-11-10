import { render } from '@redwoodjs/testing/web'

import LoginInfoBar from './LoginInfoBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoginInfoBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginInfoBar />)
    }).not.toThrow()
  })
})
