import type { Prisma, ZipSearch, User } from '@prisma/client'

const zipSearchStandard = {
  one: { data: { zip: '12345', date: '2022-10-10T19:59:22Z' } } as Prisma.ZipSearchCreateArgs,
  two: { data: { zip: '56789', date: '2022-10-10T19:59:22Z' } } as Prisma.ZipSearchCreateArgs,
}

const userStandard = {
  admin: {
    data: {
      email: 'admin@agileweather.com',
      roles: 'admin moderator user',
      name: 'admin',
      hashedPassword: '12345',
      salt: '12345'
    }
  } as Prisma.UserCreateArgs
}

export const standard = {
  zipSearch: zipSearchStandard,
  user: userStandard
}

export type StandardScenario = {
  zipSearch: Record<keyof typeof zipSearchStandard, ZipSearch>
  user: Record<keyof typeof userStandard, User>
}
