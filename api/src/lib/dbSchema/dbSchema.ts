import { PrismaClient } from "@prisma/client";
import type { DMMF, DMMFClass } from "@prisma/client/runtime";

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

type ModelName = string
type FieldRelation = {
  RelatedModel: Model,
  RelationFields: string[]
}

type Model = {
  Name: ModelName,
  FieldNames: string,
  FieldsWithRelations: {
    [fieldName: string]: FieldRelation
  }
}

export type DbSchema = {
  Models: Model[]
  ModelNames: string[]
}

function buildDbSchema(dmmf: DMMFClass): DbSchema {

  const schema: DbSchema = {
    Models: [],
    ModelNames: []
  }

  schema.ModelNames = Object.entries(dmmf.modelMap).map(
    ([modelName, model]: [string, DMMF.Model]) => {
      schema.Models[modelName] = model.fields.map(field => field.name)
      return modelName
    })

  return schema;
}

export function unionFields(schema: DbSchema, includeModels: string[]): string[] {
  let fields = []
  includeModels.forEach(modelName => {

    if(schema.Models[modelName]) fields = fields.concat(schema.Models[modelName])

  })
  return fields
}

export const getDbSchemaSync = () => buildDbSchema(getInternalDmmfSync())
export const getDbSchema = async () => buildDbSchema(await getInternalDmmf())
