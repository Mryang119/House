import {
  SET_OPEN_TYPE,
  SET_SELECT_TITLE_VALUE,
  SET_FILTER_DATA,
  SET_VALUE,
  SET_HOUSE_LIST
} from '../actionTypes/filterActionType'
import { axios } from '../../utils/axios'
import { getCurrencity } from '../../utils/city'
/**
 * 同步的action
 * @param {*} data  'area'、'mode'、'price'、'more'
 * 直接返回对象，是同步的
 */
export const setOpenType = data => {
  return {
    type: SET_OPEN_TYPE,
    payload: data
  }
}
export const setValue = (data,openType) => {
  return {
    type: SET_VALUE,
    payload: data,
    open:openType
  }
}
export const setSelectTitleValue = data => {
  return {
    type: SET_SELECT_TITLE_VALUE,
    payload: data
  }
}

export const setFilterData = data => {
  return {
    type: SET_FILTER_DATA,
    payload: data
  }
}
export const toggleSelect = data => {
  return {
    type: SET_FILTER_DATA,
    payload: data
  }
}

/**
 * 异步的action
 * 异步的action返回箭头函数
 * 发请求请求Filter需要的数据，然后保存到仓库中(触发同步action)
 */
export const asyncSetFilterData = () => {
  return async diaptch => {
    // 拿到定位城市的id
    const { value } = await getCurrencity()

    const result = await axios.get('/houses/condition', {
      params: {
        id: value
      }
    })

    // 异步action一定要触发同步的action才能把数据保存到仓库中
    diaptch(setFilterData(result.data.body))
  }
}
// // 异步action
// export const asyncSetHoseList = () => {
//   return async diaptch => {
//     // 拿到定位城市的id
//     const { value } = await getCurrencity()

//     const result = await axios.get('/houses', {
//       params: {
//         cityId: value
//       }
//     })
//     // 异步action一定要触发同步的action才能把数据保存到仓库中
//     diaptch(setHouseData(result.data.body))
//   }
// }
// // 配合异步的同步action
// export const setHouseData = data => {
//   return {
//     type: SET_HOUSE_LIST,
//     payload: data
//   }
// }