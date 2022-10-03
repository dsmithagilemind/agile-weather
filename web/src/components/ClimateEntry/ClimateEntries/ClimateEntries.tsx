import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ClimateEntry/ClimateEntriesCell'

import type { DeleteClimateEntryMutationVariables, FindClimateEntries } from 'types/graphql'

const DELETE_CLIMATE_ENTRY_MUTATION = gql`
  mutation DeleteClimateEntryMutation($id: Int!) {
    deleteClimateEntry(id: $id) {
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

const ClimateEntriesList = ({ climateEntries }: FindClimateEntries) => {
  const [deleteClimateEntry] = useMutation(DELETE_CLIMATE_ENTRY_MUTATION, {
    onCompleted: () => {
      toast.success('ClimateEntry deleted')
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

  const onDeleteClick = (id: DeleteClimateEntryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete climateEntry ' + id + '?')) {
      deleteClimateEntry({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Station id</th>
            <th>Topic</th>
            <th>Period</th>
            <th>Data set</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {climateEntries.map((climateEntry) => (
            <tr key={climateEntry.id}>
              <td>{truncate(climateEntry.id)}</td>
              <td>{truncate(climateEntry.stationId)}</td>
              <td>{truncate(climateEntry.topic)}</td>
              <td>{truncate(climateEntry.period)}</td>
              <td>{truncate(climateEntry.dataSet)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.climateEntry({ id: climateEntry.id })}
                    title={'Show climateEntry ' + climateEntry.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editClimateEntry({ id: climateEntry.id })}
                    title={'Edit climateEntry ' + climateEntry.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete climateEntry ' + climateEntry.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(climateEntry.id)}
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

export default ClimateEntriesList
