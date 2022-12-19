export const schema = gql`

  input StringFilterParams {
    equals: String
    not: String
    in: [String]
    notIn: [String]
    contains: String
    search: String
    startsWith: String
    endsWith: String
  }

  input NumberFilterParams {
    equals: Float
    not: Float
    in: [Float]
    notIn: [Float]
    lt: Float
    lte: Float
    gt: Float
    gte: Float
  }

  input RelationalFilterParams {
    equals: FilterQuery
    some:   FilterQuery
    every:  FilterQuery
    none:   FilterQuery
    is:     FilterQuery
    isNot:  FilterQuery
    isEmpty: Boolean
  }

  input NestedFilterQuery {
    filter: FilterQuery
    AND:  [NestedFilterQuery]
    OR:   [NestedFilterQuery]
    NOT:  [NestedFilterQuery]
  }

  input FilterQuery {
    field: String!
    stringFilter: StringFilterParams
    numberFilter: NumberFilterParams
    #dateFilter: DateFilterParams
    #relationalFilter: RelationalFilterParams
  }

  input Sort {
    field: String!
    ascending: Boolean=true
  }

  input NestedFilterQueryInput {
    where: NestedFilterQuery!
    orderBy: [Sort]
  }

  input FilterQueryInput {
    where: FilterQuery,
    orderBy: [Sort]
  }
`;
