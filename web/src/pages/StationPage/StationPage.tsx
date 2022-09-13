import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const StationPage = () => {
  return (
    <>
      <MetaTags title="Station" description="Station page" />

      <h1>StationPage</h1>
      <p>
        Find me in <code>./web/src/pages/StationPage/StationPage.tsx</code>
      </p>
      <p>
        My default route is named <code>station</code>, link to me with `
        <Link to={routes.station()}>Station</Link>`
      </p>
    </>
  )
}

export default StationPage
