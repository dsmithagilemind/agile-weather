import { useEffect, useLayoutEffect, useState } from 'react';

import {
  Group,
  Text
} from '@mantine/core'
import { DataGrid, DataGridPaginationState, highlightFilterValue, stringFilterFn } from 'mantine-data-grid'
import * as _ from 'radash'
import { Filter, FilterInput, StringFilter, SortField } from 'types/graphql';

import { useQuery } from '@redwoodjs/web'

import ChartModal from 'src/components/ChartModal/ChartModal'

import { FilterExpression } from '../../../types/graphql';

export const FILTER_QUERY = gql`
  query FilterStations(
    $offset: Int!
    $limit: Int!
    $filterQuery: FilterInput!
    ) {
      filterStations(
      offset: $offset,
      limit: $limit,
      filterQuery: $filterQuery,
    ) {
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
  }
`

export const COUNT_QUERY = gql`
query FilterStationsCount(
  $filterQuery: FilterInput!
  ) {
    filterStationsCount(
    filterQuery: $filterQuery
  )
}
`


const _testFilter: FilterExpression = {
  field: "stationName",
  stringFilter: {
    contains: "u"
  },
  OR: [
    {
      field: "stationName",
      stringFilter: {
        contains: "d"
      }
    },
    {
      field: "stationName",
      stringFilter: {
        contains: "j"
      }
    }
  ],
  AND: [
    {
      field: "elevation",
      numberFilter: {
        gte: 1819
      },
      NOT: [
        {
          field: "code",
          stringFilter: {
            contains: "c"
          }
        }
      ]
    }
  ]
}

const _testInput: FilterInput = {
  where: _testFilter
}



const RowDataKeyToTitles = {
  stationName: 'Station Name',
  longitude: 'Longitude',
  latitude: 'Latitude',
  code: 'Station Code',
  elevation: 'Elevation',
}

// TODO: remove filterinput requirement on filterStations
const noFilter: FilterExpression = {
  field: "stationName",
  stringFilter: { contains: ""}
}

const FilterStationsTable = () => {

  const PAGE_COUNT = 10


  const buildInput = (filter: FilterExpression = noFilter, orderBy?: SortField[]): FilterInput => {
    return {
      where: filter,
      orderBy: orderBy,
    }
  }

  type QueryPagination = { offset: number, limit: number }

  const [currentPagination, setCurrentPagination]: [QueryPagination, any] = useState({ offset: 0, limit: PAGE_COUNT })
  const [currentFilter, setCurrentFilter]: [FilterExpression, any] = useState(buildInput())
  const [currentOrderBy, setCurrentOrderBy]: [SortField[], any] = useState()

  const [currentInput, setCurrentInput] = useState(buildInput())

  const [stationData, setStationData]: [unknown[]|undefined, any] = useState()

  useEffect(() => {
    setCurrentInput(buildInput(currentFilter, currentOrderBy))
    console.log(currentInput)
  }, [currentFilter, currentOrderBy])

  console.log({...currentPagination, filterQuery: currentInput})
  const { loading: filterLoading, error: filterError, data: filterData}
   = useQuery(FILTER_QUERY, {
     variables: {...currentPagination, filterQuery: currentInput},
   })

  const { loading: countLoading, error: countError, data: countData}
  = useQuery(COUNT_QUERY, {
    variables: currentInput
  })

  //const numPages = Math.ceil((countData?.filterStationsCount || 0) / PAGE_COUNT)

  const onPageChage = (pageState : DataGridPaginationState) => {
  }


  // filterData side effect
  useEffect(() => {

    if(!filterData?.filterStations) return;

    const { filterStations : stations } = filterData

    const stationsMapped = stations.map((station) => _.pick(station, Object.keys(RowDataKeyToTitles)))

    // check if we have climate entries on our stations, update that row's code to be a
    //  react element with a modal for the climate entry chart
    stations.forEach((station, i) => {
      if(station.code && station.climateEntries) {
        stationsMapped[i].code = (<Group spacing="xs">
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
  }, [filterData])

  // useEffect(() => {

  //   if(!countData) return

  //   if(stationData.length != countData) {
  //     const arr = new Array(countData)
  //     for(let i = stationData.length - 1; i >= 0; i--) {
  //       arr[i] = stationData[i]
  //     }
  //     setStationData(arr)
  //   }

  //   console.log(stationData)

  // }, [stationData])


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
