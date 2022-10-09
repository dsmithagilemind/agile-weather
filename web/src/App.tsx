import { MantineProvider } from '@mantine/core'
import * as mantineTheme from 'config/mantine.config'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <MantineProvider
        theme={{
          ...mantineTheme,
          colorScheme: 'dark',
        }}
      >
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </MantineProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
