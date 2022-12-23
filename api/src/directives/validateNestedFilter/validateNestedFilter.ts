import {
  createValidatorDirective,
  ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";
import { getDbSchemaSync } from "src/lib/dbSchema/dbSchema";

import { logger } from "src/lib/logger";
import { NestedFilterQueryInput } from "types/graphql";

export const schema = gql`
  """
  Use @validateNestedFilter to validate access to a field, query or mutation.
  """
  directive @validateNestedFilter(allowedModels: [String!]!) on FIELD_DEFINITION
`;


type RequestArgs = {
  nestedFilterQueryInput: NestedFilterQueryInput
}


const validate: ValidatorDirectiveFunc = ({ context, directiveArgs }) => {

  // validate arguments
  const requestArgs = context.variables as RequestArgs
  const nestedFilterQuery = requestArgs?.nestedFilterQueryInput

  if(!nestedFilterQuery) {
    throw VALIDATE_FILTER_ERRORS.MISSING_FILTER_QUERY
  }

  if(!directiveArgs?.allowedModels) {
    throw VALIDATE_FILTER_ERRORS.MISSING_TABLES
  }

  // get relevant tables and columns
  const dbSchema = getDbSchemaSync()

  const validFields: string[] = []
  directiveArgs.allowedModels.forEach(table => validFields.push(...dbSchema.tableFields[table]))

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

const validateNestedFilter = createValidatorDirective(schema, validate);

export default validateNestedFilter;
