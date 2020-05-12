import React, { Component } from 'react'
import styles from './index.module.scss'
import { Route, Switch, Redirect} from 'react-router-dom'
import { TabBar } from 'antd-mobile'
// 导入字体
import '../../static/fonts/iconfont.css'
const Home = React.lazy(() => import('../home/index'))
const House = React.lazy(() => import('../house/index'))
const My = React.lazy(() => import('../my/index'))
const Message = React.lazy(() => import('../message/index'))
// import NotFound from 'NotFound'
export default class Layout extends Component {
  constructor (props) {
    super()

    this.state = {
      selectedPath: props.location.pathname
    }
  }
  TABS = [
    {
      title: '首页',
      icon: 'icon-index',
      path: '/layout/home'
    },
    {
      title: '找房',
      icon: 'icon-findHouse',
      path: '/layout/house'
    },
    {
      title: '资讯',
      icon: 'icon-info',
      path: '/layout/message'
    },
    {
      title: '我的',
      icon: 'icon-my',
      path: '/layout/my'
    }
  ]
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
                  selected={this.props.location.pathname === item.path}
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
