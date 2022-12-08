import {
  Group,
  Text
} from '@mantine/core'
import { highlightFilterValue, stringFilterFn } from 'mantine-data-grid'
import * as _ from 'radash'

import ChartModal from 'src/components/ChartModal/ChartModal'
import FilterStationsTable from 'src/components/FilterStationsTable/FilterStationsTable'

const RowDataKeyToTitles = {
  stationName: 'Station Name',
  longitude: 'Longitude',
  latitude: 'Latitude',
  code: 'Station Code',
  elevation: 'Elevation',
}

const StationSearchPage = () => {

  const stations=[];

  const data = stations.map((station) => _.pick(station, Object.keys(RowDataKeyToTitles)))

  // check if we have climate entries on our stations, update that row's code to be a
  //  react element with a modal for the climate entry chart
  stations.forEach((station, i) => {
    if(station.code && station.climateEntries) {
      data[i].code = (<Group spacing="xs">
        <Text sx={{fontFamily: "'Noto Sans Mono', monospace"}}>
          {station.code}
        </Text>
        {
          station.climateEntries.length == 3 ?
            (<ChartModal station={station} />)
            : null
        }
      </Group>)
    }
  })

  const columns = Object.entries(RowDataKeyToTitles).map(([key, title]) => {
    return {
      accessorKey: key,
      header: title,
      filterFn: stringFilterFn,
      cell: highlightFilterValue
    }
  })

  // return <DataGrid
  //   data={data}
  //   highlightOnHover
  //   withGlobalFilter
  //   withPagination
  //   withColumnFilters
  //   withSorting
  //   withColumnResizing
  //   columns={columns}
  //   styles={() => ({
  //     dataCellContent: {
  //       span: {
  //         fontFamily: "'Noto Sans Mono', monospace"
  //       }
  //     }
  //   })}
  // />

  return (<FilterStationsTable/>)
}

export default StationSearchPage
