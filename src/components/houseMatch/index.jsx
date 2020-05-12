import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

// 所有房屋配置项
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: '衣柜',
    icon: 'icon-wardrobe'
  },
  {
    id: 2,
    name: '洗衣机',
    icon: 'icon-wash'
  },
  {
    id: 3,
    name: '空调',
    icon: 'icon-air'
  },
  {
    id: 4,
    name: '天然气',
    icon: 'icon-gas'
  },
  {
    id: 5,
    name: '冰箱',
    icon: 'icon-ref'
  },
  {
    id: 6,
    name: '暖气',
    icon: 'icon-Heat'
  },
  {
    id: 7,
    name: '电视',
    icon: 'icon-vid'
  },
  {
    id: 8,
    name: '热水器',
    icon: 'icon-heater'
  },
  {
    id: 9,
    name: '宽带',
    icon: 'icon-broadband'
  },
  {
    id: 10,
    name: '沙发',
    icon: 'icon-sofa'
  }
]

export default class HouseMatch extends Component {
  constructor (props) {
    super()

    let supporting = null

    // props.data = ["电视","冰箱","洗衣机","空调","热水器","沙发","衣柜","天然气"]
    if (props.data) {
      // 父组件，传递了要展示的数据
      supporting = HOUSE_PACKAGE.filter(item => props.data.includes(item.name))
    } else {
      supporting = HOUSE_PACKAGE
    }

    this.state = {
      supporting,
      selectValues: []
    }
  }
  changeSupporting = e => {
    if (!this.props.changeSupporting) return
    
    let oldSelectValues = this.state.selectValues

    if (oldSelectValues.includes(e.name)) {
      oldSelectValues = oldSelectValues.filter(item => item !== e.name)
    } else {
      oldSelectValues.push(e.name)
    }
    this.setState((state)=>{
      return {
        selectValues:oldSelectValues
      }
    })
    // 给父组件传值
    setTimeout(()=>{
      this.props.selcet(this.state.selectValues)
    },0)
  }
  render () {
    return (
      <ul className={styles.root}>
        {this.state.supporting &&
          this.state.supporting.map(item => {
            return (
              <li
                key={item.id}
                className={classNames(styles.item, {
                  [styles.active]: this.state.selectValues.includes(item.name)
                })}
                onClick={() => {
                  this.changeSupporting(item)
                }}
              >
                <p>
                  <i
                    className={classNames(`iconfont ${item.icon}`, styles.icon)}
                  ></i>
                </p>
                {item.name}
              </li>
            )
          })}
      </ul>
    )
  }
}
HouseMatch.defaultProps = {
  changeSupporting: false
}
