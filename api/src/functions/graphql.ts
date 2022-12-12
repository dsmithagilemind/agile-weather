import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = createGraphQLHandler({
  getCurrentUser,

  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  cors: {
    origin: [
      // TODO: these were an act of desperation, what can we get rid of here
      'http://localhost:8911',
      'https://localhost:8911',
      'http://localhost:8910',
      'https://localhost:8910',
    ],
  },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
