import { Card, Container, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconEdit, IconLink, IconTrash } from '@tabler/icons'
import humanize from 'humanize-string'
import type {
  DeleteZipSearchMutationVariables,
  FindZipSearches,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ZipSearch/ZipSearchesCell'

const DELETE_ZIP_SEARCH_MUTATION = gql`
  mutation DeleteZipSearchMutation($id: String!) {
    deleteZipSearch(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const _formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (value: string | number) => {
  const output = value?.toString()
  if (output?.length > MAX_STRING_LENGTH) {
    return output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output ?? ''
}

const _jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime?: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const _checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}

const ZipSearchesList = ({ zipSearches }: FindZipSearches) => {
  const [deleteZipSearch] = useMutation(DELETE_ZIP_SEARCH_MUTATION, {
    onCompleted: () => {
      toast.success('ZipSearch deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteZipSearchMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete zipSearch ' + id + '?')) {
      deleteZipSearch({ variables: { id } })
    }
  }

  return (
    <Container>
      {zipSearches.map((zipSearch, i) => (
        <Card key={i}>
          <Stack>
            <Group>
              <Text>{zipSearch.zip}</Text>
              <Link
                to={routes.zipSearch({ id: zipSearch.id })}
                title={'Show zipSearch ' + zipSearch.id + ' detail'}
                className="rw-button rw-button-small"
              >
                <ThemeIcon>
                  <IconLink></IconLink>
                </ThemeIcon>
              </Link>
              <Link
                to={routes.editZipSearch({ id: zipSearch.id })}
                title={'Edit zipSearch ' + zipSearch.id}
                className="rw-button rw-button-small rw-button-blue"
              >
                <ThemeIcon>
                  <IconEdit></IconEdit>
                </ThemeIcon>
              </Link>
              <button
                type="button"
                title={'Delete zipSearch ' + zipSearch.id}
                className="rw-button rw-button-small rw-button-red"
                onClick={() => onDeleteClick(zipSearch.id)}
              >
                <ThemeIcon>
                  <IconTrash></IconTrash>
                </ThemeIcon>
              </button>
            </Group>
            <Text>Created at: {timeTag(zipSearch.date)}</Text>
            <Text>Last updated: {timeTag(zipSearch.updatedAt)}</Text>
          </Stack>
        </Card>
      ))}
    </Container>

    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Zip</th>
    //         <th>Date</th>
    //         <th>Last Updated</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {zipSearches.map((zipSearch) => (
    //         <tr key={zipSearch.id}>
    //           <td>{truncate(zipSearch.zip)}</td>
    //           <td>{timeTag(zipSearch.date)}</td>
    //           <td>{timeTag(zipSearch.updatedAt)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.zipSearch({ id: zipSearch.id })}
    //                 title={'Show zipSearch ' + zipSearch.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editZipSearch({ id: zipSearch.id })}
    //                 title={'Edit zipSearch ' + zipSearch.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete zipSearch ' + zipSearch.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(zipSearch.id)}
    //               >
    //                 Delete
    //               </button>
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default ZipSearchesList
