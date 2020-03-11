import React, { Component } from 'react';
import {connect} from 'react-redux'
import styles from './index.module.scss'
import * as filterActionCreator from '../../../../store/actionCreators/filterActionCreator'
import { bindActionCreators } from 'redux';
import FilterTitle from '../filterTitle/index'
import FilterPicker from '../filterPicker'
import FiterMore from '../filterMore'
class Filter extends Component {
  constructor(){
    super()
  }
  
  renderMask =()=>{
   const openType = this.props.filters.openType
    
   // 关闭遮罩层
   if(openType==='') return null
   return(
     <div className={styles.mask} onClick={()=>this.props.setOpenType('')}>
     </div>
   )
  }
  render() {
    const openType = this.props.filters.openType
    return (
      <div className={styles.styles}>
        <div className={styles.content}>
        <FilterTitle />
        {
          (openType=='area'|| openType=='mode' || openType=='price') && <FilterPicker></FilterPicker>
        }
        {
          (openType)=='more' && <FiterMore />
        }
        </div>
        {this.renderMask()}
      </div>
    );
  }
}
const mpaStateToprops = (state)=>{
return state
}
const mapDispathToprops =(dispath)=>{
  return bindActionCreators(filterActionCreator,dispath)
}
export default connect(mpaStateToprops,mapDispathToprops)(Filter);