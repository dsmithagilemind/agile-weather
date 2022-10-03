import type {
  FindClimateEntryQuery,
  FindClimateEntryQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindClimateEntryQuery($id: Int!) {
    climateEntry: climateEntry(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindClimateEntryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  climateEntry,
}: CellSuccessProps<FindClimateEntryQuery, FindClimateEntryQueryVariables>) => {
  return <div>{JSON.stringify(climateEntry)}</div>
}
