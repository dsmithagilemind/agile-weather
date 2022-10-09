import { AppShell } from '@mantine/core'

import Header from 'src/components/Header/Header'
import Sidebar from 'src/components/Sidebar/Sidebar'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <AppShell
      padding="md"
      navbar={<Sidebar></Sidebar>}
      header={<Header></Header>}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  )
}

export default MainLayout
