import cuid from 'cuid'

async function _rollback(db) {
  console.error(
    `
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    !!! _rollback() has been called, do NOT use this function in a prod environment !!!
    !!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!
    `
  )

  await db.station.updateMany({
    where: {},
    data: {
      id: null,
    },
  })

  await db.climateEntry.updateMany({
    where: {},
    data: {
      stationId: null,
    },
  })

  await db.climateDataPoint.updateMany({
    where: {},
    data: {
      id: null,
    },
  })

  console.log('_rollback() completed')
}

export default async ({ db }) => {
  //await _rollback(db)

  const stations = await db.station.findMany({})

  for (let i = stations.length - 1; i >= 0; --i) {
    const newId = cuid()

    const station = await db.station.update({
      where: {
        code: stations[i].code,
      },
      data: {
        id: newId,
      },
    })

    await db.climateEntry.updateMany({
      where: {
        stationCode: station.code,
      },
      data: {
        stationId: newId,
      },
    })
  }

  const climateDataPoints = await db.climateDataPoint.findMany({})

  for (let i = climateDataPoints.length - 1; i >= 0; --i) {
    await db.climateDataPoint.update({
      where: {
        cuid: climateDataPoints[i].cuid,
      },
      data: {
        id: climateDataPoints[i].cuid,
      },
    })
  }
}
