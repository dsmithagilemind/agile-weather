const tableKeys = [
  'geoLocation',
  'station',
  'climateDataPoint',
  'climateEntry',
  'zipSearch',
]

async function _rollback(db) {
  console.error(
    `
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    !!! _rollback() has been called, do NOT use this function in a prod environment !!!
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    `
  )

  // for(const dbTableKey of tableKeys) {
  //   await db.$transaction([
  //     db
  //   ])
  // }

  const transactions = tableKeys.map((dbTableKey) =>
    db[dbTableKey].updateMany({
      where: {
        NOT: {
          updatedAt: null,
        },
      },
      data: {
        updatedAt: null,
      },
    })
  )

  await db.$transaction(transactions)

  console.log('_rollback() completed')
}

export default async ({ db }) => {
  // await _rollback(db)

  console.log('Adding updatedAt column to relevant tables')
  const now = new Date().toISOString()

  const transactions = tableKeys.map((dbTableKey) => {
    console.log(`Creating update transaction for table ${dbTableKey}`)
    return db[dbTableKey].updateMany({
      where: {
        updatedAt: null,
      },
      data: {
        updatedAt: now,
      },
    })
  })

  if (transactions) {
    console.log('Executing transactions...')
    await db.$transaction(transactions)

    console.log('Completed update')
  }
  else {
    console.log('No tables required updating')
  }

  console.log('Done')
}
