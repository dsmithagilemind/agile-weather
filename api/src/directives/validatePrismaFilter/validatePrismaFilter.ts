import {
  createValidatorDirective,
  ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";

import { logger } from "src/lib/logger";

export const schema = gql`
  """
  Use @validatePrismaFilter to validate access to a field, query or mutation.
  """
  directive @validatePrismaFilter(primaryModel: String!, allowedModels: [String!]!) on FIELD_DEFINITION
`;

const validate: ValidatorDirectiveFunc = ({ context, directiveArgs }) => {

};

const validatePrismaFilter = createValidatorDirective(schema, validate);

export default validatePrismaFilter;
