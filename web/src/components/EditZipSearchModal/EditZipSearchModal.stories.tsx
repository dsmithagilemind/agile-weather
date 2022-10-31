// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EditZipSearchModal> = (args) => {
//   return <EditZipSearchModal {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import EditZipSearchModal from './EditZipSearchModal'

export const generated = () => {
  return <EditZipSearchModal />
}

export default {
  title: 'Components/EditZipSearchModal',
  component: EditZipSearchModal,
} as ComponentMeta<typeof EditZipSearchModal>
