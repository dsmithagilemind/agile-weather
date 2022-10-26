import { Group, Header as MantineHeader } from '@mantine/core'

import EndpointTestBar from '../EndpointTestBar/EndpointTestBar'
import Title from '../Title/Title'

type HeaderProps = {
  children?: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <MantineHeader height={60} p="xs">
      <Group position="apart">
        <Title />
        <EndpointTestBar />
      </Group>
    </MantineHeader>
  )
}

export default Header
