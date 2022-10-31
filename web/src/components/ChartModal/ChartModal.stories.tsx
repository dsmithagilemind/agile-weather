// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ChartModal> = (args) => {
//   return <ChartModal {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ChartModal from './ChartModal'

export const generated = () => {
  return <ChartModal />
}

export default {
  title: 'Components/ChartModal',
  component: ChartModal,
} as ComponentMeta<typeof ChartModal>
