import { Container } from '@chakra-ui/react'
import type { GeolocationsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Geolocationinfo from '../Geolocationinfo/Geolocationinfo'

export const QUERY = gql`
  query FindGeoLocationByZip($zip: String!) {
    geoLocationsByZip(zip: $zip) {
      stations {
        elevation
        code
        latitude
        longitude
        stationName
      }
      city
      county
      state
      zip
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = (response) => {
  // console.dir(response)
  // const { geoLocationsByZip } = response

  // const elements = []

  // geoLocationsByZip.forEach((entry) => {
  //   console.log(entry)
  //   console.log(Object.entries(entry))
  //   Object.entries(entry).forEach((entry) => {
  //     console.log(Object.entries(entry))
  //   })
  //   elements.push(<Geolocationinfo geoLocationData={entry} />)
  // })

  // console.log(elements)

  // return <Container>{elements}</Container>
  return null
}
