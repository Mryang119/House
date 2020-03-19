import {SEARCH_VALUE} from '../actionTypes/filterActionType'
// 更改小区
export const SetCommuniyName = data => {
  return {
    type: SEARCH_VALUE,
    payload: data
  }
}