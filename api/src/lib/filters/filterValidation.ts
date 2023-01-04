import { Prisma } from "@prisma/client";

import { FieldName, getDbSchemaSync, UnionFields } from "../dbSchema/dbSchema";

// we don't care about what the value is, we only care about the filter keys
type FilterValue = string|string[]|number|number[]

// common props from Prisma.StringFilter & Prisma.IntFilter etc.
type FilterCondition = {
  equals?: FilterValue,
  not?: FilterValue,
  in?: FilterValue,
  notIn?: FilterValue,
  lt?: FilterValue,
  lte?: FilterValue,
  gt?: FilterValue,
  gte?: FilterValue,
  contains?: FilterValue,
  search?: FilterValue,
  mode?: FilterValue,
  startsWith?: FilterValue,
  endsWith?: FilterValue,
  AND?: Prisma.Enumerable<FilterCondition>,
  OR?: Prisma.Enumerable<FilterCondition>,
  NOT?: Prisma.Enumerable<FilterCondition>
}

// keys indicating a Prisma.Enumerable
const EnumerableInputKeys: Set<keyof FilterCondition|string> = new Set([ 'AND', 'NOT', 'OR' ])

const FilterConditionKeys: Set<keyof FilterCondition|string> = new Set([
  'equals',
  'not',
  'in',
  'notIn',
  'lt',
  'lte',
  'gt',
  'gte',
  'contains',
  'search',
  'mode',
  'startsWith',
  'endsWith',
])


export default class FilterValidation {

  static MAX_INPUT_QUERY_DEPTH  = 5

  static Errors = {
    INVALID_SORT_ORDER: (sortOrder) => new Error(`Invalid sort order: '${sortOrder}' must be 'asc' or 'desc'`),
    INVALID_FIELD: (field) => new Error(`Invalid or forbidden field: '${field}'`),
    INVALID_QUERY_INPUT_DEPTH: () => new Error(`Query input exceeded maximum depth of ${FilterValidation.MAX_INPUT_QUERY_DEPTH}!!`),
    INVALID_FILTER_CONDITION: (condition) => new Error(`Invalid filter condition: '${condition}'`),
  }

  static ValidatePrismaFilter(filterQueryInput: JSON, allowedModels: string[]) {
    const schema = getDbSchemaSync();
    const validFields = new Set(UnionFields(schema, allowedModels))

    // @ts-ignore
    const { where, orderBy } = filterQueryInput;
    orderBy && FilterValidation.ValidateOrderByInput(orderBy, validFields)
    where && FilterValidation.ValidateWhereInput(where, validFields)
  }

  static ValidateOrderByInput(orderBy: unknown, validFields: Set<FieldName>) {
    for(const [field, order] of Object.entries(orderBy)) {
      if(order != 'asc' && order != 'desc') throw FilterValidation.Errors.INVALID_SORT_ORDER(order)
      else if(!validFields.has(field)) throw FilterValidation.Errors.INVALID_FIELD(field)
    }
  }

  static ValidateWhereInput(where: unknown, validFields: Set<FieldName>) {
    FilterValidation.#validateWhereInputRecursively(where, validFields, 0)
  }

  static #validateWhereInputRecursively(
    input: FilterCondition,
    validFields: Set<FieldName>,
    depth=0): void {

    // throw if we've exceeded max depth
    if(depth > FilterValidation.MAX_INPUT_QUERY_DEPTH)
      throw FilterValidation.Errors.INVALID_QUERY_INPUT_DEPTH()

    // else iterate through the conditions
    for(const entry of Object.entries(input)) {

      /*
      where: {
        AND: [ // FilterObject
          {
            code:{ // FilterObject
              contains: "u" // condition
            }
          },
          {
            code: {
              contains: "s"
            }
          }
        ]
      }
      */

      type ExpectedKey = keyof FilterCondition | FieldName
      type ExpectedValue = Prisma.Enumerable<FilterCondition> | FilterValue

      const [key, val]: [ExpectedKey, ExpectedValue] = entry;

      // * 1. Is the current object's key indicate an enumerable object (AND, OR, NOT)
      if(EnumerableInputKeys.has(key)) {

        const enumerableCondition = val as Prisma.Enumerable<FilterCondition>

        // enumerables can be either a single FilterCondition or an array of FilterConditions
        if(Array.isArray(enumerableCondition)) {
          for(const conditionElement of enumerableCondition) {
            FilterValidation.#validateWhereInputRecursively(conditionElement, validFields, depth + 1)
          }
        }
        else {
          FilterValidation.#validateWhereInputRecursively(enumerableCondition, validFields, depth + 1)
        }
      }
      // * 2. Is the current object's key a valid field in our list of fields
      else if(validFields.has(key)) {

        // * 3. We've reached the bottom level conditions, validate the operations

        const conditionObject = val as FilterCondition

        for(const condition of Object.keys(conditionObject)) {
          if(!FilterConditionKeys.has(condition)){
            // not a valid filter condition, validation fails
            throw FilterValidation.Errors.INVALID_FILTER_CONDITION(condition)
          }
        }

      }
      // * Not an enumerable or a valid field, validation fails
      else {
        throw FilterValidation.Errors.INVALID_FIELD(key)
      }
    }
  }
}



