import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './index.module.scss'
import * as filterActionCreator from '../../../../store/actionCreators/filterActionCreator'
import { bindActionCreators } from 'redux'
import FilterTitle from '../filterTitle/index'
import FilterPicker from '../filterPicker'
import FiterMore from '../filterMore'
import { Spring } from 'react-spring/renderprops'
class Filter extends Component {

  renderMask = () => {
    const openType = this.props.filters.openType
    const isShow =
      openType === 'area' || openType === 'mode' || openType === 'price'
    // 关闭遮罩层
    if (openType === '') return null

    return (
      <Spring from={{opacity:0}} to={{ opacity: isShow ? 1 : 0 }}>
        {props => {
          if (props.opacity === 0) {
            return null
          } else {
            return (
              <div
                style={props}
                className={styles.mask}
                onClick={() => this.props.setOpenType('')}
              ></div>
            )
          }
        }}
      </Spring>
    )
  }
  render () {
    const openType = this.props.filters.openType
    return (
      <div className={styles.styles}>
        <div className={styles.content}>
          <FilterTitle />
          {(openType === 'area' ||
            openType === 'mode' ||
            openType === 'price') && <FilterPicker></FilterPicker>}
          {openType === 'more' && <FiterMore />}
        </div>
        {this.props.filters.openType !== 'more' && this.renderMask()}
      </div>
    )
  }
}
const mpaStateToprops = state => {
  return state
}
const mapDispathToprops = dispath => {
  return bindActionCreators(filterActionCreator, dispath)
}
export default connect(mpaStateToprops, mapDispathToprops)(Filter)
