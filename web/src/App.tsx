import { MantineProvider } from '@mantine/core'
import * as mantineTheme from 'config/mantine.config'

import { AuthProvider } from '@redwoodjs/auth'
import WebAuthnClient from '@redwoodjs/auth/webAuthn'
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
      <AuthProvider type="dbAuth" client={WebAuthnClient}>
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
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
