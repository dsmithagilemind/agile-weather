import type { ComponentMeta, ComponentStory } from '@storybook/react'

import ZipSearchLayout from './ZipSearchLayout'

export const generated: ComponentStory<typeof ZipSearchLayout> = (args) => {
  return <ZipSearchLayout {...args} />
}

export default {
  title: 'Layouts/ZipSearchLayout',
  component: ZipSearchLayout,
} as ComponentMeta<typeof ZipSearchLayout>
