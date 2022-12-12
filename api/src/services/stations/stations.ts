import type {
  QueryResolvers,
  MutationResolvers,
  StationRelationResolvers,
  SortField,
  Filter
} from 'types/graphql'

import { db } from 'src/lib/db'
import { animated } from '@react-spring/web';

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

type FilterStationsCountArgs = { filters: Filter[] }
type FieldCondition = { [field: string]: string | number }
type AggregateCondition = {
  [operator: string]: Array<FieldCondition | AggregateCondition>
}
type WhereClause = { AND? : AggregateCondition[] }
type SortOrder = 'asc'|'desc'
type OrderByClause = { [field: string]: SortOrder }[]

const constructWhereClauseFromFilters = (filters: Filter[]) : WhereClause => {
  const where : WhereClause = {};

  for(const filterContainer of filters) {

    const AND = where.AND ??= [];

    const addAnd = (field, clause: AggregateCondition) => AND.push({
      [field]: {clause}
    })

    if(filterContainer.floatFilters) {
      // floatFilters, check equals, lessthan, greaterthan
      for(const filter of filterContainer.floatFilters) {

        filter.equals &&
         addAnd(filter.field, { equals: filter.equals })

        filter.lessThan &&
          addAnd(filter.field, { lt: filter.lessThan })


        filter.greaterThan &&
          addAnd(filter.field, { gt: filter.greaterThan })
      }
    }

    if(filterContainer.stringFilters) {
      // stringFilters, check contains
      for(const filter of filterContainer.stringFilters) {
        const OR = []

        for(const field of filter.fields) {
          OR.push(
            { [field]:
              { contains: filter.contains }
            })
        }
        AND.push( { OR })
      }
    }
  }

  return where;
}

const constructOrderByClauseFromSortFields = (sortFields: SortField[]) : OrderByClause => {

  const orderByClause: OrderByClause = [];
  for(const sortField of sortFields) {

    orderByClause.push({
      [sortField.field]: sortField.ascending ? 'asc' : 'desc'
    })
  }

  return orderByClause;
}


export const filterStationsCount: QueryResolvers['filterStationsCount'] = ({ filters } : FilterStationsCountArgs) => {


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
