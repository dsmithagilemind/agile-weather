import type { Prisma, ClimateDataPoint } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ClimateDataPointCreateArgs>({
  climateDataPoint: {
    one: {
      data: {
        label: 'String',
        value: 'String',
        climateEntry: {
          create: {
            topic: 'String',
            period: 'String',
            dataSet: 'String',
            station: { create: { code: 'String1' } },
          },
        },
      },
    },
    two: {
      data: {
        label: 'String',
        value: 'String',
        climateEntry: {
          create: {
            topic: 'String',
            period: 'String',
            dataSet: 'String',
            station: { create: { code: 'String2' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  ClimateDataPoint,
  'climateDataPoint'
>
