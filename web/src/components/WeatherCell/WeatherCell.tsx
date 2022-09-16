import type { FindWeatherQuery, FindWeatherQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindWeatherQuery() {
    weather: weather {
      id
      date
      precipitation
      avgTemp
      maxTemp
      minTemp
      windDirection
      windSpeed
      stationCode
      station {
        code
        city
        location
        state
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindWeatherQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  weather,
}: CellSuccessProps<FindWeatherQuery, FindWeatherQueryVariables>) => {
  return <div>{JSON.stringify(weather)}</div>
}
