import { PrismaClient } from "@prisma/client";

import { mockRedwoodDirective, getDirectiveName } from "@redwoodjs/testing/api";

import { db } from "src/lib/db";

import fieldOn, { RequestArgs } from "./fieldOn";
import { ON_FIELD_DIRECTIVE_ERRORS } from './fieldOn';


describe("fieldOn directive", () => {

  const testTable = "Station"
  const testField = "code"

  type Context = {
    variables: RequestArgs
  }

  const createContextFromField = (field: string = testField): Context => ({
    variables: {
      filters: [{
        stringFilters: [{
          fields: [field],
          contains: ""
        }]
      }]
    }
  })

  const createArgs = (field: string = testField, table: string = testTable) => ({
    directiveArgs: { table },
    context: createContextFromField(field)
  })

  it("declares the directive sdl as schema, with the correct name", () => {
    expect(fieldOn.schema).toBeTruthy();
    expect(getDirectiveName(fieldOn.schema)).toBe("fieldOn");
  });

  it("tests a successful execution of fieldOn directive",() => {
    const mockExecution = mockRedwoodDirective(fieldOn, {
      directiveArgs: {
        table: testTable
      },
      context: createContextFromField()
    });

    expect(mockExecution).not.toThrowError()
  })

  it("tests a successful execution of fieldOn directive if filter and sort fields are skipped", () => {
    const mockExecution = mockRedwoodDirective(fieldOn, createArgs(undefined, testTable))

    expect(mockExecution).not.toThrowError()
  })

  describe("fieldOn directive exceptions", () => {

    it("Tests missing directiveArgs should throw a SyntaxError", () => {

      const mockExecution = mockRedwoodDirective(fieldOn, {
        directiveArgs: {},
        context: createContextFromField()
      })
      expect(mockExecution).toThrowError(ON_FIELD_DIRECTIVE_ERRORS.MISSING_TABLE_NAME())

    })

    it("Tests throwing a fatal error involving a hidden prisma property", () => {

      type ExpectDmmf = PrismaClient & { _baseDmmf: unknown }

      const currentDb = db as ExpectDmmf;

      const currentDmmf = currentDb._baseDmmf as ExpectDmmf;
      currentDb._baseDmmf = null;

      const mockExecution = mockRedwoodDirective(fieldOn, createArgs())
      expect(mockExecution).toThrowError(ON_FIELD_DIRECTIVE_ERRORS.DB__BASE_DMMF())

      currentDb._baseDmmf = currentDmmf;
    })

    it("Tests throwing an error on an unknown table name", ()=> {

      const mockExecution = mockRedwoodDirective(fieldOn, createArgs(testField, "UnknownTable"))
      expect(mockExecution).toThrowError(ON_FIELD_DIRECTIVE_ERRORS.TABLE_NOT_FOUND("UnknownTable"))

    })

    it("Tests table case mismatch helper error", () => {
      const mockExecution = mockRedwoodDirective(fieldOn, createArgs(testField, testTable.toLowerCase()))
      expect(mockExecution).toThrowError(ON_FIELD_DIRECTIVE_ERRORS.TABLE_WRONG_CASE(testTable.toLowerCase()))
    })


    // it("Tests an error on a missing request filter arg", () => {
    //   const mockExecution = mockRedwoodDirective(fieldOn, {
    //     directiveArgs: {
    //       table: testTable
    //     },
    //     context: {
    //       variables: {}
    //     }});

    //   expect(mockExecution).toThrowError(ON_FIELD_DIRECTIVE_ERRORS.MISSING_REQUEST_FILTERS())
    // })

    it("Tests an error on an invalid field name", () => {
      const mockExecution = mockRedwoodDirective(fieldOn, createArgs("nocolumn"))
      expect(mockExecution).toThrowError(ON_FIELD_DIRECTIVE_ERRORS.INVALID_FILTER_COLUMN("nocolumn"))
    })
  })

});
