// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StationDataTable> = (args) => {
//   return <StationDataTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StationDataTable from './StationDataTable'

export const generated = () => {
  return <StationDataTable stations={stations} />
}

export default {
  title: 'Components/StationDataTable',
  component: StationDataTable,
} as ComponentMeta<typeof StationDataTable>

const stations = [
  {
    stationName: 'LOGAN MARTIN DAM',
    longitude: -86.3386,
    latitude: 33.4258,
    hcn: '',
    gsn: '',
    code: 'USC00014866',
    elevation: 137.2,
    id: 'cl99bzdiy005svwx4l08c823a',
    wmoid: '',
  },
  {
    stationName: 'ALPINE',
    longitude: -109.1469,
    latitude: 33.8492,
    hcn: '',
    gsn: '',
    code: 'USC00020159',
    elevation: 2453.6,
    id: 'cl99bzeni0090vwx4gtxbj85d',
    wmoid: '',
  },
  {
    stationName: 'ALPINE',
    longitude: -116.7775,
    latitude: 32.8358,
    hcn: '',
    gsn: '',
    code: 'USC00040136',
    elevation: 516.6,
    id: 'cl99bzlkc00rovwx4kmx8hz2p',
    wmoid: '',
  },
  {
    stationName: 'ALPINE',
    longitude: -103.66,
    latitude: 30.3764,
    hcn: 'HCN',
    gsn: '',
    code: 'USC00410174',
    elevation: 1356.4,
    id: 'cl99c3ia90a6uvwx4xsv5mlul',
    wmoid: '',
  },
  {
    stationName: 'LAJITAS',
    longitude: -103.7575,
    latitude: 29.2694,
    hcn: '',
    gsn: '',
    code: 'USC00414950',
    elevation: 732.4,
    id: 'cl99c3r260apevwx4l0clhjyw',
    wmoid: '',
  },
  {
    stationName: 'STUDY BUTTE',
    longitude: -103.5531,
    latitude: 29.3286,
    hcn: '',
    gsn: '',
    code: 'USC00418714',
    elevation: 781.2,
    id: 'cl99c3x280b32vwx4mwrf5rhd',
    wmoid: '',
  },
  {
    stationName: 'TERLINGUA',
    longitude: -103.595,
    latitude: 29.3486,
    hcn: '',
    gsn: '',
    code: 'USC00418924',
    elevation: 802.5,
    id: 'cl99c3xb80b3ovwx4zrjgc4ie',
    wmoid: '',
  },
  {
    stationName: 'TERLINGUA RANCH 2',
    longitude: -103.4061,
    latitude: 29.4744,
    hcn: '',
    gsn: '',
    code: 'USC00418926',
    elevation: 1122.3,
    id: 'cl99c3xbv0b3qvwx4gfuz9lyv',
    wmoid: '',
  },
  {
    stationName: 'ALPINE',
    longitude: -111.7708,
    latitude: 40.4644,
    hcn: '',
    gsn: '',
    code: 'USC00420061',
    elevation: 1545.3,
    id: 'cl99c3yyw0b7evwx46dd478li',
    wmoid: '',
  },
  {
    stationName: 'TIMPANOGOS CAVE',
    longitude: -111.7075,
    latitude: 40.4447,
    hcn: '',
    gsn: '',
    code: 'USC00428733',
    elevation: 1749.6,
    id: 'cl99c42rz0bg2vwx4ilvg1ghk',
    wmoid: '',
  },
]
