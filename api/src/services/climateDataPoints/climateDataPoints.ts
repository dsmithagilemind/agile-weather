import type {
  QueryResolvers,
  MutationResolvers,
  ClimateDataPointRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const climateDataPoints: QueryResolvers['climateDataPoints'] = () => {
  return db.climateDataPoint.findMany()
}

export const climateDataPoint: QueryResolvers['climateDataPoint'] = ({
  id,
}) => {
  return db.climateDataPoint.findUnique({
    where: { id },
  })
}

export const createClimateDataPoint: MutationResolvers['createClimateDataPoint'] =
  ({ input }) => {
    return db.climateDataPoint.create({
      data: input,
    })
  }

export const updateClimateDataPoint: MutationResolvers['updateClimateDataPoint'] =
  ({ id, input }) => {
    return db.climateDataPoint.update({
      data: input,
      where: { id },
    })
  }

export const deleteClimateDataPoint: MutationResolvers['deleteClimateDataPoint'] =
  ({ id }) => {
    return db.climateDataPoint.delete({
      where: { id },
    })
  }

export const ClimateDataPoint: ClimateDataPointRelationResolvers = {
  station: (_obj, { root }) => {
    return db.climateDataPoint.findUnique({ where: { id: root?.id } }).station()
  },
  climateEntry: (_obj, { root }) => {
    return db.climateDataPoint
      .findUnique({ where: { id: root?.id } })
      .climateEntry()
  },
}
