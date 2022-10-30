// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LoadSpinner> = (args) => {
//   return <LoadSpinner {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LoadSpinner from './LoadSpinner'

export const generated = () => {
  return <LoadSpinner />
}

export default {
  title: 'Components/LoadSpinner',
  component: LoadSpinner,
} as ComponentMeta<typeof LoadSpinner>
