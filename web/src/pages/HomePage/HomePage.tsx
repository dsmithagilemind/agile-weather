import { useState, useEffect, useRef } from 'react'

import Chart from 'chart.js'

import { MetaTags } from '@redwoodjs/web'

import GeoLocationCell from 'src/components/GeoLocationCell/GeoLocationCell'

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
  const chartRef = useRef()

  const [forecast, setForecast] = useState(null)

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

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {/* <canvas ref={chartRef} /> */}
      <GeoLocationCell id={13017} />
    </>
  )
}

export default HomePage
