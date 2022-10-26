// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Title> = (args) => {
//   return <Title {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Title from './Title'

export const generated = () => {
  return <Title />
}

export default {
  title: 'Components/Title',
  component: Title,
} as ComponentMeta<typeof Title>
