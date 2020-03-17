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
  },
  isSearch:false
  // houseList:null
}

export default (state = initeState, action) => {
  switch(action.type) {
    case SET_FILTER_DATA:
      // 深拷贝一份state数据
      const newState1 = JSON.parse(JSON.stringify(state))
      newState1.filterData = action.payload
      newState1.isSearch = false
      return newState1
    case SET_VALUE:
      // 深拷贝一份state数据
      const newState5 = JSON.parse(JSON.stringify(state))
      newState5.selectValue[action.open] = action.payload
      newState5.isSearch = true
      let type = action.open
      if (type === 'area') {
        newState5.selectTitleValue['area'] = newState5.selectValue['area'].length > 2
      } else if (type === 'mode' || type === 'price') {
        newState5.selectTitleValue[type] = newState5.selectValue[type][0] !== 'null'
      } else if (type === 'more') {
        newState5.selectTitleValue['more'] = newState5.selectValue['more'].length > 0
      }
      
      return newState5

    case SET_OPEN_TYPE:
      // 深拷贝一份state数据
      const newState2 = JSON.parse(JSON.stringify(state))
      newState2.openType = action.payload
      newState2.isSearch = false
      // 处理高亮状态
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
      newState3.isSearch = false
      return newState3
  
    //   // 处理房屋
    // case SET_HOUSE_LIST:
    //   // 深拷贝一份state数据
    //   const newState7= JSON.parse(JSON.stringify(state))
    //   newState7.houseList = action.payload
    //   return newState7

    default:
      return state
  }
}
