import { useEffect } from 'react';

import ZipSearchSidebar from 'src/components/ZipSearchSidebar/ZipSearchSidebar';
import { usePageSidebarStore } from 'src/lib/stores';
type ZipSearchLayoutProps = {
  children?: React.ReactNode
}

const ZipSearchLayout = ({ children }: ZipSearchLayoutProps) => {

  const setPageSidebarComponent = usePageSidebarStore((state) => state.setPageSidebarComponent)

  useEffect(() => {
    setPageSidebarComponent(<ZipSearchSidebar />)
  }, [])

  return <>{children}</>
}

export default ZipSearchLayout
