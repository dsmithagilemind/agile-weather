import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Station/StationsCell'

import type { DeleteStationMutationVariables, FindStations } from 'types/graphql'

const DELETE_STATION_MUTATION = gql`
  mutation DeleteStationMutation($id: String!) {
    deleteStation(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (value: string | number) => {
  const output = value?.toString()
  if (output?.length > MAX_STRING_LENGTH) {
    return output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output ?? ''
}


const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime?: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}

const StationsList = ({ stations }: FindStations) => {
  const [deleteStation] = useMutation(DELETE_STATION_MUTATION, {
    onCompleted: () => {
      toast.success('Station deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteStationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete station ' + id + '?')) {
      deleteStation({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Code</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Elevation</th>
            <th>Gsn</th>
            <th>Hcn</th>
            <th>Wmoid</th>
            <th>Station name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id}>
              <td>{truncate(station.id)}</td>
              <td>{truncate(station.code)}</td>
              <td>{truncate(station.latitude)}</td>
              <td>{truncate(station.longitude)}</td>
              <td>{truncate(station.elevation)}</td>
              <td>{truncate(station.gsn)}</td>
              <td>{truncate(station.hcn)}</td>
              <td>{truncate(station.wmoid)}</td>
              <td>{truncate(station.stationName)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.station({ id: station.id })}
                    title={'Show station ' + station.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editStation({ id: station.id })}
                    title={'Edit station ' + station.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete station ' + station.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(station.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StationsList
