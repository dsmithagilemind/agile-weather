export const schema = gql`
  type Station {
    id: String!
    code: String!
    geoLocations: [GeoLocation]!
    latitude: Float
    longitude: Float
    elevation: Float
    gsn: String
    hcn: String
    wmoid: String
    stationName: String
    climateEntries: [ClimateEntry]!
  }

  input SortField {
    field: String
    order: String
  }

  input FloatFilter {
    field: String!
    equals: Float
    lessThan: Float
    greaterThan: Float
  }

  input StringFilter {
    fields: [String]!
    contains: String
  }

  input Filter {
    floatFilters: [FloatFilter]
    stringFilters: [StringFilter]
  }

# TODO: pagination UI

  type Query {
    stations: [Station!]! @skipAuth
    # filterStations(input: StationsFilterInput!): [Station!]! @skipAuth
    station(id: String!): Station @skipAuth
    filterStations(offset: Int!, limit: Int!, filters: [Filter], sortFields: [SortField]): [Station!]! @skipAuth @fieldOn(table: "Station")
    filterStationsCount(filters: [Filter]!): Int @skipAuth @fieldOn(table: "Station")
  }

  input CreateStationInput {
    code: String!
    latitude: Float
    longitude: Float
    elevation: Float
    gsn: String
    hcn: String
    wmoid: String
    stationName: String
  }

  input UpdateStationInput {
    code: String
    latitude: Float
    longitude: Float
    elevation: Float
    gsn: String
    hcn: String
    wmoid: String
    stationName: String
  }

  type Mutation {
    createStation(input: CreateStationInput!): Station! @requireAuth
    updateStation(id: String!, input: UpdateStationInput!): Station!
      @requireAuth
    deleteStation(id: String!): Station! @requireAuth
  }
`
