import {
  createValidatorDirective,
  ValidatorDirectiveFunc,
} from "@redwoodjs/graphql-server";

import { logger } from "src/lib/logger";

export const schema = gql`
  """
  Use @validateFilter to validate access to a field, query or mutation.
  """
  directive @validateFilter(tables: [String!], depth: Int=5) on FIELD_DEFINITION
`;

export type RequestArgs = {
  sortFields?: SortField[]
  filters?: Filter[]
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

  // currentUser is only available when auth is setup.
  logger.debug(
    { currentUser: context.currentUser },
    "currentUser in validateFilter directive"
  );

  // You can also modify your directive to take arguments
  // and use the directiveArgs object provided to this function to get values
  // See documentation here: https://redwoodjs.com/docs/directives
  logger.debug(directiveArgs, "directiveArgs in validateFilter directive");

  throw new Error("Implementation missing for validateFilter");
};

const validateFilter = createValidatorDirective(schema, validate);

export default validateFilter;
