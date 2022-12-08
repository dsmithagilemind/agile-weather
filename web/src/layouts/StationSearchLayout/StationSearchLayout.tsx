import { useEffect } from "react"

import Sidebar from "src/components/Sidebar/Sidebar"
import { usePageSidebarStore } from "src/lib/stores"

type StationSearchLayoutProps = {
  children?: React.ReactNode
}

const StationSearchLayout = ({ children }: StationSearchLayoutProps) => {

  const setPageSidebarComponent = usePageSidebarStore((state) => state.setPageSidebarComponent)

  useEffect(() => {
    setPageSidebarComponent(<Sidebar></Sidebar>)
  }, [])

  return <>{children}</>
}

export default StationSearchLayout
