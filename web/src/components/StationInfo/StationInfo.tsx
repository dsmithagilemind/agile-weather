import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import * as _ from 'radash'

import MinMaxAvgClimateEntriesChart from '../MinMaxAvgClimateEntriesChart/MinMaxAvgClimateEntriesChart'

function DataCard({ title, body, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{body}</Text>
    </Box>
  )
}

const StationInfo = ({ stationData }) => {
  const hasMinMaxAvgClimateEntries =
    stationData.climateEntries && stationData.climateEntries.length == 3

  return (
    <Stack spacing={8} direction="column">
      <Stack spacing={8} direction="row">
        <DataCard title={'StationCode'} body={stationData.code}></DataCard>
        <DataCard
          title={'StationName'}
          body={stationData.stationName}
        ></DataCard>
        <DataCard title={'Latitude'} body={stationData.latitude}></DataCard>
        <DataCard title={'Longitude'} body={stationData.longitude}></DataCard>
        <DataCard title={'Elevation'} body={stationData.elevation}></DataCard>
      </Stack>

      {!hasMinMaxAvgClimateEntries ? null : (
        <MinMaxAvgClimateEntriesChart
          stationClimateEntries={stationData.climateEntries}
        />
      )}
    </Stack>
  )
}

export default StationInfo
