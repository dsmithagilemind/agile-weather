import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const zipSearches: QueryResolvers['zipSearches'] = () => {
  return db.zipSearch.findMany()
}

export const zipSearch: QueryResolvers['zipSearch'] = ({ id }) => {
  return db.zipSearch.findUnique({
    where: { id },
  })
}

export const createZipSearch: MutationResolvers['createZipSearch'] = ({
  input,
}) => {
  return db.zipSearch.create({
    data: input,
  })
}

export const updateZipSearch: MutationResolvers['updateZipSearch'] = ({
  id,
  input,
}) => {
  return db.zipSearch.update({
    data: input,
    where: { id },
  })
}

export const deleteZipSearch: MutationResolvers['deleteZipSearch'] = ({
  id,
}) => {
  requireAuth({ roles: "admin" })
  return db.zipSearch.delete({
    where: { id },
  })
}
