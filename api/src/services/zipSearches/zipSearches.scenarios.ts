import type { Prisma, ZipSearch } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ZipSearchCreateArgs>({
  zipSearch: {
    one: { data: { zip: 'String', date: '2022-10-10T00:13:58Z' } },
    two: { data: { zip: 'String', date: '2022-10-10T00:13:58Z' } },
  },
})

export type StandardScenario = ScenarioData<ZipSearch, 'zipSearch'>
