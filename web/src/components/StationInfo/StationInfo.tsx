import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import * as _ from 'radash'

function DataCard({ title, body, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{body}</Text>
    </Box>
  )
}

const StationInfo = ({ stationData }) => {
  // const {stationName
  //   longitude
  //   latitude
  //   elevation
  //   code } = station;

  const filteredStationData = _.omit(stationData, ['id', '__typename'])

  const fields = Object.entries(filteredStationData).map(([key, val]) => {
    return <DataCard key={key} title={key} body={val}></DataCard>
  })

  return (
    <Stack spacing={8} direction="row">
      {fields}
    </Stack>
  )
}

export default StationInfo
