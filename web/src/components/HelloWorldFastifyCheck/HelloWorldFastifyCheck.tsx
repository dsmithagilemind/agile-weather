import { useEffect, useState } from 'react';

import { Group, Stack, Text, ThemeIcon } from '@mantine/core';
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
  const [_error, setError] = useState(null)

  const successfulComponent = (
    <Group spacing="xs">
      <ThemeIcon
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        size="xs"
      >
        <IconCheck></IconCheck>
      </ThemeIcon>
      <Text>
        /hello-fastify route queried
      </Text>
    </Group>
  )
  const errorComponent = (
    <Group color="red.9" spacing="xs">

      <ThemeIcon size="sm" variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
        <IconAlertCircle />
      </ThemeIcon>
      <Text color="red.9">Could not query /hello-fastify</Text>

    </Group>
  )

  const loadingComponent = (
    <Group align="flex-start" spacing="xs">
      <LoadSpinner iconStyles={{color: "white"}} />
      <Text>
        Querying /hello-fastify ...
      </Text>
    </Group>
  )

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
    <Stack py="md" spacing={0} justify="flex-end" >
      <Text size="xs" py={0}>
        Custom fastify route check:
      </Text>
      {
        loading?
          loadingComponent :
          success? successfulComponent : errorComponent
      }
    </Stack>
  )
}

export default HelloWorldFastifyCheck
