import {
  createValidatorDirective,
  ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";

import FilterValidation from "src/lib/filters/filterValidation";


export const schema = gql`
  """
  Use @validatePrismaFilter to validate access to a field, query or mutation.
  """
  directive @validatePrismaFilter(allowedModels: [String!]!) on FIELD_DEFINITION
`;

type ValidatorDirectiveFuncArgs = {
  directiveArgs: { allowedModels: string[] }
  context: { variables: { prismaQueryInput: JSON }}
}


const VALIDATE_PRISMA_FILTER_ERRORS = {
  MISSING_ALLOWED_MODELS: () => new Error("SDL validation error: @validatePrismaFilter missing allowedModels"),
  MISSING_PRISMA_QUERY_INPUT: () => new Error("SDL validation error: @validatePrismaFilter missing prismaQueryInput"),
}

const validate: ValidatorDirectiveFunc = (input: unknown) => {

  const { context, directiveArgs } = input as ValidatorDirectiveFuncArgs

  if(!directiveArgs?.allowedModels) throw VALIDATE_PRISMA_FILTER_ERRORS.MISSING_ALLOWED_MODELS()
  if(!context?.variables?.prismaQueryInput) throw VALIDATE_PRISMA_FILTER_ERRORS.MISSING_PRISMA_QUERY_INPUT()

  // console.log(directiveArgs)
  // console.dir(context?.variables?.prismaQueryInput, directiveArgs)

  FilterValidation.ValidatePrismaFilter(context.variables.prismaQueryInput, directiveArgs.allowedModels)
};

const validatePrismaFilter = createValidatorDirective(schema, validate);

export default validatePrismaFilter;
