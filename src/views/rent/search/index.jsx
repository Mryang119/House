import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'
import { getCurrencity } from '../../../utils/city'
import { List } from 'antd-mobile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as searchActionCreator from '../../../store/actionCreators/searchActionCreator.js'
const Item = List.Item
class Search extends Component {
  state = {
    searchList: [],
    time: true
  }
  id = ''
  async componentDidMount () {
    let { value } = await getCurrencity()
    this.id = value
  }
  // 查询小区关键字
  onChange = value => {
    this.antiShake(async () => {
      let res = await this.axios.get('/area/community', {
        params: {
          id: this.id,
          name: value
        }
      })
      console.log(res)

      if (res.data.status === 200) {
        this.setState({
          searchList: res.data.body
        })
      }
    }, 1000)
  }
  // 封装一个防抖函数
  antiShake = (cb, times) => {
    let time = null
    return (function () {
      clearTimeout(time)
      time = setTimeout(() => {
        cb()
      }, times)
    })()
  }
  // 把小区传递给仓库
  toRent = communityName => {
    this.props.history.goBack()
    this.props.SetCommuniyName(communityName)
  }
  render () {
    const { searchList } = this.state
    return (
      <div>
        <SearchBar
          placeholder='请输入小区名称'
          onCancel={() => this.props.history.goBack()}
          onChange={this.onChange}
        />
        {/* 展示搜索列表 */}
        <List>
          {searchList.length > 0 &&
            searchList.map(item => {
              return (
                <Item key={item.communityName}>
                  <div onClick={() => this.toRent(item)}>
                    {item.communityName}
                  </div>
                </Item>
              )
            })}
        </List>
      </div>
    )
  }
}

const mapDispatchToprops = dispatch => {
  return bindActionCreators(searchActionCreator, dispatch)
}
export default connect(null, mapDispatchToprops)(Search)
