import type {
  QueryResolvers,
  MutationResolvers,
  StationRelationResolvers,
  FilterInput,
  Expression
} from 'types/graphql'

import { db } from 'src/lib/db'
import { FilterInputToPrismaLike } from 'src/lib/filters/nestedFilter';

export const stations: QueryResolvers['stations'] = () => {
  return db.station.findMany()
}

export const station: QueryResolvers['station'] = ({ id }) => {
  return db.station.findUnique({
    where: { id },
  })
}

export const filterStations: QueryResolvers['filterStations'] = (
  { offset, limit, filterQuery }: FilterStationsInput
) => {

  const query = FilterInputToPrismaLike(filterQuery)

  query.skip = offset
  query.take = limit;

  // db.$queryRaw(`
  //   SELECT * FROM station
  //   WHERE ${query.where}
  //   `)

  return db.station.findMany(query)
}

export const filterStationsCount: QueryResolvers['filterStationsCount'] =
(input) => {

  const filterQuery = input.filterQuery as FilterInput;

  const query = FilterInputToPrismaLike(filterQuery)

  return db.station.count(query)
}

export const filterStationsPrisma: QueryResolvers['filterStationsPrisma'] = (
  { prismaQueryInput }
) => {

  return db.station.findMany(prismaQueryInput)

}

export const filterStations2Count: QueryResolvers['filterStations2Count'] = (
  { filterQuery }
) => {
  return db.station.count({
    where: filterQuery,
  })
}


export const createStation: MutationResolvers['createStation'] = ({
  input,
}) => {
  return db.station.create({
    data: input,
  })
}

export const updateStation: MutationResolvers['updateStation'] = ({
  id,
  input,
}) => {
  return db.station.update({
    data: input,
    where: { id },
  })
}

export const deleteStation: MutationResolvers['deleteStation'] = ({ id }) => {
  return db.station.delete({
    where: { id },
  })
}

export const Station: StationRelationResolvers = {
  geoLocations: (_obj, { root }) => {
    return db.station.findUnique({ where: { id: root?.id } }).geoLocations()
  },
  climateEntries: (_obj, { root }) => {
    return db.station.findUnique({ where: { id: root?.id } }).climateEntries()
  },
}
