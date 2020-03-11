import React, { Component } from 'react'
import Filter from './components/filter/index'
import SearchBar from '../../components/search'
import { Flex } from 'antd-mobile'
import styles from './index.module.scss'
import {connect} from 'react-redux'
import * as asyncSetFilterData from '../../store/actionCreators/filterActionCreator'
import {bindActionCreators} from 'redux'
class House extends Component {
  constructor () {
    super()
    this.state = {
      cityName: '深圳'
    }
  }
  componentDidMount(){
    this.props.asyncSetFilterData()
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
const mapStateToprops =(state)=>{
return state
}
const mapDispathToprops =(dispath)=>{
  return bindActionCreators(asyncSetFilterData,dispath)
}
export default connect(mapStateToprops,mapDispathToprops)(House)
