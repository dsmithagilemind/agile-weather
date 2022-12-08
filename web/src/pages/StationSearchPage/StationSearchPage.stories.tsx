import type { ComponentMeta } from '@storybook/react'

import StationSearchPage from './StationSearchPage'

export const generated = () => {
  return <StationSearchPage />
}

export default {
  title: 'Pages/StationSearchPage',
  component: StationSearchPage,
} as ComponentMeta<typeof StationSearchPage>
