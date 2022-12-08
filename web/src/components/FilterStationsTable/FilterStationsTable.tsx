import { useEffect, useState } from 'react';

import {
  Group,
  Text
} from '@mantine/core'
import { DataGrid, DataGridPaginationState, highlightFilterValue, stringFilterFn } from 'mantine-data-grid'
import * as _ from 'radash'

import { useQuery } from '@redwoodjs/web'

import ChartModal from 'src/components/ChartModal/ChartModal'

// export const FILTER_QUERY = gql`
//   query FilterStations(
//     $offset: Int!
//     $limit: Int!
//     $filter: FilterStationsInput) {
//       filterStations(
//       offset: $offset,
//       limit: $limit,
//       filter: $filter
//     ) {
//       stationName
//         longitude
//         latitude
//         hcn
//         gsn
//         code
//         elevation
//         id
//         wmoid
//         climateEntries {
//           dataSet
//           period
//           topic
//           id
//           stationId
//           dataPoints {
//             value
//             label
//             id
//             flag
//             climateEntryId
//           }
//         }
//     }
//   }
// `

// export const COUNT_QUERY = gql`
// query FilterStationsCount(
//   $filter: FilterStationsInput!
//   ) {
//     filterStationsCount(
//     filter: $filter
//   )
// }
// `
const RowDataKeyToTitles = {
  stationName: 'Station Name',
  longitude: 'Longitude',
  latitude: 'Latitude',
  code: 'Station Code',
  elevation: 'Elevation',
}


// ! use useQuery
type SortField ={
  field: string
  order: string
}

type FloatFilter ={
  field: string
  equals: number
  lessThan: number
  greaterThan: number
}

type StringFilter= {
  fields: string[]
  contains: string
}

type Filter = {
  floatFilters?: FloatFilter[]
  stringFilters?: StringFilter[]
}

const FilterStationsTable = () => {

  const PAGE_COUNT = 10

  const baseStringFilter: StringFilter = {
    fields: ["throw an error pls"],
    contains: "ah"
  }

  const baseFilters: Filter[] = [{
    stringFilters: [baseStringFilter]
  }]

  const [currentOffset, setCurrentOffset] = useState(0)
  const [currentFilters, setCurrentFilter] = useState(baseFilters)
  const [stationData, setStationData] = useState()

  const { loading: filterLoading, error: filterError, data: filterData}
   = useQuery(FILTER_QUERY, {
     variables: { offset: currentOffset, limit: PAGE_COUNT, filters: currentFilters}
   })

  const { loading: countLoading, error: countError, data: countData}
  = useQuery(COUNT_QUERY, {
    variables: { filters: currentFilters}
  })

  //const numPages = Math.ceil((countData?.filterStationsCount || 0) / PAGE_COUNT)

  const onPageChage = (pageState : DataGridPaginationState) => {
    console.log(pageState)
    setCurrentOffset(pageState.pageIndex * pageState.pageSize)
  }


  useEffect(() => {

    if(!filterData?.filterStations) return;

    const { filterStations : stations } = filterData

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

    console.log(filterData)

    setStationData(data)

  }, [filterData])


  const columns = Object.entries(RowDataKeyToTitles).map(([key, title]) => {
    return {
      accessorKey: key,
      header: title,
      filterFn: stringFilterFn,
      cell: highlightFilterValue
    }
  })

  return <DataGrid
    data={stationData || []}
    highlightOnHover
    withGlobalFilter
    withPagination
    onPageChange={onPageChage}
    withColumnFilters
    withSorting
    withColumnResizing
    columns={columns}
    total={countData?.filterStationsCount||0}
    styles={() => ({
      dataCellContent: {
        span: {
          fontFamily: "'Noto Sans Mono', monospace"
        }
      }
    })}
  />
}

export default FilterStationsTable
