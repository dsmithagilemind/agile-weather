import type { Prisma, ClimateDataPoint } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ClimateDataPointCreateArgs>({
  climateDataPoint: {
    one: {
      data: {
        value: 'String',
        topic: 'String',
        period: 'String',
        station: {
          create: {
            code: 'String',
            geoLocation: { create: { city: 'String', stateAbbrev: 'String' } },
          },
        },
        climateEntry: {
          create: {
            station: {
              create: {
                code: 'String',
                geoLocation: {
                  create: { city: 'String', stateAbbrev: 'String' },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        value: 'String',
        topic: 'String',
        period: 'String',
        station: {
          create: {
            code: 'String',
            geoLocation: { create: { city: 'String', stateAbbrev: 'String' } },
          },
        },
        climateEntry: {
          create: {
            station: {
              create: {
                code: 'String',
                geoLocation: {
                  create: { city: 'String', stateAbbrev: 'String' },
                },
              },
            },
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
