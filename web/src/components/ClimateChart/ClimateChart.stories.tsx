// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ClimateChart> = (args) => {
//   return <ClimateChart {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ClimateChart from './ClimateChart'

export const generated = () => {
  return <ClimateChart />
}

export default {
  title: 'Components/ClimateChart',
  component: ClimateChart,
} as ComponentMeta<typeof ClimateChart>
