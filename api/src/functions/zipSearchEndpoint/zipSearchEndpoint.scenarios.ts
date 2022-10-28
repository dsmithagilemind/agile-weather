import { Prisma, ZipSearch } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ZipSearchCreateArgs>({
  zipSearch: {
    one: {
      data: {
        zip: '12345',
        date: new Date().toISOString()
      }
    },
    two: {
      data: {
        zip: '56789',
        date: new Date().toISOString()
      }
    }
  }
})

export type StandardScenario = ScenarioData<ZipSearch, 'zipSearch'>
