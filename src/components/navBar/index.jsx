import React from 'react'
import PropsTypes from 'prop-types'
import {NavBar} from 'antd-mobile'
import styles from './index.module.scss'
import Classnames from 'classnames'

import { withRouter } from 'react-router-dom'
function MyNavBar({title,history,rightContent,className}){
  return (
    <div>
      <NavBar
        mode="light"
        icon={<i className="iconfont icon-back" />}
        onLeftClick={() => history.goBack()}
        rightContent={rightContent}
        className={Classnames(styles.navBar,className)}
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
