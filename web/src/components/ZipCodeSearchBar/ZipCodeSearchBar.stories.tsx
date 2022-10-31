// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ZipCodeSearchBar> = (args) => {
//   return <ZipCodeSearchBar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ZipCodeSearchBar from './ZipCodeSearchBar'

export const generated = () => {
  return <ZipCodeSearchBar />
}

export default {
  title: 'Components/ZipCodeSearchBar',
  component: ZipCodeSearchBar,
} as ComponentMeta<typeof ZipCodeSearchBar>
