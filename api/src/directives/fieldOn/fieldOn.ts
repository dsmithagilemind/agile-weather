import { SyntaxError } from "apollo-server-core";
import { Filter, SortField } from "types/graphql";

import {
  createValidatorDirective, UserInputError, ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";

import { db } from "src/lib/db";
import { logger } from "src/lib/logger";

export const schema = gql`
  """
  Use @fieldOn to validate access to a field, query or mutation.
  """
  directive @fieldOn(table: String!) on FIELD_DEFINITION
`;

export type RequestArgs = {
  sortFields?: SortField[]
  filters?: Filter[]
}

/**
 * export error messages to more easily update errors in tests
 */
export const ON_FIELD_DIRECTIVE_ERRORS = {
  MISSING_TABLE_NAME: () =>  new SyntaxError("@fieldOn directive missing table name!!"),
  DB__BASE_DMMF:      () =>  new Error("Could not access PrismaClient._baseDmmf property!!"),
  TABLE_NOT_FOUND:    (tableName) => new SyntaxError(`Could not find table '${tableName}' in db model!!`),
  TABLE_WRONG_CASE:   (tableName) => new SyntaxError(`Could not find table '${tableName}' in db model!!\nTables are case sensitive, is '${tableName}' the correct casing?`),
  //MISSING_REQUEST_FILTERS: () => new FormatValidationError("Bad request: missing expected sortFields: SortField[] or filters: Filter[]"),
  INVALID_FILTER_COLUMN:   (field) => new UserInputError(`Could not filter or sort on field ${field}`)
}


const validate: ValidatorDirectiveFunc = ({ context, directiveArgs }) => {

  const reqArgs = context.variables as RequestArgs

  // if sortFields or filters were optional and unused, skip
  if(!reqArgs?.sortFields && !reqArgs?.filters) return;

  /**
   * Confirm the @fieldOn directive arg has a correct table name to check against
   */
  const tableName = directiveArgs?.table
  if(!tableName) throw ON_FIELD_DIRECTIVE_ERRORS.MISSING_TABLE_NAME()

  //@ts-ignore
  const dbModel = db._baseDmmf?.modelMap
  if(!dbModel) throw ON_FIELD_DIRECTIVE_ERRORS.DB__BASE_DMMF()

  if(!Object.keys(dbModel).includes(tableName)) {
    if(tableName[0] == tableName[0].toLowerCase()) {
      throw ON_FIELD_DIRECTIVE_ERRORS.TABLE_WRONG_CASE(tableName)
    }
    throw ON_FIELD_DIRECTIVE_ERRORS.TABLE_NOT_FOUND(tableName)
  }

  // ! Table names in model are case sensitive
  const selectedTable = dbModel[tableName]

  // ! Field names should NOT be case sensitive, so normalize them
  const tableFields = selectedTable.fields.map(field => field.name.toLowerCase());

  /**
   * Get the args we need to validate and flatten all the field names into a single Set
   */


  const reqSortFields = reqArgs?.sortFields as SortField[]
  const reqFilters = reqArgs?.filters as Filter[]

  const searchTableForFields = new Set<string>();

  reqSortFields && reqSortFields.forEach(sortField => searchTableForFields.add(sortField.field.toLowerCase()))

  reqFilters && reqFilters.forEach(filter => {
    filter.floatFilters?.forEach(numberFilter => {
      searchTableForFields.add(numberFilter.field)
    })
    filter.stringFilters?.forEach(stringFilter => {
      stringFilter.fields?.forEach(field => searchTableForFields.add(field.toLowerCase()))
    })
  })

  /**
   * Finally, compare the fields being searched on against the columns in the table
   */
  for(const field of searchTableForFields) {
    if(!tableFields.includes(field)) {
      logger.error(`Invalid filter or sort, column '${field}' not found on on '${tableName}'`)
      throw ON_FIELD_DIRECTIVE_ERRORS.INVALID_FILTER_COLUMN(field)
    }
  }
};

const fieldOn = createValidatorDirective(schema, validate);

export default fieldOn;
