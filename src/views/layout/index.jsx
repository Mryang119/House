import React, { Component } from 'react'
import styles from './index.module.scss'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import Home from '../home/index'
import House from '../house/index'
import My from '../my/index'
import Message from '../message/index'
import { Button } from 'antd-mobile'
// import NotFound from 'NotFound'
export default class Layout extends Component {
  render () {
    return (
      <div className={styles.test}>
        <Button  type="primary">sb</Button>
        <Switch>
          <Route path='/layout/home' component={Home}></Route>
          <Route path='/layout/house' component={House}></Route>
          <Route path='/layout/message' component={Message}></Route>
          <Route path='/layout/my' component={My}></Route>
          <Redirect from='/layout' to='/layout/home'></Redirect>
          {/* <Route component={NotFound} /> */}
        </Switch>
        <div>
          <Link to='/layout/home'>首页</Link>
          <Link to='/layout/house'>找房</Link>
          <Link to='/layout/message'>资讯</Link>
          <Link to='/layout/my'>我的</Link>
        </div>
      </div>
    )
  }
}
