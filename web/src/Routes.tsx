
import { Router, Route, Set, Private } from '@redwoodjs/router'

import ZipSearchesLayout from 'src/layouts/ZipSearchesLayout'

import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>

      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />

      <Private unauthenticated='home' roles={["admin", "moderator"]}>

        <Set wrap={ZipSearchesLayout}>
          <Route path="/zip-searches/new" page={ZipSearchNewZipSearchPage} name="newZipSearch" />
          <Route path="/zip-searches/{id}/edit" page={ZipSearchEditZipSearchPage} name="editZipSearch" />
          <Route path="/zip-searches/{id}" page={ZipSearchZipSearchPage} name="zipSearch" />
          <Route path="/zip-searches" page={ZipSearchZipSearchesPage} name="zipSearches" />
        </Set>

      </Private>



      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
