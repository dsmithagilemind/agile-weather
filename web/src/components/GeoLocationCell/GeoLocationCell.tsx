import type {
  FindGeoLocationQuery,
  FindGeoLocationQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import StationCell from '../StationCell/StationCell'

export const QUERY = gql`
  query FindGeoLocationQuery($id: Int!) {
    geoLocation: geoLocation(id: $id) {
      city
      county
      state
      stateAbbrev
      zip
      stations {
        stationName
        longitude
        latitude
        elevation
        code
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindGeoLocationQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  geoLocation,
}: CellSuccessProps<FindGeoLocationQuery, FindGeoLocationQueryVariables>) => {
  return (
    <div>
      {geoLocation.stations.map((station) => (
        <StationCell code={station.code} key={station.code}></StationCell>
      ))}
    </div>
  )
}
