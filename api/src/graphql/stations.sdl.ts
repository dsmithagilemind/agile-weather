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

    # input params into a raw sql query
    # Limits: raw query structure
    filterStationsRaw(queryInputs: StationFilter!): [Station!]! @skipAuth

    # specify columns and values
    # Limits: no depth
    filterStationsSimple(stationFilter: StationFilter!): [Station!]! @skipAuth

    # using in house query builder
    # Limits: in house query implementation
    filterStationsNested(nestedFilterQueryInput: NestedFilterQueryInput!): [Station!]!
      @skipAuth
      @validateNestedFilter(allowedModels: ["Station"])

    # using a prisma object
    # Limits: prisma types and validation
    filterStationsPrisma(prismaQueryInput: JSONObject!): [Station!]!
      @skipAuth
      @validatePrismaFilter(primaryModel: "Station", allowedModels: ["Station", "GeoLocation"])
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
