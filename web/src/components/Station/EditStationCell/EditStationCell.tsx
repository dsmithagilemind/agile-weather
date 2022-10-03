import type { EditStationById, UpdateStationInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import StationForm from 'src/components/Station/StationForm'

export const QUERY = gql`
  query EditStationById($id: String!) {
    station: station(id: $id) {
      id
      code
      latitude
      longitude
      elevation
      gsn
      hcn
      wmoid
      stationName
    }
  }
`
const UPDATE_STATION_MUTATION = gql`
  mutation UpdateStationMutation($id: String!, $input: UpdateStationInput!) {
    updateStation(id: $id, input: $input) {
      id
      code
      latitude
      longitude
      elevation
      gsn
      hcn
      wmoid
      stationName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ station }: CellSuccessProps<EditStationById>) => {
  const [updateStation, { loading, error }] = useMutation(
    UPDATE_STATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Station updated')
        navigate(routes.stations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateStationInput,
    id: EditStationById['station']['id']
  ) => {
    updateStation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Station {station?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <StationForm station={station} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
