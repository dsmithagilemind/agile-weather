import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.StationCreateArgs>({
  station: {
    one: {
      data: {
        code: 'String',
        city: 'String',
        location: 'String',
        state: 'String',
      },
    },
    two: {
      data: {
        code: 'String',
        city: 'String',
        location: 'String',
        state: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
