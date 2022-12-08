//import type { FilterStationsQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'


/*
  query FindGeoLocationByZip($zip: String!) {
    geoLocationsByZip(zip: $zip) {
      */
/*
export const QUERY = gql`
  query FilterStations(
    $offset: Int!
    $limit: Int!
    $filter: FilterStationsInput) {
      filterStations(
      offset: $offset,
      limit: $limit,
      filter: $filter
    ) {
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
`
*/

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

// export const Success = ({ filterStations }: CellSuccessProps<FilterStationsQuery>) => {
//   return (
//     <ul>
//       {filterStations.map((item) => {
//         return <li key={item.id}>{JSON.stringify(item)}</li>
//       })}
//     </ul>
//   )
// }
