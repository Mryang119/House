import React, { Suspense } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
const Layout = React.lazy(() => import('./views/layout'))
const Login = React.lazy(() => import('./views/login'))
const CityList = React.lazy(() => import('./views/ctiyList'))
const Map = React.lazy(() => import('./views/map'))
const Detail = React.lazy(() => import('./views/detail'))
const Rent = React.lazy(() => import('./views/rent'))
const RentAdd = React.lazy(() => import('./views/rent/add'))
const AuthRoute = React.lazy(() => import('./components/authRoute'))
const Search = React.lazy(() => import('./views/rent/search'))
function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path='/layout' component={Layout} />
            <Route path='/login' component={Login} />
            <Route path='/citylist' component={CityList} />
            <Route path='/detail/:houseCode' component={Detail} />
            <Route path='/map' component={Map} />
            {/* 验证路由 */}
            <AuthRoute path='/rent' exact component={Rent} />
            <AuthRoute path='/rent/add' component={RentAdd} />
            <AuthRoute path='/rent/search' component={Search} />
            <Redirect exact from='/' to='/layout' />
          </Suspense>
        </Switch>
      </div>
    </Router>
  )
}

export default App
