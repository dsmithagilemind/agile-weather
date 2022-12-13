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

  input Filter {
    equals: String
    not: String
    in: [String]
    notIn: [String]
    contains: String
    search: String
    startsWith: String
    endsWith: String
    lt: String
    lte: String
    gt: String
    gte: String
  }

  input Expression {
    field: String!
    filter: Filter
    AND: [Expression]
    OR: [Expression]
    NOT: Expression
  }

  input Sort {
    field: String!
    ascending: Boolean=true
  }

  input FilterInput {
    where: Expression!
    orderBy: [Sort]
  }

`;
