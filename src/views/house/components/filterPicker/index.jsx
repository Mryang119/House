import React, { Component } from 'react'
import { PickerView } from 'antd-mobile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FilterFooter from '../filterFooter'
import * as filterActionCreator from '../../../../store/actionCreators/filterActionCreator'
class FilterPickr extends Component {
  constructor (props) {
    super()
    this.state = {
      openType:props.openType,
      data: props.selectValue[props.openType]
    }
  }
  // 一个监听props更新的钩子
  // 让其实时同步state与props
  static getDerivedStateFromProps(props,state) {
    if(props.openType !== state.openType) {
      return {
        openType: props.openType,
        data: props.selectValue[props.openType]
      }
    } else {
      return state
    }
  }
  componentDidMount () {
  }
  changeValue = data=> {
      this.setState({
        data:data
      })
  }
  render () {
    
    return (
      <div>
        <PickerView
          onChange={this.changeValue}
          data={this.props[this.props.openType]}
          value={this.state.data}
          cols={(this.props.openType=='area')? 3:1}
        />
        <FilterFooter
          cancelClick={() => {
            
          }}
          okClick={() => {
            this.props.setValue(this.state.data) 
            this.props.setOpenType('')
          }}
        />
      </div>
    )
  }
}
const mapStateToprops = ({
  filters: {
    filterData: {
      area: { children: area },
      rentType: mode,
      price
    },
    openType,
    selectValue
  }
}) => {
  return {
    openType,
    area,
    mode,
    price,
    selectValue
  }
}
const mapDispathToprops = dispatch => {
  return bindActionCreators(filterActionCreator, dispatch)
}
export default connect(mapStateToprops, mapDispathToprops)(FilterPickr)
