import { SET_FILTER_DATA, SET_OPEN_TYPE,SET_SELECT_TITLE_VALUE} from '../actionTypes/filterActionType'

// 初始化仓库
const initeState = {
  filterData: {}, // FilterPicker与FilterMore展示需要的数据
  openType:'',
  selectTitleValue: { // 选中的标题
    area: false, // 区域
    mode: false, // 方式
    price: false, // 租金
    more: false // 筛选
  }
}

export default (state = initeState, action) => {
  switch(action.type) {
    case SET_FILTER_DATA:
      // 深拷贝一份state数据
      const newState1 = JSON.parse(JSON.stringify(state))
      newState1.filterData = action.payload
      return newState1

    case SET_OPEN_TYPE:
      // 深拷贝一份state数据
      const newState2 = JSON.parse(JSON.stringify(state))
      newState2.openType = action.payload
      return newState2
    case SET_SELECT_TITLE_VALUE:
      // 深拷贝一份state数据
      const newState3 = JSON.parse(JSON.stringify(state))
      newState3.selectTitleValue = {...newState3.selectTitleValue,...action.payload}
      return newState3
    case SET_FILTER_DATA:
      // 深拷贝一份state数据
      const newState4 = JSON.parse(JSON.stringify(state))
      newState4.filterData = {...newState4.action.payload}
      return newState4

    default:
      return state
  }
}
