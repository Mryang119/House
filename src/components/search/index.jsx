import React from 'react'
import { Flex } from 'antd-mobile'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import {withRouter} from 'react-router-dom'
import classNames from 'classnames'
function Search ({ cityName,history,className }) {
  return (
    <Flex className={classNames(styles.root,className)}>
      <Flex className={styles.searchLeft}>
        <div className={styles.location} onClick={()=>{history.push('/citylist')}}>
          <span>{cityName}</span>
          <i className='iconfont icon-arrow' />
        </div>
        <div className={styles.searchForm}>
          <i className='iconfont icon-search' />
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      <i className='iconfont icon-map' onClick={()=>{history.push('/map')}}/>
    </Flex>
  )
}
Search.propTypes = {
  cityName:PropTypes.string.isRequired
}
export default withRouter(Search)