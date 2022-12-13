import * as _ from 'radash'
import { FilterExpression, FilterInput } from "types/graphql";

type PrismaLikeFilterCommon<T> = {
  equals?: T
  not?: T
  in?: T[]
  notIn?: T[]
}

type PrismaLikeNumberFilter = PrismaLikeFilterCommon<number> & {
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

type PrismaLikeStringFilter = PrismaLikeFilterCommon<string> & {
  contains?: string
  startsWith?: string
  endsWith?: string
  search?: string
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

type PrismaLikeFilterCondition = PrismaLikeNumberFilter | PrismaLikeStringFilter

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

type PrismaLikeFilter = {
  where: PrismaLikeFilterSubObject
  orderBy?: PrismaLikeSort
}

export const MAX_NESTED_FILTER_DEPTH = 5;

export const hasSubFilterExpressions = (filterExpression: FilterExpression): boolean => {
  return !!filterExpression.AND || !!filterExpression.OR || !!filterExpression.NOT
}

export const getSubFilterExpressions = (filterExpression: FilterExpression): FilterExpression[] => {
  const subExpressions = []
  filterExpression.AND && subExpressions.push(...filterExpression.AND)
  filterExpression.OR  && subExpressions.push(...filterExpression.OR)
  filterExpression.NOT && subExpressions.push(...filterExpression.NOT)
  return subExpressions
}

const _filterExpressionToPrismaLike = (filterExpression: FilterExpression, currentDepth = 0): PrismaLikeFilterSubObject => {

  // user error on max depth is caught in validator, so this is to catch developer errors :)
  if(currentDepth > MAX_NESTED_FILTER_DEPTH) {
    throw new Error(`Max depth of ${MAX_NESTED_FILTER_DEPTH} exceeded`)
  }

  const field = filterExpression.field
  const prismaLikeSubObject: PrismaLikeFilterSubObject = { [field]: {} }

  // in @validateDirective
  if(filterExpression.stringFilter) {
    prismaLikeSubObject[field] = filterExpression.stringFilter as PrismaLikeStringFilter
  }
  if(filterExpression.numberFilter) {
    prismaLikeSubObject[field] = filterExpression.numberFilter as PrismaLikeNumberFilter
  }

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
