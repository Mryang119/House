import React, { Component } from 'react'
import Filter from './components/filter/index'
import SearchBar from '../../components/search'
import { Flex, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import * as asyncSetFilterData from '../../store/actionCreators/filterActionCreator'
import { bindActionCreators } from 'redux'
import { getCurrencity } from '../../utils/city'
import HouseItem from '../../components/houseLitst/index'
import Sticky from '../../components/sticky'
import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader
} from 'react-virtualized'
class House extends Component {
  constructor (props) {
    super()
    this.state = {
      cityName: '深圳',
      list: null,
      count: 0
    }
  }
  id = null
  filters = {}
  async componentDidMount () {
    this.props.asyncSetFilterData()
    let result = await getCurrencity()
    this.id = result.value
    this.getHouseList()
  }
  // props更新的钩子
  componentWillReceiveProps (props) {
    if (props.isSearch) {
      if (props.area.length > 2) {
        this.filters.area = props.area[0]
      }
      if (props.mode[0] !== 'null') {
        this.filters.mode = props.mode[0]
      }
      if (props.price[0] !== 'null') {
        this.filters.price = props.price[0]
      }
      if (props.more.length > 0) {
        this.filters.more = props.more.join(',')
      }

      this.getHouseList()
    } else return null
  }
  // 请求房屋数据
  getHouseList = async () => {
    let res = await this.axios.get('/houses', {
      params: {
        cityId: this.id,
        start: 1,
        end: 20,
        ...this.filters
      }
    })
    if (res.data.status === 200) {
      console.log('111')

      this.setState({
        list: res.data.body.list,
        count: res.data.body.count
      })
    }
  }
  // 房屋渲染方法
  rowRenderer = ({ key, index, style }) => {
    const item = this.state.list[index]
    // 划到一半会发现报错,因为到了20条数据的时候的item是undefind 解构会出错
    // 利用List提供的展位块弥补
    if (!item) {
      return (
        <div key={key} style={style}>
          <p className={styles.loading}>...加载中</p>
        </div>
      )
    }
    return <HouseItem style={style} key={key} {...item} />
  }

  calcHeight = () => {
    return window.screen.height
  }
  // 判断这一行是否加载完毕
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    console.log(startIndex, stopIndex)

    return new Promise(async (resolve, reject) => {
      Toast.loading('数据加载中...', 0)
      const result = await this.axios.get('/houses', {
        params: {
          ...this.filters,
          cityId: this.id,
          start: 1 + startIndex,
          end: 1 + stopIndex
        }
      })

      Toast.hide()

      if (result.data.status === 200) {
        this.setState(
          {
            list: { ...this.state.list, ...result.data.body.list },
            count: result.data.body.count
          },
          () => {
            // 这个地方代表发送网络请求完毕了，可以去重新渲染数据了
            resolve()
          }
        )
      }
    })
  }

  // 渲染房屋信息列表
  renderHouseList = () => {
    let { count } = this.state

    return (
      <div className={styles.houseList}>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={count}
          minimumBatchSize={20}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ isScrolling, scrollTop }) => (
                <AutoSizer>
                  {({ width }) => (
                    <List
                      autoHeight
                      height={this.calcHeight()}
                      rowCount={count}
                      rowHeight={120}
                      rowRenderer={this.rowRenderer}
                      width={width}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
    )
  }
  render () {
    return (
      <div className={styles.root}>
        <Flex className={styles.listHeader}>
          <i
            className='iconfont icon-back'
            onClick={() => this.props.history.goBack()}
          ></i>
          <SearchBar
            cityName={this.state.cityName}
            className={styles.mySearchBar}
          />
        </Flex>
        <Sticky>
          <Filter />
        </Sticky>

        {this.state.list && this.renderHouseList()}
      </div>
    )
  }
}
const mapStateToprops = ({
  filters: {
    isSearch,
    selectValue: { area, mode, price, more }
  }
}) => {
  return {
    area,
    mode,
    price,
    more,
    isSearch
  }
}
const mapDispathToprops = dispath => {
  return bindActionCreators(asyncSetFilterData, dispath)
}
export default connect(mapStateToprops, mapDispathToprops)(House)
