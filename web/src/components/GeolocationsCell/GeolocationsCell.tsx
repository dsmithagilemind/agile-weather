import type { CellFailureProps } from '@redwoodjs/web'

import GeolocationView from '../GeolocationView/GeolocationView'

export const QUERY = gql`
  query FindGeoLocationByZip($zip: String!) {
    geoLocationsByZip(zip: $zip) {
      id
      city
      county
      fips
      state
      stateAbbrev
      zip
      stations {
        stationName
        longitude
        latitude
        hcn
        gsn
        code
        elevation
        id
        wmoid
        climateEntries {
          dataSet
          period
          topic
          id
          stationId
          dataPoints {
            value
            label
            id
            flag
            climateEntryId
          }
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ geoLocationsByZip }) => {
  return <GeolocationView geoLocations={geoLocationsByZip} />
}
