import humanize from 'humanize-string'
import type { DeleteZipSearchMutationVariables, FindZipSearchById } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'



const DELETE_ZIP_SEARCH_MUTATION = gql`
  mutation DeleteZipSearchMutation($id: String!) {
    deleteZipSearch(id: $id) {
      id
    }
  }
`

const _formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    }
    else {
      return humanize(values as string)
    }
  }
}

const _jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const _checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}

interface Props {
  zipSearch: NonNullable<FindZipSearchById['zipSearch']>
}

const ZipSearch = ({ zipSearch }: Props) => {

  const { hasRole } = useAuth();

  const [deleteZipSearch] = useMutation(DELETE_ZIP_SEARCH_MUTATION, {
    onCompleted: () => {
      toast.success('ZipSearch deleted')
      navigate(routes.zipSearches())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteZipSearchMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete zipSearch ' + id + '?')) {
      deleteZipSearch({ variables: { id } })
    }
  }


  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ZipSearch {zipSearch.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{zipSearch.id}</td>
            </tr><tr>
              <th>Zip</th>
              <td>{zipSearch.zip}</td>
            </tr><tr>
              <th>Date</th>
              <td>{timeTag(zipSearch.date)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editZipSearch({ id: zipSearch.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        {
          !hasRole("admin") ? null :
            <button
              type="button"
              className="rw-button rw-button-red"
              onClick={() => onDeleteClick(zipSearch.id)}
            >
          Delete
            </button>
        }

      </nav>
    </>
  )
}

export default ZipSearch
