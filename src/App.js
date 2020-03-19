import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './views/layout'
import Login from './views/login'
import CityList from './views/ctiyList'
import Map from './views/map'
import Detail from './views/detail'
import Rent from './views/rent'
import RentAdd from './views/rent/add'
import AuthRoute from './components/authRoute'
import Search from './views/rent/search'
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
          <Route path='/map' component={Map} />
          {/* 验证路由 */}
          <AuthRoute path='/rent' exact component={Rent} />
          <AuthRoute path='/rent/add'  component={RentAdd} />
          <AuthRoute path='/rent/search'  component={Search} />
          <Redirect exact from='/' to='/layout' />
        </Switch>
      </div>
    </Router>
  )
}

export default App
