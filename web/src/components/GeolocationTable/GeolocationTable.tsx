import {
  DataGrid, highlightFilterValue, stringFilterFn
} from 'mantine-data-grid';
import * as _ from 'radash';

// map of data keys to their respective column titles
const RowDataKeyToTitles = {
  city: 'City',
  county: 'County',
  state: 'State',
  zip: 'Zip Code',
}

const GeolocationTable = ({ geoLocations }) => {

  const data = geoLocations.map((geoLocation) =>
    _.pick(geoLocation, Object.keys(RowDataKeyToTitles))
  )

  const columns = Object.entries(RowDataKeyToTitles).map(([key, title]) => {
    return {
      accessorKey: key,
      header: title,
      filterFn: stringFilterFn,
      cell: highlightFilterValue
    }
  })

  return <DataGrid
    data={data}
    highlightOnHover
    withGlobalFilter
    withPagination
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



export default GeolocationTable
