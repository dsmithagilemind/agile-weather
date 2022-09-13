import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WeatherCreateArgs>({
  weather: {
    one: {
      data: {
        date: '2022-09-13T21:18:09Z',
        precipitation: 3100351.6667656526,
        avgTemp: 6068943,
        maxTemp: 3825340,
        minTemp: 3385873,
        windDirection: 4657764,
        windSpeed: 7600512.934130273,
        station: {
          create: {
            code: 'String',
            city: 'String',
            location: 'String',
            state: 'String',
          },
        },
      },
    },
    two: {
      data: {
        date: '2022-09-13T21:18:09Z',
        precipitation: 1044096.1697222862,
        avgTemp: 9878637,
        maxTemp: 8917814,
        minTemp: 759775,
        windDirection: 1071800,
        windSpeed: 5546576.976934723,
        station: {
          create: {
            code: 'String',
            city: 'String',
            location: 'String',
            state: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
