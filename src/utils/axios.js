import axios from 'axios'
import {Component} from 'react'
import {BASE_URL} from './url' 

axios.defaults.baseURL = BASE_URL

Component.prototype.axios = axios
export {
  axios
}