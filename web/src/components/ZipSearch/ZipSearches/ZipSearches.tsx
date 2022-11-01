import { ActionIcon, Container, Grid, Group, Input, Stack, Text } from '@mantine/core'
import { IconClipboardCopy, IconEdit, IconLink, IconTrash } from '@tabler/icons'
import humanize from 'humanize-string'
import type {
  DeleteZipSearchMutationVariables,
  FindZipSearches
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EditZipSearchModal from 'src/components/EditZipSearchModal/EditZipSearchModal'
import { QUERY } from 'src/components/ZipSearch/ZipSearchesCell'
import { useZipSearchStore } from 'src/lib/stores'

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
    }
    else {
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

const _timeTag = (datetime?: string) => {
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
  const maxLength = 7;
  const truncZipSearches = [];

  // reversing and slicing by hand due to odd issue with react
  for(let i = zipSearches.length - 1; i >= 0; --i) {
    if(i < zipSearches.length - maxLength) break;
    truncZipSearches.push(zipSearches[i])
  }

  const ZipColumn = function({ zipCode }) {
    const setReloadZipCode = useZipSearchStore((state) => state.setReloadZipCode)

    return(
      <Grid.Col span="auto" sx={{marginLeft: -25}}>
        <Group>
          <Text>{zipCode}</Text>
          <ActionIcon size="sm" variant="outline" onClick={() => setReloadZipCode(zipCode)}>
            <IconClipboardCopy></IconClipboardCopy>
          </ActionIcon>
        </Group>
      </Grid.Col>
    )
  }

  return (
    <Container>
      <Stack>
        <Input.Label sx={{marginLeft: "-12px"}}>Recent Searches: </Input.Label>
        {truncZipSearches.map((zipSearch, i) => (
          <Grid key={i} gutter="xl" py="xs" px="md" sx={{borderTop: '1px solid gray'}}>


            <ZipColumn zipCode={zipSearch.zip} />

            <Grid.Col span={1} px="lg">

              <Link
                to={routes.zipSearch({ id: zipSearch.id })}
                title={'Show zipSearch ' + zipSearch.id + ' detail'}
                target="_blank"
              >
                <ActionIcon
                  size={"md"}
                  variant="gradient" gradient={{ from: 'blue', to: 'indigo', deg: 105 }}
                >
                  <IconLink></IconLink>
                </ActionIcon>
              </Link>
            </Grid.Col>

            <Grid.Col span={1} px="lg">
              <ActionIcon
                size={"md"}
                variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              >
                <EditZipSearchModal id={zipSearch.id} open={false}>

                  <IconEdit></IconEdit>
                </EditZipSearchModal>
              </ActionIcon>
            </Grid.Col>

            <Grid.Col span={1} px="lg">
              <ActionIcon
                size={"md"}

                variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                title={'Delete zipSearch ' + zipSearch.id}
                onClick={() => onDeleteClick(zipSearch.id)}

              >
                <IconTrash></IconTrash>
              </ActionIcon>
            </Grid.Col>
          </Grid>
        ))}
      </Stack>
    </Container>
  )
}

export default ZipSearchesList
