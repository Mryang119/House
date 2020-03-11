import React, { Component } from 'react'
import Filter from './components/filter/index'
import SearchBar from '../../components/search'
import { Flex } from 'antd-mobile'
import styles from './index.module.scss'
class House extends Component {
  constructor () {
    super()

    this.state = {
      cityName: '深圳'
    }
  }
  render () {
    return (
      <div className={styles.root}>
        <Flex className={styles.listHeader}>
          <i className='iconfont icon-back'></i>
          <SearchBar cityName={this.state.cityName} className={styles.mySearchBar} />
        </Flex>
        <Filter></Filter>
      </div>
    )
  }
}

export default House
