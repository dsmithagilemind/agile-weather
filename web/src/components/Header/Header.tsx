import { Group, Header as MantineHeader } from '@mantine/core'

import LoginInfoBar from '../LoginInfoBar/LoginInfoBar'
import Title from '../Title/Title'

// type HeaderProps = {
//   children?: React.ReactNode
// }

const Header = () => {
  return (
    <MantineHeader height={120} p="xs" sx={{width: '100%'}}>
      <Group position="apart">
        <Title />
        <LoginInfoBar />
      </Group>
    </MantineHeader>
  )
}

export default Header
