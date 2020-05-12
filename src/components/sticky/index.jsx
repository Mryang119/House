import React, { Component } from 'react'
import styles from './index.module.scss'
class Sticky extends Component {
  placeholderRef = React.createRef()
  contentRef = React.createRef()

  handleScroll = () => {
    const placeholderDom = this.placeholderRef.current
    const contentDom = this.contentRef.current
    // 判断 placeholderDom 距离顶部的距离
    const { top } = placeholderDom.getBoundingClientRect()
    if (top < 0) {
      placeholderDom.style.height = '40px'
      contentDom.classList.add(styles.fixed)
    } else {
      placeholderDom.style.height = '0px'
      contentDom.classList.remove(styles.fixed)
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render () {
    return (
      <div>
        {/* 占位的div */}
        <div ref={this.placeholderRef}></div>
        <div ref={this.contentRef}>
          {/* 要吸顶的子组件 */}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Sticky
