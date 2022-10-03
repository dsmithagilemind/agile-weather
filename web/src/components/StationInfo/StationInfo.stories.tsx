// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StationInfo> = (args) => {
//   return <StationInfo {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StationInfo from './StationInfo'

export const generated = () => {
  return <StationInfo />
}

export default {
  title: 'Components/StationInfo',
  component: StationInfo,
} as ComponentMeta<typeof StationInfo>
