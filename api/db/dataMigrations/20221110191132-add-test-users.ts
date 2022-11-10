import type { PrismaClient } from '@prisma/client'

import { hashPassword } from '@redwoodjs/api'

export default async ({ db }: { db: PrismaClient }) => {

  const emails = [
    "admin@agileweather.com",
    "moderator@agileweather.com",
    "user1@abc.com",
    "user2@abc.com"
  ]

  const names = [
    "Administrator",
    "Moderator",
    "James Bond",
    undefined,
  ]

  const roles = [
    "admin moderator user",
    "moderator user",
    "user",
    "user"
  ]

  const debugPassword = '12345'

  const userData = emails.map((email, i) => {
    const [hashedPassword, salt] = hashPassword(debugPassword)
    return {
      name: names[i],
      roles: roles[i],
      email, hashedPassword, salt,
    }
  })

  await db.user.createMany({
    data: userData
  })
}
