export const schema = gql`
  type Station {
    code: String!
    geoLocation: GeoLocation!
    geoLocationId: Int!
    gcn: String
    hcn: String
    wmoid: String
    climateEntries: [ClimateEntry]!
    climateDataPoints: [ClimateDataPoint]!
  }

  type Query {
    stations: [Station!]! @requireAuth
    station(id: String!): Station @requireAuth
  }

  input CreateStationInput {
    code: String!
    geoLocationId: Int!
    gcn: String
    hcn: String
    wmoid: String
  }

  input UpdateStationInput {
    code: String
    geoLocationId: Int
    gcn: String
    hcn: String
    wmoid: String
  }

  type Mutation {
    createStation(input: CreateStationInput!): Station! @requireAuth
    updateStation(id: String!, input: UpdateStationInput!): Station!
      @requireAuth
    deleteStation(id: String!): Station! @requireAuth
  }
`
