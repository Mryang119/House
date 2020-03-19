import React, { Component } from 'react';
import MyNavBar from '../../../components/navBar'
import {
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Flex
} from "antd-mobile";
import styles from './index.module.scss'
import HouseMatch from '../../../components/houseMatch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as searchActionCreator from '../../../store/actionCreators/searchActionCreator'

// 简化一下antd的List组件
const Item = List.Item;

// 房屋类型
const roomTypeData = [
  { label: "一室", value: "ROOM|d4a692e4-a177-37fd" },
  { label: "二室", value: "ROOM|d1a00384-5801-d5cd" },
  { label: "三室", value: "ROOM|20903ae0-c7bc-f2e2" },
  { label: "四室", value: "ROOM|ce2a5daa-811d-2f49" },
  { label: "四室+", value: "ROOM|2731c38c-5b19-ff7f" }
];

// 楼层
const floorData = [
  { label: "高楼层", value: "FLOOR|1" },
  { label: "中楼层", value: "FLOOR|2" },
  { label: "低楼层", value: "FLOOR|3" }
];

// 朝向：
const orientedData = [
  { label: "东", value: "ORIEN|141b98bf-1ad0-11e3" },
  { label: "西", value: "ORIEN|103fb3aa-e8b4-de0e" },
  { label: "南", value: "ORIEN|61e99445-e95e-7f37" },
  { label: "北", value: "ORIEN|caa6f80b-b764-c2df" },
  { label: "东南", value: "ORIEN|dfb1b36b-e0d1-0977" },
  { label: "东北", value: "ORIEN|67ac2205-7e0f-c057" },
  { label: "西南", value: "ORIEN|2354e89e-3918-9cef" },
  { label: "西北", value: "ORIEN|80795f1a-e32f-feb9" }
];

class RentAdd extends Component {

  constructor(props) {
    super();

    this.state = {
        // 小区
        community: null,
        communityName: null,
      files: [] // 存放上传的图片
    };
  }
  componentDidMount(){
  this.setState({
    communityName:this.props.CommunityName
  })
  }
  render() {
    const {
      communityName,
      files
    } = this.state;
    return (
      <div className={styles.root}>
        <MyNavBar title="发布房源" />
        <List renderHeader={() => "房源信息"} className="my-list">
          <Item
            extra={communityName || "请输入小区名称"}
            arrow="horizontal"
            onClick={() => this.props.history.push("/rent/search")}
          >
            小区名称
          </Item>
          <InputItem placeholder="请输入租金/月" extra="¥/月">
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </InputItem>
          <InputItem placeholder="建筑面积" extra="㎡">
            建筑面积
          </InputItem>
          <Picker data={roomTypeData} cols={1}>
            <List.Item arrow="horizontal">
              户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
            </List.Item>
          </Picker>
          <Picker data={floorData} cols={1}>
            <List.Item arrow="horizontal">所在楼层</List.Item>
          </Picker>
          <Picker data={orientedData} cols={1}>
            <List.Item arrow="horizontal">
              朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
            </List.Item>
          </Picker>
        </List>
        <List renderHeader={() => "房屋标题"} className="my-list">
          <InputItem placeholder="请输入标题（例如：整租 小区名 2室 5000元）"></InputItem>
        </List>
        <List renderHeader={() => "房屋头像"} className="my-list">
          <ImagePicker
            files={files}
            selectable={files.length < 9}
            multiple={true}
          />
        </List>
        <List renderHeader={() => "房屋配套"} className="my-list">
          <HouseMatch />
        </List>
        <List renderHeader={() => "房屋描述"} className="my-list">
          <TextareaItem rows={5} placeholder="请输入房屋描述" />
        </List>
        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel}>取消</Flex.Item>
          <Flex.Item className={styles.confirm}>提交</Flex.Item>
        </Flex>
      </div>
    );
  }
}
const mapStateToprops =({searchs:{CommunityName}})=>{
  return {
    CommunityName
  }
}
const mapDispatchToprops =(dispatch)=>{
  return bindActionCreators(searchActionCreator,dispatch)
}
export default connect(mapStateToprops,mapDispatchToprops)(RentAdd);