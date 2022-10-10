import type { FindZipSearches } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ZipSearches from 'src/components/ZipSearch/ZipSearches'

export const QUERY = gql`
  query FindZipSearches {
    zipSearches {
      id
      zip
      date
    }
  }
`

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000,
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No zipSearches yet. '}
      <Link to={routes.newZipSearch()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ zipSearches }: CellSuccessProps<FindZipSearches>) => {
  return <ZipSearches zipSearches={zipSearches} />
}
