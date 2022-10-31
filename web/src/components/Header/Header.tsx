import { Group, Header as MantineHeader } from '@mantine/core'

import HelloWorldFastifyCheck from '../HelloWorldFastifyCheck/HelloWorldFastifyCheck'
import Title from '../Title/Title'

// type HeaderProps = {
//   children?: React.ReactNode
// }

const Header = () => {
  return (
    <MantineHeader height={100} p="xs">
      <Group position="apart">
        <Title />
        <HelloWorldFastifyCheck></HelloWorldFastifyCheck>
      </Group>
    </MantineHeader>
  )
}

export default Header
