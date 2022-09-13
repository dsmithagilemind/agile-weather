export const schema = gql`
  type Weather {
    id: Int!
    date: DateTime!
    precipitation: Float!
    avgTemp: Int!
    maxTemp: Int!
    minTemp: Int!
    windDirection: Int!
    windSpeed: Float!
    station: Station!
    stationCode: String!
  }

  type Query {
    weathers: [Weather!]! @requireAuth
    weather(id: Int!): Weather @requireAuth
  }

  input CreateWeatherInput {
    date: DateTime!
    precipitation: Float!
    avgTemp: Int!
    maxTemp: Int!
    minTemp: Int!
    windDirection: Int!
    windSpeed: Float!
    stationCode: String!
  }

  input UpdateWeatherInput {
    date: DateTime
    precipitation: Float
    avgTemp: Int
    maxTemp: Int
    minTemp: Int
    windDirection: Int
    windSpeed: Float
    stationCode: String
  }

  type Mutation {
    createWeather(input: CreateWeatherInput!): Weather! @requireAuth
    updateWeather(id: Int!, input: UpdateWeatherInput!): Weather! @requireAuth
    deleteWeather(id: Int!): Weather! @requireAuth
  }
`
