import { useMemo } from 'react'

import { Button, Group, Input, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useCreateZipSearch } from 'src/components/ZipSearch/NewZipSearch'
import { useZipSearchStore } from 'src/lib/stores'


const zipValidateRegex = /^\d{5}$/
const zipPatternRegex = /[^\d]/
const defaultZip = '79830'


const ZipCodeSearchBar = () => {


  const setLoadZipCode = useZipSearchStore((state) => state.setLoadZipCode)

  const loadZipCode = useZipSearchStore((state) => state.loadZipCode)

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
    <Group px="lg" grow>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Input.Wrapper
          id="zipCodeSearchInput"
          px="xs"
        >
          <Input.Label py="xs">
            <Text>Search by zipcode:</Text>
          </Input.Label>
          <TextInput
            id="zipCodeSearchInput"
            {...form.getInputProps('zip')}
            onChange={(event) => setZipValue(event.target.value)}
            rightSection={
              (
                <Button px="xs" sx={{marginRight: 25}} type="submit">Search</Button>)
            }
            value={loadZipCode||""}
          ></TextInput>
        </Input.Wrapper>
      </form>

    </Group>
  )
}

export default ZipCodeSearchBar
