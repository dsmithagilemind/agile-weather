import type { Prisma, ClimateDataPoint } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

import { getTestData } from '../../lib/test-data';

export const standard = defineScenario<Prisma.ClimateDataPointCreateArgs>(
  (
    () => {
      const climateDataPoints = getTestData().climateDataPoints;
      return {
        climateDataPoint: {
          one: {
            data: climateDataPoints[0]
          },
          two: {
            data: climateDataPoints[1]
          }
        }
      }
    }
  )()
)

export type StandardScenario = ScenarioData<
  ClimateDataPoint,
  'climateDataPoint'
>
