export const schema = gql`
  type ClimateEntry {
    id: Int!
    station: Station!
    stationId: String!
    topic: String!
    period: String!
    dataSet: String!
    dataPoints: [ClimateDataPoint]!
  }

  type Query {
    climateEntries: [ClimateEntry!]! @requireAuth
    climateEntriesByStation(stationId: String!): [ClimateEntry!]! @requireAuth
    climateEntry(id: Int!): ClimateEntry @requireAuth
  }

  input CreateClimateEntryInput {
    stationId: String!
    topic: String!
    period: String!
    dataSet: String!
  }

  input UpdateClimateEntryInput {
    stationId: String
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
