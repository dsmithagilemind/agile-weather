import type {
  FindClimateEntries,
  FindClimateEntriesVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ClimateChart from 'src/components/ClimateChart/ClimateChart'

export const QUERY = gql`
  query FindClimateEntriesByStation($stationId: String!) {
    climateEntriesByStation(stationId: $stationId) {
      id
      stationId
      topic
      period
      dataSet
      dataPoints {
        value
        label
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No climateEntries yet. '}
      {/* <Link to={routes.newClimateEntry()} className="rw-link">
        {'Create one?'}
      </Link> */}
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ climateEntriesByStation }) => {
  let minPoints, maxPoints, avgPoints
  climateEntriesByStation.forEach((entry) => {
    switch (entry.topic) {
      case 'normal-tavg':
        avgPoints = entry.dataPoints
        break
      case 'normal-tmin':
        minPoints = entry.dataPoints
        break
      case 'normal-tmax':
        maxPoints = entry.dataPoints
        break
      default:
        throw new Error(
          `Unexpected data points in ClimateEntry with id ${entry.id}`
        )
    }
  })
  return (
    <>
      <ClimateChart {...{ minPoints, maxPoints, avgPoints }} />
    </>
  )
}
