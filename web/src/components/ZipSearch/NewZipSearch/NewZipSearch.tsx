import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ZipSearchForm from 'src/components/ZipSearch/ZipSearchForm'

import type { CreateZipSearchInput } from 'types/graphql'

const CREATE_ZIP_SEARCH_MUTATION = gql`
  mutation CreateZipSearchMutation($input: CreateZipSearchInput!) {
    createZipSearch(input: $input) {
      id
    }
  }
`

const NewZipSearch = () => {
  const [createZipSearch, { loading, error }] = useMutation(
    CREATE_ZIP_SEARCH_MUTATION,
    {
      onCompleted: () => {
        toast.success('ZipSearch created')
        navigate(routes.zipSearches())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateZipSearchInput) => {
    createZipSearch({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ZipSearch</h2>
      </header>
      <div className="rw-segment-main">
        <ZipSearchForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewZipSearch
