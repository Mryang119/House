import React,{Component} from 'react'
import './index.module.scss'
import MyNavBar from '../../components/navBar'
import styles from './index.module.scss'
export default class Login extends Component {
  render(){
    return (
      <div>
        <MyNavBar title='登录' className={styles.loginNavBar}/>
        Login
      </div>
    )
  }
}