import type { EditZipSearchById, UpdateZipSearchInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ZipSearchForm from 'src/components/ZipSearch/ZipSearchForm'

export const QUERY = gql`
  query EditZipSearchById($id: String!) {
    zipSearch: zipSearch(id: $id) {
      id
      zip
      date
    }
  }
`
const UPDATE_ZIP_SEARCH_MUTATION = gql`
  mutation UpdateZipSearchMutation($id: String!, $input: UpdateZipSearchInput!) {
    updateZipSearch(id: $id, input: $input) {
      id
      zip
      date
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ zipSearch }: CellSuccessProps<EditZipSearchById>) => {
  const [updateZipSearch, { loading, error }] = useMutation(
    UPDATE_ZIP_SEARCH_MUTATION,
    {
      onCompleted: () => {
        toast.success('ZipSearch updated')
        navigate(routes.zipSearches())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateZipSearchInput,
    id: EditZipSearchById['zipSearch']['id']
  ) => {
    updateZipSearch({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit ZipSearch {zipSearch?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ZipSearchForm zipSearch={zipSearch} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
