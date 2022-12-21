import {
  createValidatorDirective,
  ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";

import { logger } from "src/lib/logger";

export const schema = gql`
  """
  Use @validateNestedFilter to validate access to a field, query or mutation.
  """
  directive @validateNestedFilter(allowedModels: [String!]!) on FIELD_DEFINITION
`;

const validate: ValidatorDirectiveFunc = ({ context, directiveArgs }) => {





};

const validateNestedFilter = createValidatorDirective(schema, validate);

export default validateNestedFilter;
