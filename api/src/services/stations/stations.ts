import type {
  QueryResolvers,
  MutationResolvers,
  StationResolvers,
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

export const Station: StationResolvers = {
  Weather: (_obj, { root }) =>
    db.station.findUnique({ where: { id: root.id } }).Weather(),
}
