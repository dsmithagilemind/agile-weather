import { Card, Group, ScrollArea, Text } from '@mantine/core'
import MinMaxAvgClimateEntriesChart from 'MinMaxAvgClimateEntriesChart/MinMaxAvgClimateEntriesChart'

const hasMinMaxAvgClimateEntries = (stationData) =>
  stationData.climateEntries && stationData.climateEntries.length == 3

const ClimateGraphScrollContainer = ({ stations }) => {
  const filteredStations = stations.filter((x) =>
    x.hasMinMaxAvgClimateEntries(x)
  )

  const stationGraphs = filteredStations.map((station) => {
    return (
      <MinMaxAvgClimateEntriesChart
        key={station.code}
        stationClimateEntries={station.climateEntries}
      />
    )
  })

  const stationCards = filteredStations.map((stationData, i) => {
    return (
      <Card key={stationData.code} shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>{stationGraphs[i]}</Card.Section>
        <Card.Section>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{stationData.name}</Text>
            <Text size="sm" color="dimmed">
              {stationData.code}
            </Text>
          </Group>
        </Card.Section>
      </Card>
    )
  })

  return (
    <ScrollArea style={{ width: '90%' }}>
      <Group spacing="xs">{stationCards}</Group>
    </ScrollArea>
  )
}

export default ClimateGraphScrollContainer
