import { combineReducers } from 'redux'

// 导入子reducer
import filters from './filters'
import searchs from './searchs'

export default combineReducers({
    filters,
    searchs
})