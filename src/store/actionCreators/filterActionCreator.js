/**
 * 同步的action
 * @param {*} data  'area'、'mode'、'price'、'more'
 * 直接返回对象，是同步的
 */
import {SET_OPEN_TYPE,SET_SELECT_TITLE_VALUE} from '../actionTypes/filterActionType'
export const setOpenType = data => {
  return {
      type: SET_OPEN_TYPE,
      payload: data
  }
}
export const setSelectTitleValue = data => {
  return {
      type: SET_SELECT_TITLE_VALUE,
      payload: data
  }
}