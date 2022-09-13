export const schema = gql`
  type Station {
    code: String!
    city: String!
    location: String!
    state: String!
    Weather: [Weather]!
  }

  type Query {
    stations: [Station!]! @requireAuth
    station(id: String!): Station @requireAuth
  }

  input CreateStationInput {
    code: String!
    city: String!
    location: String!
    state: String!
  }

  input UpdateStationInput {
    code: String
    city: String
    location: String
    state: String
  }

  type Mutation {
    createStation(input: CreateStationInput!): Station! @requireAuth
    updateStation(id: String!, input: UpdateStationInput!): Station!
      @requireAuth
    deleteStation(id: String!): Station! @requireAuth
  }
`
