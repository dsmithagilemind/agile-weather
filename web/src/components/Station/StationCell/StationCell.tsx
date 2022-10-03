import type { FindStationById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Station from 'src/components/Station/Station'

export const QUERY = gql`
  query FindStationById($id: String!) {
    station: station(id: $id) {
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

export const Empty = () => <div>Station not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ station }: CellSuccessProps<FindStationById>) => {
  return <div>{JSON.stringify(station)}</div>
}
