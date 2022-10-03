// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Geolocationinfo> = (args) => {
//   return <Geolocationinfo {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Geolocationinfo from './Geolocationinfo'

export const generated = () => {
  return <Geolocationinfo />
}

export default {
  title: 'Components/Geolocationinfo',
  component: Geolocationinfo,
} as ComponentMeta<typeof Geolocationinfo>
