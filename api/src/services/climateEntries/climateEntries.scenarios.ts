import type { Prisma, ClimateEntry } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ClimateEntryCreateArgs>({
  climateEntry: {
    one: {
      data: {
        topic: 'String',
        period: 'String',
        dataSet: 'String',
        station: { create: { code: 'String' } },
      },
    },
    two: {
      data: {
        topic: 'String',
        period: 'String',
        dataSet: 'String',
        station: { create: { code: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ClimateEntry, 'climateEntry'>
