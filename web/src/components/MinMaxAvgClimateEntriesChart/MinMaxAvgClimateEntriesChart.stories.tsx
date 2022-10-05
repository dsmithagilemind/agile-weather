// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MinMaxAvgClimateEntriesChart> = (args) => {
//   return <MinMaxAvgClimateEntriesChart {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import MinMaxAvgClimateEntriesChart from './MinMaxAvgClimateEntriesChart'

export const generated = () => {
  return <MinMaxAvgClimateEntriesChart />
}

export default {
  title: 'Components/MinMaxAvgClimateEntriesChart',
  component: MinMaxAvgClimateEntriesChart,
} as ComponentMeta<typeof MinMaxAvgClimateEntriesChart>
