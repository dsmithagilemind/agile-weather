import type { FindStationQuery, FindStationQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindStationQuery($code: String!) {
    station: station(code: $code) {
      code
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStationQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  station,
}: CellSuccessProps<FindStationQuery, FindStationQueryVariables>) => {
  return <div>{JSON.stringify(station)}</div>
}
