import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ZipSearchLayoutProps = {
  children: React.ReactNode
}

const ZipSearchesLayout = ({ children }: ZipSearchLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.zipSearches()}
            className="rw-link"
          >
            ZipSearches
          </Link>
        </h1>
        <Link
          to={routes.newZipSearch()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New ZipSearch
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ZipSearchesLayout
