import { FilterExpression, FilterInput, StringFilter, NumberFilter } from "types/graphql";

/**
 * PrismaIsh's syntax imaginably gets *complicated* so let's just retype what we need
 */



// export type PrismaIshFilterConditions = {
//   equals?: string|number
//   not?: string|number
//   in?: string[]|number
//   notInt?: string[]|number
//   contains?: stringPrismaIshFilterCondition
//   startsWith?: string
//   endsWith?: string
//   search?: string
//   lt?: number
//   lte?: number
//   gt?: number
//   gte?: number
//   NOT?: PrismaIshFilterSyntax
//   OR?: PrismaIshFilterSyntax[]
//   AND?: PrismaIshFilterSyntax[]
// }



type PrismaIshFilterCondition = {
  equals?: string|number
  not?: string|number
  in?: string[]|number
  notInt?: string[]|number
  contains?: string
  startsWith?: string
  endsWith?: string
  search?: string
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

// type PrismaIshFilterOperator<T> = T & {
//   NOT?: PrismaIshFilterCondition|PrismaIshFilterCondition|PrismaIshFilterOperator<T>|PrismaIshFilterOperator<T>[];
//   OR?:  PrismaIshFilterCondition|PrismaIshFilterCondition|PrismaIshFilterOperator<T>|PrismaIshFilterOperator<T>[];;
//   AND?: PrismaIshFilterCondition|PrismaIshFilterCondition|PrismaIshFilterOperator<T>|PrismaIshFilterOperator<T>[];;
// }

// type PrismaIshSort<T> = {
//   [field: keyof T]: 'asc'|'desc'
// }

// type PrismaIshFilter<T> = {
//   where: PrismaIshFilterOperator<T>
//   orderBy?: PrismaIshSort<T>
// }

type PrismaIshExpression = PrismaIshFilterCondition
                            | PrismaIshFilterCondition[]
                            | PrismaIshFilterOperator
                            | PrismaIshFilterOperator[]

type PrismaIshFilterOperator = {
  NOT?:PrismaIshExpression,
  OR?: PrismaIshExpression,
  AND?: PrismaIshExpression,
  [Field: string]: PrismaIshExpression
}

type PrismaIshSort = {
  [field: string]: 'asc'|'desc'
}

type PrismaIshFilter = {
  where: PrismaIshFilterOperator
  orderBy?: PrismaIshSort
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

// type PrismaIshFilterSyntax = {
//   [columnName: string]: PrismaIshFilterConditions
// }


/*
  PrismaIshFilterSyntax looks like:

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

export const hasSubFilterExpressions = (filterExpression: FilterExpression): boolean => {
  return !!filterExpression.AND || !!filterExpression.OR || !!filterExpression.NOT
}

export const getSubFilterExpressions = (filterExpression: FilterExpression): FilterExpression[] => {
  const subExpressions = []
  filterExpression.AND && subExpressions.push(...filterExpression.AND)
  filterExpression.OR  && subExpressions.push(...filterExpression.OR)
  filterExpression.NOT && subExpressions.push(filterExpression.NOT)
  return subExpressions
}

export const FilterInputToPrismaIsh = (filterInput: FilterInput): PrismaIshFilter => {


  const filterExpressions = [filterInput.where]

  const prismaIshResult = {
    where: {}
  }

  for (let i = 0; i < filterExpressions.length; i++) {

  const expression: FilterExpression = filterExpressions[i]

  // and now we do our little dos-a-dis with fields and keys

  if(hasSubFilterExpressions(expression)) {
    filterExpressions.push(...getSubFilterExpressions(expression))
  }


  //orderBy

}
// export const endFilterToPrismaIshSyntax = (filter: StringFilter | NumberFilter): PrismaIshFilterSyntax => {
//   return filter as PrismaIshFilterSyntax
// }

// export default function toPrismaIshSyntax(filter: FilterInput): PrismaIshFilterSyntax {

//   /*
//     strip any stringFilter or numberFilter
//   */

//   const filter: PrismaIshFilterSyntax = {}

// }


