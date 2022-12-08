
import { Navbar } from '@mantine/core'

const Sidebar = ({ children }) => {
  return (
    <Navbar
      height={'100%'}
      width={{ base: 375 }}
      sx={{ overflowX: 'scroll' }}
      p="xs"
    >
      {children}
    </Navbar>
  )
}

export default Sidebar
