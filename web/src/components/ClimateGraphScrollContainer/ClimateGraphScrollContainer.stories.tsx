// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ClimateGraphScrollContainer> = (args) => {
//   return <ClimateGraphScrollContainer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ClimateGraphScrollContainer from './ClimateGraphScrollContainer'

export const generated = () => {
  return <ClimateGraphScrollContainer />
}

export default {
  title: 'Components/ClimateGraphScrollContainer',
  component: ClimateGraphScrollContainer,
} as ComponentMeta<typeof ClimateGraphScrollContainer>
