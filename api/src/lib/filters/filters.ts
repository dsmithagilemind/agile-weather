import { Expression, FilterInput, StringFilter, NumberFilter } from "types/graphql";

/**
 * Prisma's syntax imaginably gets *complicated* so let's just retype what we need
 */
export type PrismaFilterSyntax = {
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
  NOT?: PrismaFilterSyntax
  OR?: PrismaFilterSyntax[]
  AND?: PrismaFilterSyntax[]
}

export const hasSubExpressions = (expression: Expression): boolean => {
  return !!expression.AND || !!expression.OR || !!expression.NOT
}

export const getSubExpressions = (expression: Expression): Expression[] => {
  const subExpressions = []
  expression.AND && subExpressions.push(...expression.AND)
  expression.OR  && subExpressions.push(...expression.OR)
  expression.NOT && subExpressions.push(expression.NOT)
  return subExpressions
}

export const hasTypeFilters = (expression: Expression): boolean => {
  return !!expression.stringFilter || !!expression.numberFilter
}

export const endFilterToPrismaSyntax = (filter: StringFilter | NumberFilter): PrismaFilterSyntax => {
  return filter as PrismaFilterSyntax
}

export default function toPrismaSyntax(filter: FilterInput): PrismaFilterSyntax {

  /*
    strip any stringFilter or numberFilter
  */

  const filter: PrismaFilterSyntax = {}



}


