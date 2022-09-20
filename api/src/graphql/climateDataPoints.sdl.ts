export const schema = gql`
  type ClimateDataPoint {
    cuid: String!
    station: Station!
    stationCode: String!
    value: String!
    flag: String
    topic: String!
    period: String!
    climateEntry: ClimateEntry!
    climateEntryId: Int!
  }

  type Query {
    climateDataPoints: [ClimateDataPoint!]! @requireAuth
    climateDataPoint(id: String!): ClimateDataPoint @requireAuth
  }

  input CreateClimateDataPointInput {
    cuid: String!
    stationCode: String!
    value: String!
    flag: String
    topic: String!
    period: String!
    climateEntryId: Int!
  }

  input UpdateClimateDataPointInput {
    cuid: String
    stationCode: String
    value: String
    flag: String
    topic: String
    period: String
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
