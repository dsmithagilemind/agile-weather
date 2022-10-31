import { useState, useEffect } from 'react';

import { Container, createStyles, Grid, Group, Stack, Text, ThemeIcon } from '@mantine/core'
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
    <ThemeIcon
      variant="gradient"
      gradient={{ from: 'teal', to: 'lime', deg: 105 }}
      size="md"
    >
      <IconCheck></IconCheck>
    </ThemeIcon>
  )
  const errorComponent = (
    <Stack align="flex-start" >
      <Group color="red.9">
        <Text color="red.9">Could not query /hello-fastify</Text>

        <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
          <IconAlertCircle />
        </ThemeIcon>

      </Group>
      <Text color="red.9">{JSON.stringify(error)}</Text>
    </Stack>
  )

  const loadingComponent = (
    <Group align="flex-start">
      <Text>
        Querying /hello-fastify ...
      </Text>
      <LoadSpinner iconStyles={{color: "white"}} />
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
        setError(new Error("Test Error"))
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

  useEffect(() => {
    sendRequest()
  },
  // /* REQUIRED to prevent rerenders */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <Grid px={25}>
      <Text size="xs" sx={{border: '1px solid grey'}}>
        Custom fastify route health check:
      </Text>
      {
        loading?
          loadingComponent :
          success? successfulComponent : errorComponent
      }
    </Grid>
  )
}

export default HelloWorldFastifyCheck
