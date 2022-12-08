// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof FilterStationsTable> = (args) => {
//   return <FilterStationsTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import FilterStationsTable from './FilterStationsTable'

export const generated = () => {
  return <FilterStationsTable />
}

export default {
  title: 'Components/FilterStationsTable',
  component: FilterStationsTable,
} as ComponentMeta<typeof FilterStationsTable>
