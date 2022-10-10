import { useState } from 'react'

import { Button, Container, Divider, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { MetaTags } from '@redwoodjs/web'

import GeolocationsCell from 'src/components/GeolocationsCell/GeolocationsCell'
// import ZipSearchesCell from 'src/components/ZipSearch/ZipSearchesCell/ZipSearchesCell'

//@ts-ignore

const zipValidateRegex = /^\d{5}$/
const zipPatternRegex = /[^\d]/
const defaultZip = '79830'

const HomePage = () => {
  const [loadedZip, loadZip] = useState(defaultZip)

  const form = useForm({
    initialValues: {
      zip: '79830',
    },
    validate: {
      zip: (value) =>
        zipValidateRegex.test(value) ? null : 'Please enter a 5 digit zip code',
    },
    validateInputOnBlur: true,
  })

  const zipCodeParser = (val: string) =>
    val.replace(zipPatternRegex, '').slice(-5)

  const setZipValue = (val: string) =>
    form.setValues({ zip: zipCodeParser(val) })

  function onSubmit({ zip }) {
    loadZip(zip)
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          label="ZipCode"
          {...form.getInputProps('zip')}
          onChange={(event) => setZipValue(event.target.value)}
        ></TextInput>

        <Button type="submit">Search</Button>
      </form>
      {/*
      <ZipSearchesCell /> */}

      <Divider />

      <Container>
        {loadedZip ? (
          <GeolocationsCell zip={loadedZip} />
        ) : (
          <div>No data loaded</div>
        )}
      </Container>
    </>
  )
}

export default HomePage
