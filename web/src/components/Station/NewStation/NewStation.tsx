import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import StationForm from 'src/components/Station/StationForm'

import type { CreateStationInput } from 'types/graphql'

const CREATE_STATION_MUTATION = gql`
  mutation CreateStationMutation($input: CreateStationInput!) {
    createStation(input: $input) {
      id
    }
  }
`

const NewStation = () => {
  const [createStation, { loading, error }] = useMutation(
    CREATE_STATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Station created')
        navigate(routes.stations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateStationInput) => {
    createStation({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Station</h2>
      </header>
      <div className="rw-segment-main">
        <StationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewStation
