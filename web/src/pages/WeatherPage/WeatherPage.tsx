import {
  FieldError,
  Form,
  TextField,
  Submit,
  SubmitHandler,
  Label,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import WeatherCell from 'src/components/WeatherCell/WeatherCell'

interface WeatherPageProps {
  id: number
}

interface FormValues {
  weatherId: number
}

const WeatherPage = (props: WeatherPageProps) => {
  let weatherId = props.id

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    weatherId = +data.weatherId
    console.log(data)
  }

  return (
    <>
      <MetaTags title="Weather" description="Weather page" />

      <Form onSubmit={onSubmit}>
        <Label htmlFor="weatherId" defaultValue={weatherId}>
          weatherId
        </Label>
        <TextField name="weatherId" errorClassName="warn" />
        <FieldError name="weatherId" className="warn" />

        <Submit>Save</Submit>
      </Form>

      <WeatherCell id={weatherId} />
    </>
  )
}

export default WeatherPage
