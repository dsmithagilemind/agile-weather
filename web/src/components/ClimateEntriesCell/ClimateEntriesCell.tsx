import type { CellFailureProps } from '@redwoodjs/web'

import MinMaxAvgClimateEntriesChart from '../MinMaxAvgClimateEntriesChart/MinMaxAvgClimateEntriesChart'

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
  return (
    <MinMaxAvgClimateEntriesChart
      climateEntriesByStation={climateEntriesByStation}
    />
  )
}
