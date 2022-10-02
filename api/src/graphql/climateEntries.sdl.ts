export const schema = gql`
  type ClimateEntry {
    id: Int!
    station: Station!
    stationCode: String!
    topic: String!
    period: String!
    dataSet: String!
    dataPoints: [ClimateDataPoint]!
  }

  type Query {
    climateEntries: [ClimateEntry!]! @requireAuth
    climateEntry(id: Int!): ClimateEntry @requireAuth
  }

  input CreateClimateEntryInput {
    stationCode: String!
    topic: String!
    period: String!
    dataSet: String!
  }

  input UpdateClimateEntryInput {
    stationCode: String
    topic: String
    period: String
    dataSet: String
  }

  type Mutation {
    createClimateEntry(input: CreateClimateEntryInput!): ClimateEntry!
      @requireAuth
    updateClimateEntry(
      id: Int!
      input: UpdateClimateEntryInput!
    ): ClimateEntry! @requireAuth
    deleteClimateEntry(id: Int!): ClimateEntry! @requireAuth
  }
`