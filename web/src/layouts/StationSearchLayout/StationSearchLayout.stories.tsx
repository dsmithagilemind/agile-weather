import type { ComponentMeta, ComponentStory } from '@storybook/react'

import StationSearchLayout from './StationSearchLayout'

export const generated: ComponentStory<typeof StationSearchLayout> = (args) => {
  return <StationSearchLayout {...args} />
}

export default {
  title: 'Layouts/StationSearchLayout',
  component: StationSearchLayout,
} as ComponentMeta<typeof StationSearchLayout>
