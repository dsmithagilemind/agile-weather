import { Space, Stack, Title } from '@mantine/core'
import * as _ from 'radash'

import GeolocationTable from '../GeolocationTable/GeolocationTable'
import StationDataTable from '../StationDataTable/StationDataTable'

/*
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
*/

const GeolocationView = ({ geoLocations }) => {
  const stations = _.flat(geoLocations.map((g) => g.stations))
  return (
    <Stack spacing="md">
      <Title>Geolocations</Title>
      <GeolocationTable geoLocations={geoLocations} />
      <Space h="sm" />

      <Title>Stations</Title>
      <StationDataTable stations={stations} />
    </Stack>
  )
}

export default GeolocationView
