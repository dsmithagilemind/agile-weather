import { useMemo } from 'react'

import { Navbar, TextInput, Button, Container, Stack, Group } from '@mantine/core'
import { useForm } from '@mantine/form'

import HelloWorldFastifyCheck from 'src/components/HelloWorldFastifyCheck/HelloWorldFastifyCheck'
import { useCreateZipSearch } from 'src/components/ZipSearch/NewZipSearch'
import ZipSearchesCell from 'src/components/ZipSearch/ZipSearchesCell'
import { useZipSearchStore } from 'src/lib/stores'

const zipValidateRegex = /^\d{5}$/
const zipPatternRegex = /[^\d]/
const defaultZip = '79830'

const Sidebar = () => {
  const setLoadZipCode = useZipSearchStore((state) => state.setLoadZipCode)

  //const [loadedZip, loadZip] = useState(defaultZip)

  const [_zipSearch, createNewZipSearch] = useCreateZipSearch()

  const form = useForm({
    initialValues: {
      zip: defaultZip,
    },
    validate: {
      zip: (value) =>
        zipValidateRegex.test(value) ? null : 'Please enter a 5 digit zip code',
    },
    validateInputOnBlur: true,
  })

  useMemo(() => setLoadZipCode(defaultZip), [setLoadZipCode])

  const zipCodeParser = (val: string) =>
    val.replace(zipPatternRegex, '').slice(-5)

  const setZipValue = (val: string) =>
    form.setValues({ zip: zipCodeParser(val) })

  function onSubmit({ zip }) {
    setLoadZipCode(zip)
    createNewZipSearch(zip)
  }

  return (
    <Navbar
      height={'100%'}
      width={{ base: 500 }}
      sx={{ overflowX: 'scroll' }}
      p="xs"
    >
      <Stack justify="space-around">
        <Container px={25}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              label="ZipCode"
              {...form.getInputProps('zip')}
              onChange={(event) => setZipValue(event.target.value)}
            ></TextInput>

            <Button type="submit">Search</Button>
          </form>
        </Container>

        <Group px={25} grow>
          <ZipSearchesCell />
        </Group>

        <Container px={25}>
          <HelloWorldFastifyCheck />
        </Container>
      </Stack>
    </Navbar>
  )
}

export default Sidebar
