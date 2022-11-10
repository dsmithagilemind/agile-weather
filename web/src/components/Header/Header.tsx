import { Header as MantineHeader, Stack } from '@mantine/core'

import LoginInfoBar from '../LoginInfoBar/LoginInfoBar'
import Title from '../Title/Title'

// type HeaderProps = {
//   children?: React.ReactNode
// }

const Header = () => {
  return (
    <MantineHeader height={120} p="xs">
      <Stack>
        <Title />
        <LoginInfoBar />
      </Stack>
    </MantineHeader>
  )
}

export default Header
