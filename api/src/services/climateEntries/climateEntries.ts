import type {
  QueryResolvers,
  MutationResolvers,
  ClimateEntryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const climateEntries: QueryResolvers['climateEntries'] = () => {
  return db.climateEntry.findMany()
}

export const climateEntriesByStation: QueryResolvers['climateEntriesByStation'] =
  ({ stationId }) => {
    return db.climateEntry.findMany({
      where: {
        stationId: stationId,
      },
    })
  }

export const climateEntry: QueryResolvers['climateEntry'] = ({ id }) => {
  return db.climateEntry.findUnique({
    where: { id },
  })
}

export const createClimateEntry: MutationResolvers['createClimateEntry'] = ({
  input,
}) => {
  return db.climateEntry.create({
    data: input,
  })
}

export const updateClimateEntry: MutationResolvers['updateClimateEntry'] = ({
  id,
  input,
}) => {
  return db.climateEntry.update({
    data: input,
    where: { id },
  })
}

export const deleteClimateEntry: MutationResolvers['deleteClimateEntry'] = ({
  id,
}) => {
  return db.climateEntry.delete({
    where: { id },
  })
}

export const ClimateEntry: ClimateEntryRelationResolvers = {
  station: (_obj, { root }) => {
    return db.climateEntry.findUnique({ where: { id: root?.id } }).station()
  },
  dataPoints: (_obj, { root }) => {
    return db.climateEntry.findUnique({ where: { id: root?.id } }).dataPoints()
  },
}
