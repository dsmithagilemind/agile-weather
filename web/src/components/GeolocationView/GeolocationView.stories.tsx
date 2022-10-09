// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GeolocationView> = (args) => {
//   return <GeolocationView {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import GeolocationView from './GeolocationView'

export const generated = () => {
  return <GeolocationView />
}

export default {
  title: 'Components/GeolocationView',
  component: GeolocationView,
} as ComponentMeta<typeof GeolocationView>
