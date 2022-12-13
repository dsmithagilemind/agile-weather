import { FilterInput, NumberFilter, StringFilter } from "types/graphql";

import {
  createValidatorDirective,
  UserInputError,
  ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";


import { getSubExpressions, hasSubExpressions } from "src/lib/filters/filters";

import { getDbSchemaSync } from '../../lib/dbSchema/dbSchema';


export const schema = gql`
  """
  Use @validateFilter to validate access to a field, query or mutation.
  """
  directive @validateFilter(tables: [String!]!, max_depth: Int=3) on FIELD_DEFINITION
`;

export type RequestArgs = {
  filterQuery: FilterInput
}

export const VALIDATE_FILTER_ERRORS = {
  MISSING_FILTER_QUERY: (variables) => new UserInputError(`Missing filterQuery, received args: ${JSON.stringify(variables)}`),
  MISSING_TABLES: (directiveArgs) => new SyntaxError(`Missing 'tables: [String!]!' arg in @validateFilter directive, received args: ${JSON.stringify(directiveArgs)}`),
  INVALID_FILTER_QUERY: (filterQuery) => new UserInputError(`Invalid filterQuery, received: ${JSON.stringify(filterQuery)}`),
  INVALID_FILTER_FIELD: (filter, field) => new UserInputError(`Invalid or unexpected field '${field}' in filter ${JSON.stringify(filter)}`),
  INVALID_FILTER_QUERY_DEPTH: (maxDepth) => new UserInputError(`Filter query depth exceeded ${maxDepth}`),
  INVALID_SORT_FIELD: (sort, field) => new UserInputError(`Invalid or unexpected field '${field}' in sort ${JSON.stringify(sort)}`)
}

const validate: ValidatorDirectiveFunc = ({ context, directiveArgs }) => {
  /**
   * Write your validation logic inside this function.
   * Validator directives do not have access to the field value, i.e. they are called before resolving the value
   *
   * - Throw an error, if you want to stop executing e.g. not sufficient permissions
   * - Validator directives can be async or sync
   * - Returned value will be ignored
   */

  // validate arguments
  const requestArgs = context.variables as RequestArgs
  const filterQuery = requestArgs?.filterQuery
  console.log("__________________________________________________")

  if(!filterQuery) {
    throw VALIDATE_FILTER_ERRORS.MISSING_FILTER_QUERY
  }

  console.log(filterQuery)

  if(!directiveArgs?.tables) {
    throw VALIDATE_FILTER_ERRORS.MISSING_TABLES
  }

  const dbSchema = getDbSchemaSync()

  const validFields: string[] = []

  directiveArgs.tables.forEach(table => validFields.push(...dbSchema.tableFields[table]))

  console.log(validFields)

  const validateFields = (filter: StringFilter|NumberFilter) => {
    filter.fields.forEach(field => {
      console.log(field)
      if(!validFields.includes(field)) {
        throw VALIDATE_FILTER_ERRORS.INVALID_FILTER_FIELD(filter, field)
      }
    })
  }

  // validate depth and fields on filter

  const expressions = [filterQuery.where]

  let depth = 0
  for (let i = 0; i < expressions.length; i++) {
    const expression = expressions[i]
    expression.stringFilter && validateFields(expression.stringFilter)
    expression.numberFilter && validateFields(expression.numberFilter)
    if(hasSubExpressions) {
      depth++
      if(depth > directiveArgs.max_depth) {
        throw VALIDATE_FILTER_ERRORS.INVALID_FILTER_QUERY_DEPTH(directiveArgs.max_depth)
      }
      expressions.push(...getSubExpressions(expression))
    }
  }

  // validate orderBy
  filterQuery.orderBy && filterQuery.orderBy.forEach(orderBy => {
    if(!validFields.includes(orderBy.field)) {
      throw VALIDATE_FILTER_ERRORS.INVALID_SORT_FIELD(orderBy, orderBy.field)
    }
  })

};

const validateFilter = createValidatorDirective(schema, validate);

export default validateFilter;
