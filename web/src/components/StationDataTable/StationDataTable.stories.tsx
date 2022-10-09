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
  return <StationDataTable />
}

export default {
  title: 'Components/StationDataTable',
  component: StationDataTable,
} as ComponentMeta<typeof StationDataTable>
