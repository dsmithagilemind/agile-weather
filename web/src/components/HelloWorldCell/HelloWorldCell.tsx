// import type {
//   FindHelloWorldQuery,
//   FindHelloWorldQueryVariables,
// } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query Hello {
    hello @rest(type: "Person", path: "/hello") {
      world
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<any>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ helloWorld }: CellSuccessProps<any, any>) => {
  return <div>{JSON.stringify(helloWorld)}</div>
}
