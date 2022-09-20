import type { Prisma, ClimateEntry } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ClimateEntryCreateArgs>({
  climateEntry: {
    one: {
      data: {
        station: {
          create: {
            code: 'String',
            geoLocation: { create: { city: 'String', stateAbbrev: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        station: {
          create: {
            code: 'String',
            geoLocation: { create: { city: 'String', stateAbbrev: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ClimateEntry, 'climateEntry'>
