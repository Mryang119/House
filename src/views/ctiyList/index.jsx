import React, { Component } from 'react'
import MyNavBar from '../../components/navBar/index'
import styles from './index.module.scss'
import { getCurrencity } from '../../utils/city'
import { AutoSizer, List } from 'react-virtualized'
// 标题的高度
const TITLEHEIGHT = 36
// 每一行的高度
const ROWHEIGHT = 50
class CityList extends Component {
  constructor () {
    super()
    this.state = {
      cityListObj: null,
      Abc: [],
      selectIndex: 0
    }
  }
  componentDidMount () {
    this.getCityData()
  }
  Listref = React.createRef();
  // 获取列表基本信息
  getCityData = async () => {
    const result = await this.axios.get('/area/city?level=1')
    this.dealWithCityData(result.data.body)
  }
  dealWithCityData = async cityList => {
    let cityListObj = {}
    cityList.forEach(city => {
      const temp = city.short.substr(0, 1)
      if (cityListObj[temp]) {
        // 键名存在侧往健里面push地名
        cityListObj[temp].push(city)
      } else {
        // 不存在就创建"键"
        cityListObj[temp] = [city]
      }
    })
    let Abc = Object.keys(cityListObj).sort()

    // 获取热门城市
    const res = await this.axios.get('/area/hot')
    cityListObj['hot'] = res.data.body
    // 给右边的选择列表也加上hot
    Abc.unshift('hot')

    // 获取定位城市
    const currentCity = await getCurrencity()
    cityListObj['#'] = [currentCity]
    Abc.unshift('#')
    this.setState({
      cityListObj: cityListObj,
      Abc: Abc
    })
  }
  // 处理下#和hot
  formatTitle = cityListObj => {
    switch (cityListObj) {
      case '#':
        return '定位城市'
      case 'hot':
        return '热门城市'
      default:
        return cityListObj.toUpperCase()
    }
  }
  // 渲染列表
  renderCitylist = ({ key, index, style }) => {
    const letter = this.state.Abc[index]
    const list = this.state.cityListObj[letter]
    return (
      <div key={key} style={style} className={styles.city}>
        {/* 渲染标题 */}
        <div className={styles.title}>{this.formatTitle(letter)}</div>
        {/* 渲染列表 */}
        {list.map(item => {
          return (
            <div className={styles.name} key={item.value} onClick={()=>this.changeCity(item)}>
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }
  // 点击跳转到首页
  changeCity = (item)=> {
    console.log(this.props.history.push('/layout/home'))
    window.localStorage.setItem('city',JSON.stringify(item))
  }
  // 计算每一行的高度
  calcRowHeight = ({ index }) => {
    const letter = this.state.Abc[index]
    const list = this.state.cityListObj[letter]

    return TITLEHEIGHT + list.length * ROWHEIGHT
  }
  // 计算屏幕高度
  calcHeight = () => {
    return window.screen.height
  }
  // 获取城市列表的滚动信息
  onRowsRendered = ({ startIndex }) => {
    if (startIndex !== this.setState.selectIndex) {
      this.setState({
        selectIndex: startIndex
      })
    }
  }
  // 渲染右边的索引
  renderCityIndexList = () => {
    const { Abc, selectIndex } = this.state
    return (
      <div className={styles.cityIndex}>
        {Abc.map((item, index) => {
          return (
            <div key={item} className={styles.cityIndexItem}>
              <span
                onClick={() => this.clickIndexList(index)}
                className={index === selectIndex ? styles.indexActive : ''}
              >
                {item === 'hot' ? '热' : item.toUpperCase()}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
  // 点击定位
  clickIndexList = index => {
    console.log(index,this.Listref)
    this.Listref.current.scrollToRow(index)
  }
  render () {
    const { cityListObj, Abc } = this.state
    return (
      <div className={styles.citylist}>
        <MyNavBar title='城市选择' />
        {cityListObj && (
          <AutoSizer>
            {({ width }) => {
              return (
                <List
                  ref={this.Listref}
                  height={this.calcHeight()}
                  rowCount={Abc.length}
                  rowHeight={this.calcRowHeight}
                  rowRenderer={this.renderCitylist}
                  width={width}
                  onRowsRendered={this.onRowsRendered}
                  scrollToAlignment="start" // 对齐方式， 不加的话 点击右侧的字母，左侧 列表 滚动的位置不对
                />
              )
            }}
          </AutoSizer>
        )}
        {cityListObj && this.renderCityIndexList()}
      </div>
    )
  }
}

export default CityList
