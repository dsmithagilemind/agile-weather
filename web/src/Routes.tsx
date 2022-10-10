// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import ZipSearchesLayout from 'src/layouts/ZipSearchesLayout'

import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ZipSearchesLayout}>
        <Route path="/zip-searches/new" page={ZipSearchNewZipSearchPage} name="newZipSearch" />
        <Route path="/zip-searches/{id}/edit" page={ZipSearchEditZipSearchPage} name="editZipSearch" />
        <Route path="/zip-searches/{id}" page={ZipSearchZipSearchPage} name="zipSearch" />
        <Route path="/zip-searches" page={ZipSearchZipSearchesPage} name="zipSearches" />
      </Set>
      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
