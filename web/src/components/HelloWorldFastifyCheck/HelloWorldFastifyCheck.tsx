import { useState, useEffect } from 'react';

import { Container, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconAlertCircle, IconCheck } from '@tabler/icons';

import LoadSpinner from '../LoadSpinner/LoadSpinner';

enum TestLoadingState {
  Loading = "Loading",
  Success = "Success",
  Error = "Error"
}

type HelloWorldFastifyCheckPropTypes = {
  testLoadingState?: TestLoadingState
}

const HelloWorldFastifyCheck = (
  { testLoadingState = null }: HelloWorldFastifyCheckPropTypes
) => {

  const [loading, setLoading] = useState(true)

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)


  const successfulComponent = (
    <Group>
      <Text>Successfully queried /hello-fastify</Text>
      <ThemeIcon
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}

      >
        <IconCheck></IconCheck>
      </ThemeIcon>
    </Group>
  )
  const errorComponent = (
    <Stack>
      <Group color="red.9">
        <Text color="red.9">Could not query /hello-fastify</Text>

        <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
          <IconAlertCircle />
        </ThemeIcon>

      </Group>
      <Text color="red.9">{error}</Text>
    </Stack>
  )

  const loadingComponent = (
    <Group>
      <Text>
        Querying /hello-fastify ...
      </Text>
      (<LoadSpinner iconStyles={{color: "white"}} />)
    </Group>
  )
  /**
   *
   * Unfortunately, looks like redwood's cors protection doesn't seem
   *  to include custom routes in fastify. So doing a manual route
   *  won't work here, but we can still test the route by
   *  navigating
   *
   *
   */

  const _sentRequest = useEffect(() => {
    const execRequest = async () => {
      await sendRequest();
    }
    execRequest().catch(console.error)
  });

  async function sendRequest() {

    if(testLoadingState) {
      switch(testLoadingState) {
      case TestLoadingState.Loading:
        setLoading(true);
        break;
      case TestLoadingState.Success:
        setLoading(false);
        setSuccess(true);
        break;
      case TestLoadingState.Error:
        setSuccess(false);
        setLoading(false);
        setError("Test error")
        break;
      }
      return;
    }

    try {
      const dest = global.RWJS_API_URL + '/hello-fastify'
      const res = await fetch(dest);
      const json = await res.json();

      console.log(json)

      if(json.hello && json.hello == "world") {
        setSuccess(json)
        setLoading(false)
      }
      else {
        console.error(res);
        throw new Error("Data did not match expected response of { hello: 'world' }")
      }
    }
    catch(e) {
      console.error(e);
      setSuccess(false);
      setError(e)
      setLoading(false)
    }

  }


  return (
    <Container>
      {
        loading?
          loadingComponent :
          success? successfulComponent : errorComponent
      }
    </Container>
  )
}

export default HelloWorldFastifyCheck
