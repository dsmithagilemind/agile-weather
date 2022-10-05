import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import * as _ from 'radash'

import StationInfo from '../StationInfo/StationInfo'

function DataCard({ title, body, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{body}</Text>
    </Box>
  )
}

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

const Geolocationinfo = ({ geoLocationData }) => {
  const geoLocation = _.pick(geoLocationData, [
    'city',
    'county',
    'fips',
    'state',
    'stateAbbrev',
    'zip',
  ])

  const geoLocationElements = Object.entries(geoLocation).map(([key, val]) => {
    return <DataCard key={key} title={key} body={val}></DataCard>
  })

  return (
    <Stack spacing={2} direction="column">
      <Stack spacing={2} direction="row">
        {geoLocationElements}
      </Stack>
      {
        // @ts-ignore
        geoLocationData.stations.map((station, i) => (
          <StationInfo stationData={station} key={i} />
        ))
      }
    </Stack>
  )
}

export default Geolocationinfo
