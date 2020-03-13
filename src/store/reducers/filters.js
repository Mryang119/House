import { SET_FILTER_DATA, SET_OPEN_TYPE,SET_SELECT_TITLE_VALUE,SET_VALUE} from '../actionTypes/filterActionType'

// 初始化仓库
const initeState = {
  filterData: {}, // FilterPicker与FilterMore展示需要的数据
  openType:'',
  selectTitleValue: { // 选中的标题
    area: false, // 区域
    mode: false, // 方式
    price: false, // 租金
    more: false // 筛选
  },
  selectValue:{
    area:['area','null'],
    mode:['null'],
    price:['null'],
    more:[] //筛选
  }
}

export default (state = initeState, action) => {
  switch(action.type) {
    case SET_FILTER_DATA:
      // 深拷贝一份state数据
      const newState1 = JSON.parse(JSON.stringify(state))
      newState1.filterData = action.payload
      return newState1
    case SET_VALUE:
      // 深拷贝一份state数据
      const newState5 = JSON.parse(JSON.stringify(state))
      newState5.selectValue[newState5.openType] = action.payload
      
      return newState5

    case SET_OPEN_TYPE:
      // 深拷贝一份state数据
      const newState2 = JSON.parse(JSON.stringify(state))
      newState2.openType = action.payload
      Object.keys(newState2.selectTitleValue).forEach(type => {
        if (type === 'area') {
            newState2.selectTitleValue['area'] = newState2.selectValue['area'].length > 2
        } else if (type === 'mode' || type === 'price') {
            newState2.selectTitleValue[type] = newState2.selectValue[type][0] !== 'null'
        } else if (type === 'more') {
            newState2.selectTitleValue['more'] = newState2.selectValue['more'].length > 0
        }
    })
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
