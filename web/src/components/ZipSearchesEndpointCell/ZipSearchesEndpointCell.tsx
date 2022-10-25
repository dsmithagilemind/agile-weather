import type { FindZipSearchesEndpointQuery, FindZipSearchesEndpointQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindZipSearchesEndpointQuery($id: Int!) {
    zipSearchesEndpoint: zipSearchesEndpoint(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindZipSearchesEndpointQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  zipSearchesEndpoint,
}: CellSuccessProps<FindZipSearchesEndpointQuery, FindZipSearchesEndpointQueryVariables>) => {
  return <div>{JSON.stringify(zipSearchesEndpoint)}</div>
}
