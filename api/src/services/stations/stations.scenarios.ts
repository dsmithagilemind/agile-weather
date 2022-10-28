import type { Prisma, Station } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StationCreateArgs>({
  station: {
    one: { data: { code: 'String4373040' } },
    two: { data: { code: 'String6789808' } },
  },
})

export type StandardScenario = ScenarioData<Station, 'station'>
