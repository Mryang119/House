import React from 'react'
import PropsTypes from 'prop-types'
import {NavBar} from 'antd-mobile'
import styles from './index.module.scss'

import { withRouter } from 'react-router-dom'
function MyNavBar({title,history}){
  return (
    <div className={styles.navBar}>
      <NavBar
        mode="light"
        icon={<i className="iconfont icon-back" />}
        onLeftClick={() => history.goBack()}
      >
        {title}
      </NavBar>
    </div>
  );
}
MyNavBar.propTypes = {
  title: PropsTypes.string.isRequired
};

export default withRouter(MyNavBar);
