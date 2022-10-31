import { useState, useEffect } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
}

const monthLabels = [
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

const defaultData = {
  monthLabels,
  datasets: [
    {
      label: '',
      data: monthLabels.map((_) => 0),
      backgroundColor: '#232323',
      borderColor: '#aaaaaa',
    },
  ],
}

const MinMaxAvgClimateEntriesChart = ({ stationClimateEntries }) => {
  let minPoints, maxPoints, avgPoints
  stationClimateEntries.forEach((entry) => {
    switch (entry.topic) {
    case 'normal-tavg':
      avgPoints = entry.dataPoints
      break
    case 'normal-tmin':
      minPoints = entry.dataPoints
      break
    case 'normal-tmax':
      maxPoints = entry.dataPoints
      break
    default:
      throw new Error(
        `Unexpected data points in ClimateEntry with id ${entry.id}`
      )
    }
  })

  // should we memoize?
  const toDataArr = (dataPoints) =>
    dataPoints.map(({ value, _label }) => {
      return parseFloat(value) / 10
    })
  const [chartData, setChartData] = useState(defaultData)
  //const [options, setOptions] = useState(defaultOptions)

  useEffect(() => {
    setChartData({
      //@ts-ignore
      labels: monthLabels,
      datasets: [
        {
          label: 'Min',
          data: toDataArr(minPoints),
          backgroundColor: '#2323dd',
          borderColor: '#5555ff',
        },
        {
          label: 'Max',
          data: toDataArr(maxPoints),
          backgroundColor: '#dd2323',
          borderColor: '#ff5555',
        },
        {
          label: 'Avg',
          data: toDataArr(avgPoints),
          backgroundColor: '#232323',
          borderColor: '#aaaaaa',
        },
      ],
    })
  }, [minPoints, maxPoints, avgPoints])

  return <Line options={defaultOptions} data={chartData} />
}

export default MinMaxAvgClimateEntriesChart
