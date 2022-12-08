
import { Group, Navbar, Stack } from '@mantine/core'

import HelloWorldFastifyCheck from 'src/components/HelloWorldFastifyCheck/HelloWorldFastifyCheck'
import ZipSearchesCell from 'src/components/ZipSearch/ZipSearchesCell'

import Sidebar from '../Sidebar/Sidebar'
import ZipCodeSearchBar from '../ZipCodeSearchBar/ZipCodeSearchBar'

const ZipSearchSidebar = () => {

  return (
    <Sidebar>
      <Stack align="flex-start" sx={{height: '100%'}}>
        <ZipCodeSearchBar />

        <Group px={25} grow>
          <ZipSearchesCell />
        </Group>

        <Group px={25} grow>
          <HelloWorldFastifyCheck />
        </Group>

      </Stack>
    </Sidebar>
  )
}

export default ZipSearchSidebar
