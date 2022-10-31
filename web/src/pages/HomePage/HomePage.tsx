
import { MetaTags } from '@redwoodjs/web'

// @ts-ignore
import GeolocationsCell from 'src/components/GeolocationsCell/GeolocationsCell'
import { useZipSearchStore } from 'src/lib/stores'

const HomePage = () => {
  const loadZipCode = useZipSearchStore((state) => state.loadZipCode)

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      {loadZipCode ? (
        <GeolocationsCell zip={loadZipCode} />
      ) : (
        <div>No data loaded</div>
      )}
    </>
  )
}

export default HomePage
