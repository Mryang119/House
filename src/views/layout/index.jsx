import React, { Component } from 'react'
import styles from './index.module.scss'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import Home from '../home/index'
import House from '../house/index'
import My from '../my/index'
import Message from '../message/index'
import { TabBar } from 'antd-mobile'
// 导入字体
import '../../static/fonts/iconfont.css'
// import NotFound from 'NotFound'
export default class Layout extends Component {
  constructor(props) {
    super();

    this.state = {
      selectedPath: props.location.pathname
    };
  }
  TABS = [
    {
      title: "首页",
      icon: "icon-index",
      path: "/layout/home"
    },
    {
      title: "找房",
      icon: "icon-findHouse",
      path: "/layout/house"
    },
    {
      title: "资讯",
      icon: "icon-info",
      path: "/layout/message"
    },
    {
      title: "我的",
      icon: "icon-my",
      path: "/layout/my"
    }
  ];
  render () {
    return (
      <div className={styles.test}>
        <Switch>
          <Route path='/layout/home' component={Home}></Route>
          <Route path='/layout/house' component={House}></Route>
          <Route path='/layout/message' component={Message}></Route>
          <Route path='/layout/my' component={My}></Route>
          <Redirect from='/layout' to='/layout/home'></Redirect>
          {/* <Route component={NotFound} /> */}
        </Switch>
        <div className={styles.tabbar}>
          <TabBar tintColor='#21B97A' noRenderContent={true}>
            {this.TABS.map(item => {
              return (
                <TabBar.Item
                  title={item.title}
                  key={item.path}
                  icon={<i className={`iconfont ${item.icon}`} />}
                  selectedIcon={<i className={`iconfont ${item.icon}`} />}
                  selected={this.state.selectedPath === item.path}
                  onPress={() => {
                    this.setState({
                      selectedPath: item.path
                    })
                    this.props.history.push(item.path)
                  }}
                ></TabBar.Item>
              )
            })}
          </TabBar>
        </div>
      </div>
    )
  }
}
