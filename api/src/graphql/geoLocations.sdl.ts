export const schema = gql`
  type GeoLocation {
    id: Int!
    city: String!
    zip: String
    state: String
    stateAbbrev: String
    fips: String
    county: String
    stations: [Station]!
  }

  type Query {
    geoLocations: [GeoLocation!]! @requireAuth
    geoLocation(id: Int!): GeoLocation @requireAuth
  }

  input CreateGeoLocationInput {
    city: String!
    zip: String
    state: String
    stateAbbrev: String
    fips: String
    county: String
  }

  input UpdateGeoLocationInput {
    city: String
    zip: String
    state: String
    stateAbbrev: String
    fips: String
    county: String
  }

  type Mutation {
    createGeoLocation(input: CreateGeoLocationInput!): GeoLocation! @requireAuth
    updateGeoLocation(id: Int!, input: UpdateGeoLocationInput!): GeoLocation!
      @requireAuth
    deleteGeoLocation(id: Int!): GeoLocation! @requireAuth
  }
`
