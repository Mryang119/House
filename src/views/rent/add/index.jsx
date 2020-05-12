import React, { Component } from 'react'
import MyNavBar from '../../../components/navBar'
import {
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Flex,
  Toast
} from 'antd-mobile'
import styles from './index.module.scss'
import HouseMatch from '../../../components/houseMatch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as searchActionCreator from '../../../store/actionCreators/searchActionCreator'

// 简化一下antd的List组件
const Item = List.Item

// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]

// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

// 朝向：
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]

class RentAdd extends Component {
  constructor (props) {
    super()

    this.state = {
      // 小区
      CommunityName: null,
      community: null,
      files: [], // 存放上传的图片
      roomType: '', // 户型
      floor: '', // 所在楼层
      oriented: '', // 朝向
      title: '', // 房屋标题
      price: '', // 租金
      supporting: '', // 房屋配套
      description: '', // 房屋描述
      size: ''
    }
  }
  componentDidMount () {
    this.setState({
      CommunityName: this.props.CommunityName,
      community: this.props.CommunityName.community
    })
    setTimeout(() => {
      console.log(this.props.CommunityName.communityName)
    }, 0)
  }
  // 统一触发Piker
  pickerchange = v => {
    let e = v.toString()
    if (e.indexOf('FLOOR') !== -1) {
      this.setState({
        floor: e
      })
    } else if (e.indexOf('ROOM') !== -1) {
      this.setState({
        roomType: e
      })
    } else if (e.indexOf('ORIEN') !== -1) {
      this.setState({
        oriented: e
      })
    }
  }
  selcet = e => {
    this.setState({
      supporting: e.join('|')
    })
  }
  price = e => {
    this.setState({
      price: e
    })
  }
  size = e => {
    this.setState({
      size: e
    })
  }
  title = e => {
    this.setState({
      title: e
    })
  }
  description = e => {
    this.setState({
      description: e
    })
  }
  onChange = files => {
    this.setState({
      files
    })
  }
  // 校验开始
  submit = async () => {
    let {
      community,
      files, // 存放上传的图片
      roomType, // 户型
      floor, // 所在楼层
      oriented, // 朝向
      title, // 房屋标题
      price, // 租金
      supporting, // 房屋配套
      description, // 房屋描述
      size
    } = this.state
    if (
      community === '' ||
      roomType === '' ||
      floor === '' ||
      oriented === '' ||
      title === '' ||
      price === '' ||
      supporting === '' ||
      description === '' ||
      size === ''
    ) {
      Toast.fail('有东西没填完我懒得帮你找了', 0.8)
    } else {
      //2、上传图片
      const formData = new FormData()
      files.forEach(item => {
        formData.append('file', item.file)
      })
      console.log(formData)
      const result = await this.axios.post('/houses/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if(result.data.status !== 200) {
        Toast.info('上传失败',1)
        return
      }
      files = result.data.body.join("|")
      console.log(files);
      let data = {
        community,
        roomType,
        floor,
        oriented,
        title,
        price,
        supporting,
        description,
        size,
        houseImg:files
      }
      // 发布房源
      const res = await this.axios.post('/user/houses', {
        ...data
      })
      if(res.data.status===200) {
        Toast.success('发布成功',1)
        this.props.history.push('/rent')
      } else {
        Toast.fail(`发布失败`,1)
      }
    }
  }
  render () {
    const { files } = this.state
    let {
      CommunityName: { communityName }
    } = this.props
    return (
      <div className={styles.root}>
        <MyNavBar title='发布房源' className={styles.MyNavBar} />
        <List renderHeader={() => '房源信息'} className='my-list'>
          <Item
            extra={communityName || '请输入小区名称'}
            arrow='horizontal'
            onClick={() => this.props.history.push('/rent/search')}
          >
            小区名称
          </Item>
          <InputItem
            placeholder='请输入租金/月'
            extra='¥/月'
            onChange={this.price}
            name='price'
          >
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </InputItem>
          <InputItem
            placeholder='建筑面积'
            extra='㎡'
            onChange={this.size}
            name='size'
          >
            建筑面积
          </InputItem>
          <Picker
            data={roomTypeData}
            cols={1}
            onChange={this.pickerchange}
            value={new Array(this.state.roomType)}
          >
            <List.Item arrow='horizontal'>
              户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
            </List.Item>
          </Picker>
          <Picker
            data={floorData}
            cols={1}
            onChange={this.pickerchange}
            value={new Array(this.state.floor)}
          >
            <List.Item arrow='horizontal'>所在楼层</List.Item>
          </Picker>
          <Picker
            data={orientedData}
            cols={1}
            onChange={this.pickerchange}
            value={new Array(this.state.oriented)}
          >
            <List.Item arrow='horizontal'>
              朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
            </List.Item>
          </Picker>
        </List>
        <List renderHeader={() => '房屋标题'} className='my-list'>
          <InputItem
            placeholder='请输入标题（例如：整租 小区名 2室 5000元）'
            onChange={this.title}
          ></InputItem>
        </List>
        <List renderHeader={() => '房屋头像'} className='my-list'>
          <ImagePicker
            files={files}
            selectable={files.length < 9}
            multiple={true}
            onChange={this.onChange}
          />
        </List>
        <List renderHeader={() => '房屋配套'} className='my-list'>
          <HouseMatch changeSupporting={true} selcet={this.selcet} />
        </List>
        <List renderHeader={() => '房屋描述'} className='my-list'>
          <TextareaItem
            rows={5}
            placeholder='请输入房屋描述'
            onChange={this.description}
          />
        </List>
        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel} onClick={()=>this.props.history.push('/layout')}>取消</Flex.Item>
          <Flex.Item className={styles.confirm} onClick={this.submit}>
            提交
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
const mapStateToprops = ({ searchs: { CommunityName } }) => {
  return {
    CommunityName
  }
}
const mapDispatchToprops = dispatch => {
  return bindActionCreators(searchActionCreator, dispatch)
}
export default connect(mapStateToprops, mapDispatchToprops)(RentAdd)
