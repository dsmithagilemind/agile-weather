// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import StationsLayout from 'src/layouts/StationsLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={StationsLayout}>
        <Route path="/stations/new" page={StationNewStationPage} name="newStation" />
        <Route path="/stations/{id}/edit" page={StationEditStationPage} name="editStation" />
        <Route path="/stations/{id}" page={StationStationPage} name="station" />
        <Route path="/stations" page={StationStationsPage} name="stations" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
