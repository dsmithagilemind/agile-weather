import { Container } from '@chakra-ui/react'
import type { FindGeoLocationByZipVariables } from 'types/graphql'

import type { CellFailureProps } from '@redwoodjs/web'

import ClimateEntriesCell from '../ClimateEntry/ClimateEntriesCell'
import StationInfo from '../StationInfo/StationInfo'

export const QUERY = gql`
  query FindGeoLocationQuery($id: Int!) {
    geoLocation: geoLocation(id: $id) {
      city
      county
      fips
      id
      state
      stateAbbrev
      zip
      stations {
        code
        elevation
        gsn
        hcn
        id
        latitude
        longitude
        stationName
        wmoid
        climateEntries {
          dataSet
          id
          period
          stationId
          topic
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindGeoLocationByZipVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ geoLocation }) => {
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
