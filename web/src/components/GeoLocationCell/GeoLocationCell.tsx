import { Container } from '@chakra-ui/react'
import type {
  FindGeoLocationQuery,
  FindGeoLocationQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ClimateEntriesCell from '../ClimateEntry/ClimateEntriesCell'
import StationInfo from '../StationInfo/StationInfo'

export const QUERY = gql`
  query FindGeoLocationQuery($id: Int!) {
    geoLocation: geoLocation(id: $id) {
      city
      county
      state
      stateAbbrev
      zip
      stations {
        id
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
    <Container>
      {geoLocation.stations.map((station, i) => (
        <Container key={i}>
          <StationInfo stationData={station} />
          <ClimateEntriesCell stationId={station.id} />
        </Container>
      ))}
    </Container>
  )
}
