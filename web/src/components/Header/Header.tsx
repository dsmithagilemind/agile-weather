import { Group, Header as MantineHeader } from '@mantine/core'

import Title from '../Title/Title'

// type HeaderProps = {
//   children?: React.ReactNode
// }

const Header = () => {
  return (
    <MantineHeader height={60} p="xs">
      <Group position="apart">
        <Title />
      </Group>
    </MantineHeader>
  )
}

export default Header
