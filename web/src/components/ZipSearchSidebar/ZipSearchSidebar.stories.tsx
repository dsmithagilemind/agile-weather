// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ZipSearchSidebar> = (args) => {
//   return <ZipSearchSidebar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ZipSearchSidebar from './ZipSearchSidebar'

export const generated = () => {
  return <ZipSearchSidebar />
}

export default {
  title: 'Components/ZipSearchSidebar',
  component: ZipSearchSidebar,
} as ComponentMeta<typeof ZipSearchSidebar>
