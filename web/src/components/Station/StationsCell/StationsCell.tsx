import type { FindStations } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Stations from 'src/components/Station/Stations'

export const QUERY = gql`
  query FindStations {
    stations {
      id
      code
      latitude
      longitude
      elevation
      gsn
      hcn
      wmoid
      stationName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No stations yet. '}
      <Link
        to={routes.newStation()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ stations }: CellSuccessProps<FindStations>) => {
  return <Stations stations={stations} />
}
