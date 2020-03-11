import { SET_FILTER_DATA } from '../actionTypes/filterActionType'

// 初始化仓库
const initeState = {
  filterData: {} // FilterPicker与FilterMore展示需要的数据
}

export default (state = initeState, action) => {
  switch(action.type) {
    case SET_FILTER_DATA:
      // 深拷贝一份state数据
      const newState1 = JSON.parse(JSON.stringify(action.payload))
      return newState1
      default:
        return state
  }
}
