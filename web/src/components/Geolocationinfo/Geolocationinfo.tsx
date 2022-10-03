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

const Geolocationinfo = (geoLocationData) => {
  const fields = Object.entries(geoLocationData).map(([key, val]) => {
    return <DataCard key={key} title={key} body={val}></DataCard>
  })
  return (
    <Stack spacing={8} direction="row">
      {fields}
    </Stack>
  )
}

export default Geolocationinfo
