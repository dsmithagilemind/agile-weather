/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef } from 'react'

import { Button, Grid, Group, Input, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import shallow from 'zustand/shallow'

import { useCreateZipSearch } from 'src/components/ZipSearch/NewZipSearch'
import { useZipSearchStore } from 'src/lib/stores'


const zipValidateRegex = /^\d{5}$/
const zipPatternRegex = /[^\d]/
const defaultZip = '79830'


const ZipCodeSearchBar = () => {

  const [
    loadZipCode, setLoadZipCode, reloadZipCode, setReloadZipCode
  ] = useZipSearchStore((state) => [state.loadZipCode, state.setLoadZipCode, state.reloadZipCode, state.setReloadZipCode], shallow)

  //const [loadedZip, loadZip] = useState(defaultZip)
  const inputRef = useRef(null)

  useEffect(() => {
    if(!reloadZipCode) return;
    if(loadZipCode != reloadZipCode) {
      inputRef.current.value = reloadZipCode;
      form.setValues({ zip: zipCodeParser(reloadZipCode) })
      setReloadZipCode(undefined)
      setLoadZipCode(reloadZipCode)
    }
  // @ts-ignore
  }, [loadZipCode, reloadZipCode, form])

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

          <Grid>
            <Grid.Col span={"auto"}>
              <TextInput
                xs={{width: 200}}
                id="zipCodeSearchInput"
                {...form.getInputProps('zip')}
                onChange={(event) => setZipValue(event.target.value)}
                ref={inputRef}
              ></TextInput>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button
                px="xs"
                sx={{marginRight: 25}}
                type="submit"
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                fullWidth
              >
              Search
              </Button></Grid.Col>
          </Grid>

        </Input.Wrapper>
      </form>

    </Group>
  )
}

export default ZipCodeSearchBar
