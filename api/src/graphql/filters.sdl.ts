export const schema = gql`
  # type NumberFilter {
  #   field: String!
  #   equals: Float
  #   lessThan: Float
  #   lessThanEquals: Float
  #   greaterThan: Float
  # }

  # type StringFilter {
  #   field: String!
  #   equals: String
  #   contains: String
  #   startsWith: String
  #   endsWith: String
  #   fullTextSearch: String
  # }

  # type DateFilter {
  #   equals: Date
  #   before: Date
  #   after: Date
  # }

  # union Expression = NumberFilter | StringFilter | Operator

  # type Operator {
  #   and: [Expression]
  #   or: [Expression]
  #   not: Expression
  # }

  # input StringFilter {
  #   fields: [String!]!
  #   equals: String
  #   not: String
  #   in: [String]
  #   notIn: [String]

  #   contains: String
  #   search: String
  #   startsWith: String
  #   endsWith: String
  # }

  # input NumberFilter {
  #   fields: [String!]!
  #   equals: Float
  #   not: Float
  #   in: [Float]
  #   notIn: [Float]

  #   lt: Float
  #   lte: Float
  #   gt: Float
  #   gte: Float
  # }

  # input DateFilter {
  #   equals: Date
  #   before: Date
  #   after: Date
  # }

  # input Expression {
  #   AND: [Expression]
  #   OR: [Expression]
  #   NOT: Expression
  #   stringFilter: StringFilter
  #   numberFilter: NumberFilter
  # }

  input StringFilter {
    equals: String
    not: String
    in: [String]
    notIn: [String]
    contains: String
    search: String
    startsWith: String
    endsWith: String
  }

  input NumberFilter {
    equals: Float
    not: Float
    in: [Float]
    notIn: [Float]
    lt: Float
    lte: Float
    gt: Float
    gte: Float
  }

  input FilterExpression {
    # field being required in the same level as AND and OR is a little weird
    #  but forcing it to be required at all levels of the expr makes validation easier
    field: String!
    stringFilter: StringFilter
    numberFilter: NumberFilter
    # dateFilter: DateFilter
    AND:  [FilterExpression]
    OR:   [FilterExpression]
    NOT:  [FilterExpression]
  }

  input Sort {
    field: String!
    ascending: Boolean=true
  }

  input FilterInput {
    where: FilterExpression!
    orderBy: [Sort]
  }

`;
