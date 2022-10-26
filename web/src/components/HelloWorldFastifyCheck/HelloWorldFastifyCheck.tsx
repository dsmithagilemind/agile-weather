import { useState } from 'react'

import { Box, Button, Container, Group, TextInput } from '@mantine/core'
import { useInputState } from '@mantine/hooks'

const HelloWorldFastifyCheck = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [apiUrl, setApiUrl] = useInputState('http://localhost:8911')

  const successfulComponent = (
    <Box color="green.9">Recieved data: {JSON.stringify(data)}</Box>
  )
  const erroredComponent = (
    <Box color="red.9">Query failed: {JSON.stringify(errorMessage)}</Box>
  )
  const loadingComponent = <Box color="orange.9">Fetching...</Box>

  /**
   *
   * Unfortunately, looks like redwood's cors protection doesn't seem
   *  to include custom routes in fastify. So doing a manual route
   *  won't work here, but we can still test the route by
   *  navigating
   *
   *
   */
  function sendRequest() {
    const dest = apiUrl + '/hello-fastify'
    console.log(dest)
    fetch(dest)
      .then((response) => {
        console.log(response)
        setData(response)
      })
      .catch((error) => setErrorMessage(error))
      .finally(() => setLoading(false))

    try {
      // something
    }
    catch (e) {
      // somehting else
    }
  }

  const finalElement = errorMessage ? erroredComponent : successfulComponent

  return (
    <Container>
      <Group>
        <TextInput
          onChange={setApiUrl}
          rightSection={<Box>/hello-fastify</Box>}
          value={apiUrl}
        ></TextInput>
        <Button onClick={sendRequest}>Send</Button>
      </Group>
      {loading ? loadingComponent : finalElement}
    </Container>
  )
}

export default HelloWorldFastifyCheck
