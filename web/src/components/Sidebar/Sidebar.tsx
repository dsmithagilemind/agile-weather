
import { Container, Group, Navbar, Stack } from '@mantine/core'

import HelloWorldFastifyCheck from 'src/components/HelloWorldFastifyCheck/HelloWorldFastifyCheck'
import ZipSearchesCell from 'src/components/ZipSearch/ZipSearchesCell'

import ZipCodeSearchBar from '../ZipCodeSearchBar/ZipCodeSearchBar'

const Sidebar = () => {


  return (
    <Navbar
      height={'100%'}
      width={{ base: 400 }}
      sx={{ overflowX: 'scroll' }}
      p="xs"
    >
      <Stack align="flex-start" sx={{height: '100%'}}>
        <ZipCodeSearchBar />

        <Group px={25} grow>
          <ZipSearchesCell />
        </Group>

      </Stack>

    </Navbar>
  )
}

export default Sidebar
