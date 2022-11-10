// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LoginInfoBar> = (args) => {
//   return <LoginInfoBar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LoginInfoBar from './LoginInfoBar'

export const generated = () => {
  return <LoginInfoBar />
}

export default {
  title: 'Components/LoginInfoBar',
  component: LoginInfoBar,
} as ComponentMeta<typeof LoginInfoBar>
