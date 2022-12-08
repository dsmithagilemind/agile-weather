import {
  createValidatorDirective,
  ValidatorDirectiveFunc
} from "@redwoodjs/graphql-server";

import { db } from "src/lib/db";
import { logger } from "src/lib/logger";

export const schema = gql`
  """
  Use @fieldOn to validate access to a field, query or mutation.
  """
  directive @fieldOn(table: String!) on FIELD_DEFINITION
`;

const validate: ValidatorDirectiveFunc = ({ context, directiveArgs }) => {

  logger.error("TEST")
  throw new Error("STOP")

  logger.debug(context);
  logger.debug(directiveArgs)

  //@ts-ignore
  const fields = db._baseDmmf.modelMap.Station.fields.map(field => field.name.toLowerCase());

  logger.debug(fields)

  if(!directiveArgs.table || !fields.contains(directiveArgs.table)) {
    logger.error(`@fieldOn could not find field '${directiveArgs.field}' on table '${directiveArgs}'`)
    throw new Error(`Could not find that field!!\nSee logs for more detail.`);
  }


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
    "currentUser in fieldOn directive"
  );

  // You can also modify your directive to take arguments
  // and use the directiveArgs object provided to this function to get values
  // See documentation here: https://redwoodjs.com/docs/directives
  logger.debug(directiveArgs, "directiveArgs in fieldOn directive");

  throw new Error("Implementation missing for fieldOn");






};

const fieldOn = createValidatorDirective(schema, validate);

export default fieldOn;
