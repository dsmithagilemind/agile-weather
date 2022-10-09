import type { FindZipSearchById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ZipSearch from 'src/components/ZipSearch/ZipSearch'

export const QUERY = gql`
  query FindZipSearchById($id: String!) {
    zipSearch: zipSearch(id: $id) {
      id
      zip
      date
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ZipSearch not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ zipSearch }: CellSuccessProps<FindZipSearchById>) => {
  return <ZipSearch zipSearch={zipSearch} />
}
