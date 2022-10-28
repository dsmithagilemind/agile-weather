import type { Prisma, ClimateEntry } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

import { getTestDataSanitized, Station } from 'src/lib/test-data'

function getStationData() : Station[] {
  return getTestDataSanitized().stations;
}

export const standard = defineScenario<Prisma.ClimateEntryCreateArgs>({
  climateEntry: {
    one: {
      data: {
        topic: 'String',
        period: 'String',
        dataSet: 'String',
        station: {
          create: {
            ...getStationData()[0]
          }
        },
      },
    },
    two: {
      data: {
        topic: 'String',
        period: 'String',
        dataSet: 'String',
        station: {
          create: {
            ...getStationData()[1]
          }
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ClimateEntry, 'climateEntry'>
