import { Divider, Title } from '@mantine/core'
import * as _ from 'radash'

import GeolocationTable from '../GeolocationTable/GeolocationTable'
import StationDataTable from '../StationDataTable/StationDataTable'

const GeolocationView = ({ geoLocations }) => {
  const stations = _.flat(geoLocations.map((g) => g.stations))

  return (
    <>
      <Title>Geolocations</Title>
      <GeolocationTable geoLocations={geoLocations} />
      <Divider></Divider>

      <Title>Stations</Title>
      <StationDataTable stations={stations} />
    </>
  )
}

export default GeolocationView
