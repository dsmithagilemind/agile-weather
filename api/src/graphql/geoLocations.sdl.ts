export const schema = gql`
  type GeoLocation {
    id: Int!
    city: String!
    zip: String
    fips: String
    county: String
    latitude: Float
    longitude: Float
    elivation: Float
    state: String
    stateAbbrev: String!
    weatherStations: [Station]!
  }

  type Query {
    geoLocations: [GeoLocation!]! @requireAuth
    geoLocation(id: Int!): GeoLocation @requireAuth
  }

  input CreateGeoLocationInput {
    city: String!
    zip: String
    fips: String
    county: String
    latitude: Float
    longitude: Float
    elivation: Float
    state: String
    stateAbbrev: String!
  }

  input UpdateGeoLocationInput {
    city: String
    zip: String
    fips: String
    county: String
    latitude: Float
    longitude: Float
    elivation: Float
    state: String
    stateAbbrev: String
  }

  type Mutation {
    createGeoLocation(input: CreateGeoLocationInput!): GeoLocation! @requireAuth
    updateGeoLocation(id: Int!, input: UpdateGeoLocationInput!): GeoLocation!
      @requireAuth
    deleteGeoLocation(id: Int!): GeoLocation! @requireAuth
  }
`
