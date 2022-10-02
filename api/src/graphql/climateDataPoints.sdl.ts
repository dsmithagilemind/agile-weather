export const schema = gql`
  type ClimateDataPoint {
    cuid: String!
    label: String!
    value: String!
    flag: String
    climateEntry: ClimateEntry!
    climateEntryId: Int!
  }

  type Query {
    climateDataPoints: [ClimateDataPoint!]! @requireAuth
    climateDataPoint(id: String!): ClimateDataPoint @requireAuth
  }

  input CreateClimateDataPointInput {
    cuid: String!
    label: String!
    value: String!
    flag: String
    climateEntryId: Int!
  }

  input UpdateClimateDataPointInput {
    cuid: String
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
