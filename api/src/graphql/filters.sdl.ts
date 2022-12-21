export const schema = gql`

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

  input NumberFilter{
    equals: Float
    not: Float
    in: [Float]
    notIn: [Float]
    lt: Float
    lte: Float
    gt: Float
    gte: Float
  }

  input RelationalFilter {
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
    stringFilter: StringFilter
    numberFilter: NumberFilter
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
    take: Int=25
    skip: Int=0
  }

  input FilterQueryInput {
    where: FilterQuery,
    orderBy: [Sort]
    take: Int=25
    skip: Int=0
  }
`;
