import type { FindGeoLocationByZipVariables } from 'types/graphql'

import type { CellFailureProps } from '@redwoodjs/web'

// @ts-ignore
import ClimateEntriesCell from '../ClimateEntriesCell/ClimateEntriesCell'
import StationDataTable from '../StationDataTable/StationDataTable'

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
    <div>
      {geoLocation.stations.map((station, i) => (
        <div key={i}>
          <ClimateEntriesCell stationId={station.id} />
        </div>
      ))}
      <StationDataTable stations={geoLocation.stations} />
    </div>
  )
}
