export const schema = gql`
  type ClimateDataPoint {
    id: String!
    label: String!
    value: String!
    flag: String
    climateEntry: ClimateEntry!
    climateEntryId: Int!
  }

  type Query {
    climateDataPoints: [ClimateDataPoint!]! @skipAuth
    climateDataPoint(id: String!): ClimateDataPoint @skipAuth
  }

  input CreateClimateDataPointInput {
    label: String!
    value: String!
    flag: String
    climateEntryId: Int!
  }

  input UpdateClimateDataPointInput {
    label: String
    value: String
    flag: String
    climateEntryId: Int
  }

  type Mutation {
    createClimateDataPoint(
      input: CreateClimateDataPointInput!
    ): ClimateDataPoint! @requireAuth
    updateClimateDataPoint(
      id: String!
      input: UpdateClimateDataPointInput!
    ): ClimateDataPoint! @requireAuth
    deleteClimateDataPoint(id: String!): ClimateDataPoint! @requireAuth
  }
`
