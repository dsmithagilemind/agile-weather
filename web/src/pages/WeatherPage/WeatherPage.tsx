import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import WeatherCell from 'src/components/WeatherCell/WeatherCell'

interface WeatherPageProps {
  id: number
}

const WeatherPage = (props: WeatherPageProps) => {
  return (
    <>
      <MetaTags title="Weather" description="Weather page" />

      <WeatherCell id={props.id} />
    </>
  )
}

export default WeatherPage
