import * as _ from 'radash'
import { NestedFilterQuery, NumberFilter, StringFilter, RelationalFilter, NestedFilterQueryInput } from "types/graphql";

import { UserInputError } from '@redwoodjs/graphql-server';

type PrismaLikeFilterCondition = StringFilter | NumberFilter | RelationalFilter

type PrismaLikeFilterQuery = PrismaLikeFilterCondition
                            | PrismaLikeFilterCondition[]
                            | PrismaLikeNestedFilter
                            | PrismaLikeNestedFilter[]

type PrismaLikeNestedFilter = {
  NOT?:PrismaLikeFilterQuery,
  OR?: PrismaLikeFilterQuery,
  AND?: PrismaLikeFilterQuery,
  [Field: string]: PrismaLikeFilterQuery
}

type PrismaLikeSort = {
  [field: string]: 'asc'|'desc'
}

type PrismaLikeQuery = {
  where: PrismaLikeNestedFilter
  orderBy?: PrismaLikeSort
}

// common errors, separated here for repeatability in tests
export const VALIDATE_FILTER_ERRORS = {
  MISSING_FILTER_QUERY: (variables) => new UserInputError(`Missing filterQuery, received args: ${JSON.stringify(variables)}`),
  MISSING_TABLES: (directiveArgs) => new SyntaxError(`Missing 'tables: [String!]!' arg in @validateFilter directive, received args: ${JSON.stringify(directiveArgs)}`),
  INVALID_FILTER_QUERY: (filterQuery) => new UserInputError(`Invalid filterQuery, received: ${JSON.stringify(filterQuery)}`),
  INVALID_FILTER_QUERY_TYPE: (filterQuery) => new UserInputError(`Invalid filterQuery type, cannot have both stringFilter and numberFilter in a same level FilterExpression. Received filter: ${JSON.stringify(filterQuery)}`),
  INVALID_FILTER_FIELD: (filterQuery, field) => new UserInputError(`Invalid or unexpected field '${field}' in filter ${JSON.stringify(filterQuery)}`),
  INVALID_FILTER_QUERY_DEPTH: (maxDepth) => new UserInputError(`NestedFilter query depth exceeded ${maxDepth}`),
  INVALID_SORT_FIELD: (sort, field) => new UserInputError(`Invalid or unexpected field '${field}' in sort ${JSON.stringify(sort)}`)
}


export default class NestedFilter {

  static MAX_NESTED_FILTER_DEPTH = 5;

  static HasNestedQueries(nestedFilterQuery: NestedFilterQuery): boolean {
    return !!nestedFilterQuery.AND || !!nestedFilterQuery.OR || !!nestedFilterQuery.NOT
  }

  static GetNestedQueries(nestedFilterQuery: NestedFilterQuery): NestedFilterQuery[] {
    const nestedQueries = []
    nestedFilterQuery.AND && nestedQueries.push(...nestedFilterQuery.AND)
    nestedFilterQuery.OR  && nestedQueries.push(...nestedFilterQuery.OR)
    nestedFilterQuery.NOT && nestedQueries.push(...nestedFilterQuery.NOT)
    return nestedQueries
  }

  // static ValidateNestedFilterQueryInput(nestedFilterQueryInput: NestedFilterQueryInput, allowedModels: String[]) {

  // }

  #nestedFilterInput: NestedFilterQueryInput;

  #internalToPrismaQuery (currentFilterQuery, currentDepth = 0): PrismaLikeNestedFilter {

    // user error on max depth is caught in validator, so this is to catch developer errors :)
    if(currentDepth > NestedFilter.MAX_NESTED_FILTER_DEPTH) {
      throw new Error(`Max depth of ${NestedFilter.MAX_NESTED_FILTER_DEPTH} exceeded`)
    }

    const field = currentExpression.field
    const prismaLikeSubObject: PrismaLikeFilterSubObject = { [field]: {} }

    // in @validateDirective
    prismaLikeSubObject[field] = currentExpression.stringFilter || currentExpression.numberFilter

    if(NestedFilter.HasNestedQueries(currentExpression)) {

      const expressionSubFilters = _.pick(currentExpression, ['AND', 'OR', 'NOT']);
      Object.entries(expressionSubFilters).forEach(([exprKey, subExpression]) => {
        if(!subExpression) return;
        if(Array.isArray(subExpression)) {
          prismaLikeSubObject[exprKey] = subExpression.map(
            subExpressionChild => this.#internalToPrismaQuery(subExpressionChild, currentDepth + 1))
        }
        else {
          prismaLikeSubObject[exprKey] = this.#internalToPrismaQuery(subExpression, currentDepth + 1)
        }
      })
    }
    return prismaLikeSubObject;
  }


  toPrismaQuery(): PrismaLikeQuery {

    const where = this.#internalToPrismaQuery(this.#nestedFilterInput)

    const prismaLikeResult: PrismaLikeQuery = { where }

    if(this.#nestedFilterInput.orderBy) {
      const orderBy: PrismaLikeSort = {}
      for(const orderByField of this.#nestedFilterInput.orderBy) {
        orderBy[orderByField.field] = orderByField.ascending? 'asc' : 'desc'
      }
      prismaLikeResult.orderBy = orderBy;
    }

    //console.log(JSON.stringify(prismaLikeResult))
    return prismaLikeResult
  }


  constructor(gqlNestedFilterQueryInput: NestedFilterQueryInput) {
    this.#nestedFilterInput = gqlNestedFilterQueryInput
  }

}


/*
{
  "filterQuery": {
    "where": {
      "field": "stationName",
      "stringFilter": {
        "contains": "u"
      },
      "OR": [
        {
        "field": "stationName",
          "stringFilter": {
            "contains": "d"
          }
        },
        {
        "field": "stationName",
          "stringFilter": {
            "contains": "j"
          }
        }
      ],
      "AND": [
        {
          "field": "elevation",
          "numberFilter": {
            "gte": 1819
          },
          "NOT": [
            {
              "field": "code",
              "stringFilter": {
                "contains": "c"
              }
            }
          ]
        }
      ]
    }
  }
}
*/



/*

db.geoLocation.findMany({
  where: {
    stations: {
      stationName: {
        contains: 'u'
      }
    }
  }
})

db.station.findMany({
  where: {
    geoLocations: {
      some: {
        stations: {}
      }
    }
  }
})

  db.geoLocation.findMany({
    where: {
      stations: {
        geoLocations: {
          station: {
            stationName: {
              contains: 'u'
            }
          }
        }
      }
    },
    include: {
      station: true
    }
  })



*/
