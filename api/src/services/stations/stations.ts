import type {
  QueryResolvers,
  MutationResolvers,
  StationRelationResolvers,
  SortField
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
  {offset, limit, filters, sortFields}
) => {

  /*
   Filters:

  input SortField {
    key: String
    order: String
  }

  input FloatFilter {
    field: String
    equals: Float
    lessThan: Float
    greaterThan: Float
  }

  input StringFilter {
    fields: [String]
    contains: String
  }

  union Filter = FloatFilter | StringFilter


  filters contained in top level filters are all AND, fields within a filter are OR
   */

  const where = {}

  /*
    filters: [
      { <StringFilter>
        fields: [
          "code", "name"
        ],
        contains: [
          "abcd"
        ]
      },
      { <FloatFilter>
        field: "elevation",

      }
    ]

  */


  // const orderBy = {}

  // if(filter?.filterFloat) {

  // }

  const query = {
    skip: offset,
    take: limit,
    //orderBy: filter.sortFields
  }

  // TODO: fix sortFields in case order was missing


  return db.station.findMany(query)
}

export const filterStationsCount: QueryResolvers['filterStationsCount'] = ({ filters }) => {

  // TODO: use filter
  return db.station.count({})

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
