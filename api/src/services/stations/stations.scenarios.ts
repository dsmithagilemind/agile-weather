import type { Prisma, Station } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StationCreateArgs>({
  station: {
    one: { data: { code: 'String' } },
    two: { data: { code: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Station, 'station'>
