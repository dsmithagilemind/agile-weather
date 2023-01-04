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
  UNKNOWN_MODEL_NAME: (modelName) => new Error(`Could not find model '${modelName}'!`)
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
type FieldName = string

type FieldType = 'string'|'number'|'boolean'|'object'|'array'
type FieldKind = 'object'|'scalar'
type FieldDbType = 'String'|'Boolean'|'Int'|'BigInt'|'Float'|'Decimal'|'DateTime'|'Json'|'Bytes'|'Unsupported'

type Field = {
  Name: FieldName
  Kind: FieldKind
  Type: FieldType
  DbType: FieldDbType
  RelationTo?: FieldRelation
  //NestedFilterType?: 'StringFilter'|'NumberFilter'|'DateFilter'|'RelationFilter'
}

type FieldRelation = ModelName

type Model = {
  Name: ModelName

  Fields: Field[]
  FieldNames: FieldName[]

  FieldRelationMap: {
    [fieldName: FieldName]: FieldRelation
  }
  FieldTypeMap: {
    [fieldName: FieldName]: FieldType
  }
  FieldKindMap: {
    [fieldName: FieldName]: FieldKind
  }
}


export {
  ModelName, FieldName,
  Model, Field,
  FieldRelation, FieldType, FieldKind, FieldDbType
}

export type DbSchema = {
  Models: Model[]
  ModelNames: ModelName[]
}

function buildModel(dmmfModel: DMMF.Model): Model {

  const model: Model = {
    Name: dmmfModel.name,
    Fields: [],
    FieldNames: [],

    FieldRelationMap: {},
    FieldTypeMap: {},
    FieldKindMap: {}
  }

  dmmfModel.fields.forEach((dmmfField: DMMF.Field) => {

    /* dmmf field examples:
    {
      name: 'longitude',
      kind: 'scalar',
      isList: false,
      isRequired: false,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      type: 'Float',
      isGenerated: false,
      isUpdatedAt: false
    },
    {
      name: 'climateEntries',
      kind: 'object',
      isList: true,
      isRequired: true,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      type: 'ClimateEntry',
      relationName: 'ClimateEntryToStation',
      relationFromFields: [],
      relationToFields: [],
      isGenerated: false,
      isUpdatedAt: false
    }
    */

    const {
      name,
      type,
      kind,
      relationName
      //isList,
    } = dmmfField

    const Field : Field = {
      Name: name,
      Kind: kind as FieldKind,
      DbType: type as FieldDbType,
      RelationTo: undefined,
      //NestedFilterType: undefined
      Type: null
    }

    //if(isList) { }
    if(relationName) {
      Field.Type = 'object'
      Field.RelationTo = dmmfField.Type; // model name is on type prop
    }
    else {
      switch(Field.DbType) {
      case 'String':
        Field.Type = 'string'
        break
      case 'Boolean':
        Field.Type = 'boolean'
        break

      case 'Int':
        Field.Type = 'number'
        break
      case 'BigInt':
        Field.Type = 'number'
        break
      case 'Float':
        Field.Type = 'number'
        break
      case 'Decimal':
        Field.Type = 'number'
        break

      case 'DateTime':
        Field.Type = 'object'
        break
      case 'Json':
        Field.Type = 'object'
        break
      }
    }

    // push the following fields to model:
    // type Model = {
    //   Fields: Field[]
    //   FieldNames: FieldName[]

    //   FieldRelationMap: {
    //     [fieldName: FieldName]: FieldRelation
    //   }
    //   FieldTypeMap: {
    //     [fieldName: FieldName]: FieldType
    //   }
    //   FieldKindMap: {
    //     [fieldName: FieldName]: FieldKind
    //   }
    // }

    model.Fields.push(Field)
    model.FieldNames.push(Field.Name)

    if(Field.RelationTo) {
      model.FieldRelationMap[Field.Name] = Field.RelationTo
    }

    model.FieldTypeMap[Field.Name] = Field.Type
    model.FieldKindMap[Field.Name] = Field.Kind
  })

  return model;
}


function buildDbSchema(dmmf: DMMFClass): DbSchema {

  const schema: DbSchema = {
    Models: [],
    ModelNames: []
  }

  schema.ModelNames = Object.entries(dmmf.modelMap).map(
    ([modelName, model]: [string, DMMF.Model]) => {
      schema.Models[modelName] = buildModel(model)
      return modelName
    })

  return schema;
}

export function UnionFields(schema: DbSchema, includeModels: ModelName[]): FieldName[] {
  const fields = []

  includeModels.forEach(modelName => {
    const model: Model = schema.Models[modelName];

    if(!model) throw DB_SCHEMA_ERRORS.UNKNOWN_MODEL_NAME(modelName)

    model.Fields.forEach((field : Field) => {

      // only skip fields that are not in the included models, i.e. excluded relation fields
      if(field.RelationTo && !includeModels.includes(field.RelationTo)) return
      else fields.push(field.Name)
    })

  })

  return fields
}

export const getDbSchemaSync = () => buildDbSchema(getInternalDmmfSync())
export const getDbSchema = async () => buildDbSchema(await getInternalDmmf())
