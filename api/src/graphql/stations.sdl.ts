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

# TODO: pagination UI

  input StationFilter {
    id: StringFilter
    code: StringFilter
    latitude: NumberFilter
    longitude: NumberFilter
    elevation: NumberFilter
    gsn: StringFilter
    hcn: StringFilter
    wmoid: StringFilter
    stationName: StringFilter
  }


  type Query {
    stations: [Station!]! @skipAuth
    # filterStations(input: StationsFilterInput!): [Station!]! @skipAuth
    station(id: String!): Station @skipAuth

    filterStationsSimple(stationFilter: StationFilter!): [Station!]! @skipAuth
    filterStationsNested(nestedFilterQuery: NestedFilterQueryInput!): [Station!]! @skipAuth @validateFilter(models: ["Station"])
    filterStationsPrisma(prismaQuery: JSONObject!): [Station!]! @skipAuth @allowModels(models: ["Station", "GeoLocation"])
    filterStationsRaw(queryInputs: StationFilter!): [Station!]! @skipAuth

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
