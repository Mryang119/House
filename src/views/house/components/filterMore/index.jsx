import React, { Component } from 'react'
import Classnames from 'classnames'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import * as filterActionCreator from '../../../../store/actionCreators/filterActionCreator'
import FilterFooter from '../filterFooter'
import { bindActionCreators } from 'redux'
class FilterMore extends Component {
  state = {
    selectedValues: this.props.more
  }
  // 往仓库塞数据
  toggleSelect =(value)=>{
    let oldValues = this.state.selectedValues
    console.log(value);
    if(oldValues.includes(value)){// 假如之前存在就移除自己
      oldValues = oldValues.filter(val => val !== value)
    } else{
      //不存在就push
      oldValues.push(value)
    }
    this.setState({
      selectedValues:oldValues
    })
  }
  renderItems = data => {
    return (
      <dd className={styles.dd}>
        {data.map(item => {
          return (
            <span
              onClick={() => this.toggleSelect(item.value)}
              className={Classnames(styles.tag,{[styles.tagActive]:this.state.selectedValues.includes(item.value)})}
              key={item.value}
            >
              {item.label}
            </span>
          )
        })}
      </dd>
    )
  }

  render () {
    const { roomType, oriented, floor, characteristic } = this.props
    return (
      <div className={Classnames(styles.root)}>
        {/* 遮罩层 */}
        <div
          onClick={() => this.props.setOpenType('')}
          className={styles.mask}
        ></div>
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            { this.renderItems(roomType) }
            <dt className={styles.dt}>朝向</dt>
            { this.renderItems(oriented) }
            <dt className={styles.dt}>楼层</dt>
            { this.renderItems(floor) }
            <dt className={styles.dt}>房屋亮点</dt>
            { this.renderItems(characteristic) }
          </dl>
        <FilterFooter 
          cancelText="清除"
          okText='确定'
          cancelClick={()=>{
            this.setState({selectedValues:[]})
          }}
          okClick={()=>{
          this.props.setValue(this.state.selectedValues)
          this.props.setOpenType('')
        }}/>
        </div>
      </div>
    )
  }
}
const mapStateToprops = ({
  filters: {
    filterData: { roomType, oriented, floor, characteristic },
    selectValue: { more }
  }
}) => {
  return {
    roomType,
    oriented,
    floor,
    characteristic,
    more
  }
}
const mapDispathToprops = dispath => {
  return bindActionCreators(filterActionCreator, dispath)
}
export default connect(mapStateToprops, mapDispathToprops)(FilterMore)
