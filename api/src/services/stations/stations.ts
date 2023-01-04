import type {
  QueryResolvers,
  MutationResolvers,
  StationRelationResolvers,
  FilterStationsInput,
  FilterStationsCountInput
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stations: QueryResolvers['stations'] = () => {
  return db.station.findMany()
}

export const station: QueryResolvers['station'] = ({ id }) => {
  return db.station.findUnique({
    where: { id },
  })
}

export const filterStations: QueryResolvers['filterStations'] = (
  { stationFilter, offset, limit }: FilterStationsInput
) => {
  return db.station.findMany({
    where: stationFilter,
    skip: offset,
    take: limit
  })
}

export const filterStationsCount: QueryResolvers['filterStationsCount'] =
( { stationFilter } : FilterStationsCountInput ) => {

  return db.station.count({where: stationFilter})
}

export const filterStationsPrisma: QueryResolvers['filterStationsPrisma'] = (
  { prismaQueryInput }
) => {
  return db.station.findMany({ where: prismaQueryInput })
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
