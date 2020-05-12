import { SEARCH_VALUE } from '../actionTypes/filterActionType'

// 初始化search仓库数据
let initeStateTow = {
  CommunityName: {communityName:'',community:''}, // 小区名称
  price: '',// 租金
  size:'' ,// 房屋平方
  roomType:'', // 户型
  supporting:'' ,// 房屋配套
  floor:'',// 所在楼层
  oriented:''// 朝向
}
export default (state = initeStateTow, action) => {
  switch (action.type) {
    case SEARCH_VALUE:
      const newState = JSON.parse(JSON.stringify(state))
      newState.CommunityName = action.payload
      return newState
    default:
      return state
  }
}
