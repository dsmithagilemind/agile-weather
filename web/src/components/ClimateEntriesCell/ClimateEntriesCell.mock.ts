// Define your own mock data here:

const response = {
  data: {
    climateEntriesByStation: [
      {
        id: 70,
        dataSet: 'noaa-mly-tavg-normal',
        period: '1981-2010',
        stationId: 'cl99bzc1b002cvwx4w8oyi4mg',
        topic: 'normal-tavg',
        dataPoints: [
          {
            value: '387',
            label: 'jan',
          },
          {
            value: '424',
            label: 'feb',
          },
          {
            value: '504',
            label: 'mar',
          },
          {
            value: '588',
            label: 'apr',
          },
          {
            value: '677',
            label: 'may',
          },
          {
            value: '752',
            label: 'jun',
          },
          {
            value: '783',
            label: 'jul',
          },
          {
            value: '776',
            label: 'aug',
          },
          {
            value: '711',
            label: 'sep',
          },
          {
            value: '601',
            label: 'oct',
          },
          {
            value: '501',
            label: 'nov',
          },
          {
            value: '412',
            label: 'dec',
          },
        ],
      },
      {
        id: 7571,
        dataSet: 'noaa-mly-tmin-normal',
        period: '1981-2010',
        stationId: 'cl99bzc1b002cvwx4w8oyi4mg',
        topic: 'normal-tmin',
        dataPoints: [
          {
            value: '275',
            label: 'jan',
          },
          {
            value: '305',
            label: 'feb',
          },
          {
            value: '375',
            label: 'mar',
          },
          {
            value: '454',
            label: 'apr',
          },
          {
            value: '549',
            label: 'may',
          },
          {
            value: '628',
            label: 'jun',
          },
          {
            value: '660',
            label: 'jul',
          },
          {
            value: '644',
            label: 'aug',
          },
          {
            value: '574',
            label: 'sep',
          },
          {
            value: '457',
            label: 'oct',
          },
          {
            value: '368',
            label: 'nov',
          },
          {
            value: '298',
            label: 'dec',
          },
        ],
      },
      {
        id: 15072,
        dataSet: 'noaa-mly-tmax-normal',
        period: '1981-2010',
        stationId: 'cl99bzc1b002cvwx4w8oyi4mg',
        topic: 'normal-tmax',
        dataPoints: [
          {
            value: '499',
            label: 'jan',
          },
          {
            value: '544',
            label: 'feb',
          },
          {
            value: '634',
            label: 'mar',
          },
          {
            value: '723',
            label: 'apr',
          },
          {
            value: '804',
            label: 'may',
          },
          {
            value: '876',
            label: 'jun',
          },
          {
            value: '906',
            label: 'jul',
          },
          {
            value: '908',
            label: 'aug',
          },
          {
            value: '849',
            label: 'sep',
          },
          {
            value: '745',
            label: 'oct',
          },
          {
            value: '633',
            label: 'nov',
          },
          {
            value: '526',
            label: 'dec',
          },
        ],
      },
    ],
  },
}

export const standard = (/* vars, { ctx, req } */) => ({
  climateEntriesByStation: response.data.climateEntriesByStation,
})
