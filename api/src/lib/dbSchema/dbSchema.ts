import { PrismaClient } from "@prisma/client";
import type { DMMFClass } from "@prisma/client/runtime";

import { db } from "../db";


type Internals = {
  _baseDmmf: DMMFClass
  _getDmmf: () => Promise<DMMFClass>
}

type RuntimeClient = PrismaClient & Internals

const client = () => db as RuntimeClient

const internalsUpdateGenericWarning = "\nPrismaClient internals are subject to change. Check dbSchema against @prisma/internals or @prisma/client/runtime version changes if no user solution can be found."

export const DB_SCHEMA_ERRORS = {
  NO_DMMF_SYNC: () => new Error("No DMMF found on PrismaClient internals, check if db: PrismaClient exists, or await db.getDmmf()" + internalsUpdateGenericWarning),
  NO_DMMF_ASYNC: () => new Error("Something went wrong in getInternalDmmf, check if db exists and db._getDmmf() exists" + internalsUpdateGenericWarning),
}

export const getInternalDmmfSync = () => {
  const dmmf = client()._baseDmmf
  if(!dmmf) {
    throw DB_SCHEMA_ERRORS.NO_DMMF_SYNC()
  }
  return dmmf
}

export const getInternalDmmf = async () => {
  const dmmf = await client()._getDmmf()
  if(!dmmf) {
    throw DB_SCHEMA_ERRORS.NO_DMMF_ASYNC()
  }
  return dmmf
}

export type DbSchema = {
  tableNames: string[],
  tableFields: {
    [tableName: string]: string[]
  }
}

const getSchemaFromDmmf = (dmmf: DMMFClass) => {
  const schema: DbSchema = {
    tableNames: [],
    tableFields: {},
  }
  schema.tableNames = Object.entries(dmmf.modelMap).map(([tableName, table]) => {
    schema.tableFields[tableName] = table.fields.map(field => field.name)
    return tableName
  })
  return schema
}

export const getDbSchemaSync = () => getSchemaFromDmmf(getInternalDmmfSync())
export const getDbSchema = async () => getSchemaFromDmmf(await getInternalDmmf())
