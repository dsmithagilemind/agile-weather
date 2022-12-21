import { FilterInput } from "types/graphql";

import {
  createValidatorDirective,
  UserInputError,
  ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";


import { getSubFilterExpressions, hasSubFilterExpressions, MAX_NESTED_FILTER_DEPTH } from "src/lib/filters/nestedFilter";

import { getDbSchemaSync } from '../../lib/dbSchema/dbSchema';


export const schema = gql`
  """
  Use @validateFilter to validate a FilterInput query, providing a list of valid tables
    to search, and a maximum depth to nested filters. max_depth does *not* override default gql depth
  """
  directive @validateFilter(tables: [String!]!) on FIELD_DEFINITION
`;

export type RequestArgs = {
  filterQuery: FilterInput
}

const validate: ValidatorDirectiveFunc = ({ context, directiveArgs }) => {

  // validate arguments
  const requestArgs = context.variables as RequestArgs
  const filterQuery = requestArgs?.filterQuery

  if(!filterQuery) {
    throw VALIDATE_FILTER_ERRORS.MISSING_FILTER_QUERY
  }

  if(!directiveArgs?.tables) {
    throw VALIDATE_FILTER_ERRORS.MISSING_TABLES
  }

  // get relevant tables and columns
  const dbSchema = getDbSchemaSync()

  const validFields: string[] = []
  directiveArgs.tables.forEach(table => validFields.push(...dbSchema.tableFields[table]))

  // validate depth and fields on filterExpressions
  const filterExpressions = [filterQuery.where]

  let depth = 0

  for (let i = 0; i < filterExpressions.length; i++) {

    const expression = filterExpressions[i]

    // TODO: move this kind of logic to filter.ts
    if(expression.stringFilter && expression.numberFilter) {
      throw VALIDATE_FILTER_ERRORS.INVALID_FILTER_QUERY_TYPE(filterQuery)
    }

    // check current expression for a valid table field
    if(!validFields.includes(expression.field)) {
      throw VALIDATE_FILTER_ERRORS.INVALID_FILTER_FIELD(filterQuery, expression.field)
    }

    // check for nested fields
    if(hasSubFilterExpressions(expression)) {

      // iterate and check depth
      if(++depth >= MAX_NESTED_FILTER_DEPTH) {
        throw VALIDATE_FILTER_ERRORS.INVALID_FILTER_QUERY_DEPTH(MAX_NESTED_FILTER_DEPTH)
      }

      // append nested expressions to the current list
      filterExpressions.push(...getSubFilterExpressions(expression))
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
