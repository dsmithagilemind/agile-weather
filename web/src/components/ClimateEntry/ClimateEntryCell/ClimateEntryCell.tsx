import type { FindClimateEntryById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ClimateEntry from 'src/components/ClimateEntry/ClimateEntry'

export const QUERY = gql`
  query FindClimateEntryById($id: Int!) {
    climateEntry: climateEntry(id: $id) {
      id
      stationId
      topic
      period
      dataSet
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ClimateEntry not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ climateEntry }: CellSuccessProps<FindClimateEntryById>) => {
  return <ClimateEntry climateEntry={climateEntry} />
}
