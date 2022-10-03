import { useState, useEffect, useRef } from 'react'

import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { db } from 'api/src/lib/db'
import Chart from 'chart.js'

import {
  FieldError,
  Form,
  Submit,
  SubmitHandler,
  TextField,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import GeoLocationCell from 'src/components/GeolocationCell/GeolocationCell'
import GeoLocationsCell from 'src/components/GeolocationsCell/GeolocationsCell'

// import ClimateEntryCell from 'src/components/ClimateEntryCell/ClimateEntryCell'
// import StationCell from 'src/components/StationCell/StationCell'

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/*





geolocation
13031, al

one station
USC00011620

entries
82
9060
16561

tmin
USC00011620         327S   362S   420S   486S   577S   653S   688S   678S   613S   500S   411S   349S

max
USC00011620         567S   611S   697S   767S   829S   888S   913S   909S   860S   771S   677S   586S

tavg
USC00011620         447S   486S   558S   627S   703S   770S   800S   793S   737S   635S   544S   468S

32.7,36.2,42.0,48.6,57.7,65.3,68.8,67.8,61.3,50.0,41.1,34.9
56.7,61.1,69.7,76.7,82.9,88.8,91.3,90.9,86.0,77.1,67.7,58.6
44.7,48.6,55.8,62.7,70.3,77.0,80.0,79.3,73.7,63.5,54.4,46.8

zip
USC00011620 35044 Childersburg
1,Alabama,AL,35044,Talladega,Coosa pines
*/

// const getDates = (forecast) => {
//   return forecast.list.map((entry) => {
//     const date = new Date(0)
//     date.setUTCSeconds(entry.dt)
//     return `${MONTHS[date.getMonth()]} ${date.getDate()}`
//   })
// }

// const getTemps = (forecast) => {
//   return [
//     {
//       label: 'High',
//       data:
//       borderColor: 'red',
//       backgroundColor: 'transparent',
//     },
//     {
//       label: 'Low',
//       data:
//       borderColor: 'blue',
//       backgroundColor: 'transparent',
//     },
//   ]
// }

const HomePage = () => {
  // useEffect(() => {
  //   fetch('/forecast.json')
  //     .then((response) => response.json())
  //     .then((json) => setForecast(json))
  // }, [])

  // useEffect(() => {
  //   if (forecast) {
  //     new Chart(chartRef.current.getContext('2d'), {
  //       type: 'line',
  //       data: {
  //         labels: getDates(forecast),
  //         datasets: getTemps(forecast),
  //       },
  //     })
  //   }
  // }, [forecast])

  const [zipCode, setZipCode] = useState(79830)

  const [loadedZip, loadZip] = useState(null)

  const handleZipCodeChange = (e) => setZipCode(e.target.value)

  const validateZipCode = (zipCode) => /^\d{5}$/.test(zipCode)

  const zipCodeError = !validateZipCode(zipCode)

  function onSubmit() {
    if (!zipCodeError) loadZip(zipCode + '')
  }

  return (
    <>
      <Container>
        <MetaTags title="Home" description="Home page" />
        {/* <canvas ref={chartRef} /> */}
        {/* <ClimateEntryCell code={'FMC00914395'} />
      <StationCell id={103} /> */}
        {/* <GeoLocationCell id={42277} /> */}

        {/* <Form onSubmit={onSubmit}>
        <label htmlFor="zipCode">Zipcode</label>
        <TextField
          name="zipCode"
          validation={{
            required: true,
            pattern: {
              value: /\d{6}/,
              message: 'Please enter a valid zipcode',
            },
          }}
          errorClassName="error"
        ></TextField>
        <Submit>Search</Submit>
      </Form> */}

        <FormControl isInvalid={zipCodeError}>
          <FormLabel>Zipcode</FormLabel>
          <Input type="number" value={zipCode} onChange={handleZipCodeChange} />
          {!zipCodeError ? (
            <FormHelperText>Please enter a 5 digit zipcode</FormHelperText>
          ) : (
            <FormErrorMessage>
              {zipCode} is not a valid 5 digit zipcode
            </FormErrorMessage>
          )}
          <Button onClick={onSubmit}>Search</Button>
        </FormControl>
      </Container>
      {/* <Container>
        {loadedZip ? (
          <GeoLocationsCell zipcode={loadedZip} />
        ) : (
          <Text>No data loaded</Text>
        )}
      </Container> */}
      {/* <GeoLocationsCell zip={'79830'} /> */}
      <GeoLocationCell id={42277} />
    </>
  )
}

export default HomePage
