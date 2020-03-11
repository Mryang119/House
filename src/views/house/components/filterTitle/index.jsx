import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import styles from './index.module.scss'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import * as filterActionCreator from '../../../../store/actionCreators/filterActionCreator'
// import SearchBar from '../../../../components/search'
import Classnames from 'classnames'
const types = [
  { name: '区域', type: 'area' },
  { name: '方式', type: 'mode' },
  { name: '租金', type: 'price' },
  { name: '筛选', type: 'more' }
]
class FilterTitle extends Component {
  componentDidMount () {
    console.log(this.props)
  }
  render () {
    return (
      <div>
        <Flex className={classNames(styles.root)}>
          {types.map(item => {
            const isSelect = this.props.selectTitleValue[item.type]
            return (
              <Flex.Item
                key={item.type}
                onClick={() => {
                  this.props.setOpenType(item.type)
                  this.props.setSelectTitleValue({ [item.type]: true })
                }}
                className={Classnames({[styles.selected] : isSelect})}
              >
                {item.name}
                <i className='iconfont icon-arrow'></i>
              </Flex.Item>
            )
          })}
        </Flex>
      </div>
    )
  }
}
// 用于接收仓库
const mapStateToProps = ({ filters: { selectTitleValue } }) => {
  console.log(selectTitleValue)

  return { selectTitleValue }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(filterActionCreator, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTitle)
