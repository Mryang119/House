import {SEARCH_VALUE} from '../actionTypes/filterActionType'

// 初始化search仓库数据
let initeStateTow = {
  CommunityName:'111'
}
export default (state = initeStateTow,action) => {
  switch(action.type) {
    case SEARCH_VALUE:
      const newState = JSON.parse(JSON.stringify(state))
      newState.CommunityName = action.payload
      return newState
    default:
    return state
  }
}