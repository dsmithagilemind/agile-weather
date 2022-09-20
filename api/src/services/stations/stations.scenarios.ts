import type { Prisma, Station } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StationCreateArgs>({
  station: {
    one: {
      data: {
        code: 'String',
        geoLocation: { create: { city: 'String', stateAbbrev: 'String' } },
      },
    },
    two: {
      data: {
        code: 'String',
        geoLocation: { create: { city: 'String', stateAbbrev: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Station, 'station'>
