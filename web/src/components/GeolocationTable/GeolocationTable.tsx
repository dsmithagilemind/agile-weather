import { useState } from 'react'

import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons'
import * as _ from 'radash'

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

////////////////////////////// THEME //////////////////////////////
const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}))

////////////////////////////// Interfaces //////////////////////////////
interface RowData {
  city: string
  county: string
  fips: string
  state: string
  stateAbbrev: string
  zip: string
}

const RowDataKeys = ['city', 'county', 'state', 'zip']

const RowDataTitles = {
  city: 'City',
  county: 'County',
  state: 'State',
  zip: 'Zip Code',
}

// interface TableSortProps {
//   data: RowData[]
// }

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

////////////////////////////// Headers //////////////////////////////

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

////////////////////////////// Data Mng //////////////////////////////
function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  )
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search
  )
}

////////////////////////////// Geolocation Table //////////////////////////////
const GeolocationTable = ({ geoLocations }) => {
  const data = geoLocations.map((geoLocation) =>
    _.pick(geoLocation, RowDataKeys)
  )

  const [sortedData, setSortedData] = useState(data)

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  //! fuck we've been working stations instead of locations

  // const rows = sortedData.map((row) => (
  //   <tr key={row.name}>
  //     <td>{row.name}</td>
  //     <td>{row.email}</td>
  //     <td>{row.company}</td>
  //   </tr>
  // ))

  const rowElements = sortedData.map((geoLocation, i) => {
    return (
      <tr key={i}>
        {RowDataKeys.map((key) => (
          <td key={key}>{geoLocation[key]}</td>
        ))}
      </tr>
    )
  })

  const emptyElement = (
    <tr>
      <td colSpan={Object.keys(data[0]).length}>
        <Text weight={500} align="center">
          Nothing found
        </Text>
      </td>
    </tr>
  )

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            {RowDataKeys.map((key) => {
              return (
                <Th
                  key={key}
                  sorted={sortBy === key}
                  reversed={reverseSortDirection}
                  // @ts-ignore
                  onSort={() => setSorting(key)}
                >
                  {RowDataTitles[key]}
                </Th>
              )
            })}
          </tr>
        </thead>
        <tbody>{sortedData.length > 0 ? rowElements : emptyElement}</tbody>
      </Table>
    </ScrollArea>
  )
}

export default GeolocationTable
