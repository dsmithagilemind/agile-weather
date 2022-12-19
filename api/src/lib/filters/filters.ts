import * as _ from 'radash'
import { FilterExpression, FilterInput, NumberFilter, StringFilter } from "types/graphql";


type PrismaLikeFilterCondition = StringFilter | NumberFilter

type PrismaLikeExpression = PrismaLikeFilterCondition
                            | PrismaLikeFilterCondition[]
                            | PrismaLikeFilterSubObject
                            | PrismaLikeFilterSubObject[]

type PrismaLikeFilterSubObject = {
  NOT?:PrismaLikeExpression,
  OR?: PrismaLikeExpression,
  AND?: PrismaLikeExpression,
  [Field: string]: PrismaLikeExpression
}

type PrismaLikeSort = {
  [field: string]: 'asc'|'desc'
}

type PrismaLikeQuery = {
  where: PrismaLikeFilterSubObject
  orderBy?: PrismaLikeSort
}

export default class Filter {


  static HasNestedQueries(filterExpression: FilterExpression): boolean {
    return !!filterExpression.AND || !!filterExpression.OR || !!filterExpression.NOT
  }

  static GetNestedQueries(filterExpression: FilterExpression): FilterExpression[] {
    const nestedQueries = []
    filterExpression.AND && nestedQueries.push(...filterExpression.AND)
    filterExpression.OR  && nestedQueries.push(...filterExpression.OR)
    filterExpression.NOT && nestedQueries.push(...filterExpression.NOT)
    return nestedQueries
  }



  get prismaQuery(): PrismaLikeQuery {

  }



  constructor(gqlInput: FilterInput) {

  }





}

























// type PrismaLikeFilterOperator<T> = T & {
//   NOT?: PrismaLikeFilterCondition|PrismaLikeFilterCondition|PrismaLikeFilterOperator<T>|PrismaLikeFilterOperator<T>[];
//   OR?:  PrismaLikeFilterCondition|PrismaLikeFilterCondition|PrismaLikeFilterOperator<T>|PrismaLikeFilterOperator<T>[];;
//   AND?: PrismaLikeFilterCondition|PrismaLikeFilterCondition|PrismaLikeFilterOperator<T>|PrismaLikeFilterOperator<T>[];;
// }

// type PrismaLikeSort<T> = {
//   [field: keyof T]: 'asc'|'desc'
// }

// type PrismaLikeFilter<T> = {
//   where: PrismaLikeFilterOperator<T>
//   orderBy?: PrismaLikeSort<T>
// }


export const MAX_NESTED_FILTER_DEPTH = 5;

const _filterExpressionToPrismaLike = (filterExpression: FilterExpression, currentDepth = 0): PrismaLikeFilterSubObject => {

  // user error on max depth is caught in validator, so this is to catch developer errors :)
  if(currentDepth > MAX_NESTED_FILTER_DEPTH) {
    throw new Error(`Max depth of ${MAX_NESTED_FILTER_DEPTH} exceeded`)
  }

  const field = filterExpression.field
  const prismaLikeSubObject: PrismaLikeFilterSubObject = { [field]: {} }

  // in @validateDirective
  prismaLikeSubObject[field] = filterExpression.stringFilter || filterExpression.numberFilter

  if(hasSubFilterExpressions(filterExpression)) {

    const expressionSubFilters = _.pick(filterExpression, ['AND', 'OR', 'NOT']);
    Object.entries(expressionSubFilters).forEach(([exprKey, subExpression]) => {
      if(!subExpression) return;
      if(Array.isArray(subExpression)) {
        prismaLikeSubObject[exprKey] = subExpression.map(
          subExpressionChild => _filterExpressionToPrismaLike(subExpressionChild, currentDepth + 1))
      }
      else {
        prismaLikeSubObject[exprKey] = _filterExpressionToPrismaLike(subExpression, currentDepth + 1)
      }
    })
  }
  return prismaLikeSubObject;
}

export const FilterInputToPrismaLike = (filterInput: FilterInput): PrismaLikeFilter => {

  const where = _filterExpressionToPrismaLike(filterInput.where)

  const prismaLikeResult: PrismaLikeFilter = { where }

  if(filterInput.orderBy) {
    const orderBy: PrismaLikeSort = {}
    for(const orderByField of filterInput.orderBy) {
      orderBy[orderByField.field] = orderByField.ascending? 'asc' : 'desc'
    }
    prismaLikeResult.orderBy = orderBy;
  }

  //console.log(JSON.stringify(prismaLikeResult))
  return prismaLikeResult
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
