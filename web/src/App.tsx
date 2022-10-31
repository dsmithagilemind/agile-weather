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
          fontFamilyMonospace: 'Noto Sans Mono, monospace',
          fontFamily: 'Public Sans, sans-serif',
          headings: {
            fontFamily: 'Work Sans, sans-serif'
          }
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
