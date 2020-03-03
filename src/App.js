import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './views/layout'
import Login from './views/login'
function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/layout' component={Layout} />
          <Route path='/login' component={Login} />
          <Redirect exact from='/' to='/login' />>
        </Switch>
      </div>
    </Router>
  )
}

export default App
