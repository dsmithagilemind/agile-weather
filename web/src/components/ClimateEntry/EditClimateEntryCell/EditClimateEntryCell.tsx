import type { EditClimateEntryById, UpdateClimateEntryInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClimateEntryForm from 'src/components/ClimateEntry/ClimateEntryForm'

export const QUERY = gql`
  query EditClimateEntryById($id: Int!) {
    climateEntry: climateEntry(id: $id) {
      id
      stationId
      topic
      period
      dataSet
    }
  }
`
const UPDATE_CLIMATE_ENTRY_MUTATION = gql`
  mutation UpdateClimateEntryMutation($id: Int!, $input: UpdateClimateEntryInput!) {
    updateClimateEntry(id: $id, input: $input) {
      id
      stationId
      topic
      period
      dataSet
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ climateEntry }: CellSuccessProps<EditClimateEntryById>) => {
  const [updateClimateEntry, { loading, error }] = useMutation(
    UPDATE_CLIMATE_ENTRY_MUTATION,
    {
      onCompleted: () => {
        toast.success('ClimateEntry updated')
        navigate(routes.climateEntries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateClimateEntryInput,
    id: EditClimateEntryById['climateEntry']['id']
  ) => {
    updateClimateEntry({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit ClimateEntry {climateEntry?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ClimateEntryForm climateEntry={climateEntry} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
