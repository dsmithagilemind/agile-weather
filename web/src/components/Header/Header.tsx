import { Header as MantineHeader } from '@mantine/core'

type HeaderProps = {
  children?: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <MantineHeader height={60} p="xs">
      {' '}
      {children}
    </MantineHeader>
  )
}

export default Header
