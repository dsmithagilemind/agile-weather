import type { Prisma, GeoLocation } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.GeoLocationCreateArgs>({
  geoLocation: {
    one: { data: { city: 'String' } },
    two: { data: { city: 'String' } },
  },
})

export type StandardScenario = ScenarioData<GeoLocation, 'geoLocation'>
