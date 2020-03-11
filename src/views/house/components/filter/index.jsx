import React, { Component } from 'react';
import {connect} from 'react-redux'
import FilterTitle from '../filterTitle/index'
import styles from './index.module.scss'

class Filter extends Component {
  render() {
    return (
      <div className={styles.styles}>
        <FilterTitle />
      </div>
    );
  }
}

export default Filter;