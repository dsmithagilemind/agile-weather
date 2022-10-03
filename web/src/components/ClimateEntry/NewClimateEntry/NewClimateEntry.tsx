import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClimateEntryForm from 'src/components/ClimateEntry/ClimateEntryForm'

import type { CreateClimateEntryInput } from 'types/graphql'

const CREATE_CLIMATE_ENTRY_MUTATION = gql`
  mutation CreateClimateEntryMutation($input: CreateClimateEntryInput!) {
    createClimateEntry(input: $input) {
      id
    }
  }
`

const NewClimateEntry = () => {
  const [createClimateEntry, { loading, error }] = useMutation(
    CREATE_CLIMATE_ENTRY_MUTATION,
    {
      onCompleted: () => {
        toast.success('ClimateEntry created')
        navigate(routes.climateEntries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateClimateEntryInput) => {
    createClimateEntry({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ClimateEntry</h2>
      </header>
      <div className="rw-segment-main">
        <ClimateEntryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewClimateEntry
