import { Navbar } from '@mantine/core'

type SidebarProps = {
  children?: React.ReactNode
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <Navbar width={{ base: 300 }} height={'100%'} p="xs">
      {children}
    </Navbar>
  )
}

export default Sidebar
