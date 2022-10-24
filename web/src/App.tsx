import { MantineProvider } from '@mantine/core'
import * as mantineTheme from 'config/mantine.config'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

//const restLink = new RestLink({ uri: '/rest' })

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          ...mantineTheme,
          colorScheme: 'dark',
        }}
      >
        <RedwoodApolloProvider
        // graphQLClientConfig={{
        //   // @ts-ignore
        //   link: (rwLinks) => {
        //     const splitLink = ApolloLink.split(
        //       (operation) => operation.getContext().clientName === 'rest',

        //       // The string "rest" and "clientName" can be anything you want
        //       restLink, // Apollo will send to this if clientName is "rest"
        //       // @ts-ignore
        //       ApolloLink.from([...rwLinks]) // otherwise forward back to default stack
        //     )

        //     return splitLink
        //   },
        // }}
        >
          <Routes />
        </RedwoodApolloProvider>
      </MantineProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
