import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './views/layout'
import Login from './views/login'
import CityList from './views/ctiyList'
import Map from './views/map'
import Detail from './views/detail'
import './App.css'
function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/layout' component={Layout} />
          <Route path='/login' component={Login} />
          <Route path='/citylist' component={CityList} />
          <Route path='/detail/:houseCode' component={Detail} />
          <Route path='/map' component={Map}/>
          <Redirect exact from='/' to='/layout' />
        </Switch>
      </div>
    </Router>
  )
}

export default App
