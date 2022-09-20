import type {
  QueryResolvers,
  MutationResolvers,
  GeoLocationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const geoLocations: QueryResolvers['geoLocations'] = () => {
  return db.geoLocation.findMany()
}

export const geoLocation: QueryResolvers['geoLocation'] = ({ id }) => {
  return db.geoLocation.findUnique({
    where: { id },
  })
}

export const createGeoLocation: MutationResolvers['createGeoLocation'] = ({
  input,
}) => {
  return db.geoLocation.create({
    data: input,
  })
}

export const updateGeoLocation: MutationResolvers['updateGeoLocation'] = ({
  id,
  input,
}) => {
  return db.geoLocation.update({
    data: input,
    where: { id },
  })
}

export const deleteGeoLocation: MutationResolvers['deleteGeoLocation'] = ({
  id,
}) => {
  return db.geoLocation.delete({
    where: { id },
  })
}

export const GeoLocation: GeoLocationRelationResolvers = {
  weatherStations: (_obj, { root }) => {
    return db.geoLocation
      .findUnique({ where: { id: root?.id } })
      .weatherStations()
  },
}
