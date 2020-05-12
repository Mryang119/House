import React, { Component } from 'react'
import styles from './index.module.scss'
import MynavBar from '../../components/navBar'
import { Toast } from 'antd-mobile'
import HouseItem from '../../components/houseLitst'
const BMap = window.BMap
// 圆形覆盖物的样式：
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}
class Map extends Component {
  constructor () {
    super()
    this.state = {
      houseList: [],
      isShow: false //是否展示房源信息
    }
  }
  componentDidMount () {
    this.map = new BMap.Map('container') // 创建地图实例
    this.renderMap()
    this.map.addEventListener('click',()=>{
      console.log('111');
      this.setState({
        isShow:false
      })
    })
    this.id = JSON.parse(window.localStorage.getItem('city')).value
  }
  // 渲染房屋列表
  renderHouseList = () => {
    return <div className={[styles.houseList,this.state.isShow ? styles.show : ''].join(' ')}>
      <div className={styles.titleWrap}>
        <h1 className={styles.listTitle}>房屋列表</h1>
        <a className={styles.titleMore} href="/layout/houselist">更多房源</a>
      </div>
      <div className={styles.houseItems}>
        {this.state.houseList.map(item => {
          return <HouseItem key={item.houseCode} {...item}/>
        })}
      </div>
    </div>
  }
  // 获取当前地图缩放级别
  getTypeAndNextZoom = () => {
    let type = 'cricle'
    let nextZoom = 13
    const zoom = this.map.getZoom()
    if (zoom >= 10 && zoom <= 12) {
      type = 'cricle'
      nextZoom = 13
    } else if (zoom >= 12 && zoom <= 14) {
      type = 'cricle'
      nextZoom = 15
    } else if (zoom > 14) {
      type = 'rect'
    }
    return {
      type,
      nextZoom
    }
  }
  // 展示地图
  renderMap = () => {
    // 获取城市名
    const city = JSON.parse(window.localStorage.getItem('city'))
    // 通过定位城市地名结合百度api获取经纬度:逆解析
    console.log(city)

    const myGeo = new BMap.Geocoder() // 创建逆解析实例
    myGeo.getPoint(`${city.label}市`, point => {
      if (point) {
        this.map.centerAndZoom(point, 11)
        this.renderOverlays(this.id)
      }
    })
  }
  // 获取一级覆盖物信息
  renderOverlays = async id => {
    Toast.loading('数据加载中')
    const result = await this.axios.get(`/area/map?id=${id}`)
    Toast.hide()
    console.log(result)
    // 拿到数据先生成一级覆盖物
    const { type, nextZoom } = this.getTypeAndNextZoom()
    result.data.body.forEach(item => {
      if (type === 'cricle') {
        this.renderCircle(item, nextZoom)
      } else {
        this.renderRect(item)
      }
    })
  }
  // 渲染覆盖物
  renderCircle = (item, nextZoom) => {
    const {
      count,
      label: name,
      value,
      coord: { longitude, latitude }
    } = item

    let point = new BMap.Point(longitude, latitude)
    var opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(-35, -35) //设置文本偏移量
    }
    var label = new BMap.Label('', opts) // 创建文本标注对象
    // 设置内容
    label.setContent(`<div class=${styles.bubble}>
      <p class=${styles.name}>${name}</p>
      <p class=${styles.name}>${count}</p>
    </div>`)
    // 给覆盖物添加点击事件
    label.addEventListener('click', () => {
      // 放大二级地图
      this.map.centerAndZoom(point, nextZoom)
      // 干掉之前的覆盖物
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0)
      this.renderOverlays(value)
    })
    this.map.addOverlay(label)
  }
  // 渲染三级覆盖物
  renderRect = item => {
    console.log(item)
    const {
      count,
      label: name,
      value,
      coord: { longitude, latitude }
    } = item
    // 根据经纬度创建坐标(经度在前面，并且经度的数量一般比纬度大)
    var point = new BMap.Point(longitude, latitude)

    var opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(-50, -20) //设置文本偏移量
    }

    var label = new BMap.Label('', opts) // 创建文本标注对象
    label.setStyle(labelStyle)
    label.setContent(`
      <div class=${styles.rect}>
        <span class=${styles.housename}>${name}</span>
        <span class=${styles.housenum}>${count}</span>
        <i class=${styles.arrow}></i>
      </div>
    `)
    label.addEventListener('click', e => {
      if (e && e.changedTouches) {
        const { clientX, clientY } = e.changedTouches[0]
        const moveX = window.screen.width / 2 - clientX
        const moveY =
          window.screen.height / 2 - clientY - this.calcHeight() / 2 / 2

        // 可以滚动多少距离，让其在可视区域居中显示
        this.map.panBy(moveX, moveY)
        // 根据小区的id，去加载小区下面的房源列表数据
        this.fetchHouseListData(value)
      }
    })

    // 把覆盖物添加到地图上
    this.map.addOverlay(label)
  }
  // 获取房源
  fetchHouseListData = async id => {
    Toast.loading('数据加载中...', 0)
    const result = await this.axios.get(`/houses?cityId=${id}`)
    Toast.hide()

    this.setState({
      houseList: result.data.body.list,
      isShow: true
    })
  }
  
  // 获取屏幕最高高度
  calcHeight = () => {
    return window.screen.height
  }
  render () {
    return (
      <div>
        <MynavBar title='地图找房' />
        <div id='container' style={{ height: this.calcHeight() - 45 }}></div>
        {this.renderHouseList()}
      </div>
    )
  }
}

export default Map
