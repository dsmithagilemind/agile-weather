export const schema = gql`
  input SortField {
    field: String!
    ascending: Boolean=true
  }

  union Number = Float | Int

  type NumberFilter {
    field: String!
    equals: Number
    lessThan: Number
    lessThanEquals: Number
    greaterThan: Number
  }

  type StringFilter {
    field: String!
    equals: String
    contains: String
    startsWith: String
    endsWith: String
    fullTextSearch: String
  }

  # type DateFilter {
  #   equals: Date
  #   before: Date
  #   after: Date
  # }

  union Filter = NumberFilter | StringFilter
  union Expression = Filter | Operator

  type Operator {
    and: [Expression]
    or: [Expression]
    not: Expression
  }
`;
