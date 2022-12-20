import {
  createValidatorDirective,
  ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";

import { logger } from "src/lib/logger";

export const schema = gql`
  """
  Use @allowModels to validate access to a field, query or mutation.
  """
  directive @allowModels(models: [String!]!) on FIELD_DEFINITION
`;

const validate: ValidatorDirectiveFunc = ({ context, directiveArgs }) => {




};

const allowModels = createValidatorDirective(schema, validate);

export default allowModels;
