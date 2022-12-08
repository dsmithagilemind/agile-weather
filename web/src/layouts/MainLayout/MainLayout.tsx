import { Anchor, AppShell, Breadcrumbs, Container, createStyles, Stack } from '@mantine/core';

import { NavLink, routes } from '@redwoodjs/router';

import Header from 'src/components/Header/Header';
import { usePageSidebarStore } from 'src/lib/stores';

type MainLayoutProps = {
  children?: React.ReactNode
}

// ! TODO: https://mantine.dev/styles/create-styles/#classes-merging-cx-function


const useStyles = createStyles((theme) => ({
  inActiveLink: {
    color: theme.primaryColor
  },
  activeLink: {
    textDecoration: 'underline',
    color: theme.colors.green
  }
}))

const MainLayout = ({ children }: MainLayoutProps) => {

  const { classes } = useStyles();

  const pageSidebarComponent = usePageSidebarStore((state) => state.pageSidebarComponent)


  return (
    <AppShell
      navbar={pageSidebarComponent}
      header={<Header></Header>}
    >
      <Stack>

        <Breadcrumbs>
          <Anchor
            component={NavLink}
            to={routes.home()}
            classNames={{}}
            activeClassName={classes.activeLink}
          >
              Home
          </Anchor>

          <Anchor
            component={NavLink}
            to={routes.stationSearch()}
            activeClassName={classes.activeLink}
          >
              All Stations
          </Anchor>
        </Breadcrumbs>

        <Container>
          {children}

        </Container>
      </Stack>
    </AppShell>
  )
}

export default MainLayout
