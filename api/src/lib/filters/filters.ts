import * as _ from 'radash'
import { FilterExpression, FilterInput, StringFilter, NumberFilter } from "types/graphql";
/**
 * PrismaLike's syntax imaginably gets *complicated* so let's just retype what we need
 */



// export type PrismaLikeFilterConditions = {
//   equals?: string|number
//   not?: string|number
//   in?: string[]|number
//   notInt?: string[]|number
//   contains?: stringPrismaLikeFilterCondition
//   startsWith?: string
//   endsWith?: string
//   search?: string
//   lt?: number
//   lte?: number
//   gt?: number
//   gte?: number
//   NOT?: PrismaLikeFilterSyntax
//   OR?: PrismaLikeFilterSyntax[]
//   AND?: PrismaLikeFilterSyntax[]
// }

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

/*
db.station.findMany({
  where: {
    NOT: [
      {
        code: {
          equals: 'KJFK'
        }
      },
      {
        code: {
          equals: 'KLAX'
        }
      }
    ]
  }
})

*/

// type PrismaLikeFilterSyntax = {
//   [columnName: string]: PrismaLikeFilterConditions
// }


/*
  PrismaLikeFilterSyntax looks like:

  fieldName: {
    equals: value,
    contains: value,
    ...
    NOT: {
      otherFieldName: {
        value:
      }
    }
  }



  {
    equals,
    contains,
    ...
    NOT,
    AND,
    OR
  }

  FilterInputSyntax


*/

export const MAX_NESTED_FILTER_DEPTH = 5;

// ! TODO: MOVE TO A CLASS WITH CONSTRUCTOR & TYPESCRIPT GENERIC CASTER FOR PRISMA ARGS VALIDATION

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

const _stringFilterToPrismaLike = (fieldName: string, stringFilter: StringFilter): PrismaLikeFilterCondition => {
  const asPrismaLike = stringFilter as PrismaLikeStringFilter
  return { [fieldName]: asPrismaLike }
}

const _numberFilterToPrismaLike = (fieldName: string, numberFilter: NumberFilter): PrismaLikeFilterCondition => {
  const asPrismaLike = numberFilter as PrismaLikeNumberFilter
  return { [fieldName]: asPrismaLike }
}

// ! SHOULD BE A PRIVATE FIELD ON A CLASS
const _filterExpressionToPrismaLike = (filterExpression: FilterExpression, currentDepth = 0): PrismaLikeFilterSubObject => {

  // user error on max depth is caught in validator, so this is to catch developer errors :)
  if(currentDepth > MAX_NESTED_FILTER_DEPTH) {
    throw new Error(`Max depth of ${MAX_NESTED_FILTER_DEPTH} exceeded`)
  }

  const field = filterExpression.field
  const prismaLikeSubObject: PrismaLikeFilterSubObject = { [field]: {} }

  // in @validateDirective
  if(filterExpression.stringFilter) {
    prismaLikeSubObject[field] = _stringFilterToPrismaLike(field, filterExpression.stringFilter)
  }
  if(filterExpression.numberFilter) {
    prismaLikeSubObject[field] = _numberFilterToPrismaLike(field, filterExpression.numberFilter)
  }

  const expressionSubFilters = _.pick(filterExpression, ['AND', 'OR', 'NOT']);

  Object.entries(expressionSubFilters).forEach(([exprKey, subExpression]) => {
    // recursed depth should be checked in
    if(Array.isArray(subExpression)) {
      prismaLikeSubObject[exprKey] = subExpression.map(
        subExpressionChild => _filterExpressionToPrismaLike(subExpressionChild, currentDepth + 1))
    }
    else {
      prismaLikeSubObject[exprKey] = _filterExpressionToPrismaLike(subExpression, currentDepth + 1)
    }
  })

  return prismaLikeSubObject;
}

export const FilterInputToPrismaLike = (filterInput: FilterInput): PrismaLikeFilter => {

  const prismaLikeResult: PrismaLikeFilter = {
    where: _filterExpressionToPrismaLike(filterInput.where)
  }

  if(filterInput.orderBy) {
    const orderBy: PrismaLikeSort = {}
    for(const orderByField of filterInput.orderBy) {
      orderBy[orderByField.field] = orderByField.ascending? 'asc' : 'desc'
    }
    prismaLikeResult.orderBy = orderBy;
  }

  return prismaLikeResult

}
