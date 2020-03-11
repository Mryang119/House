import { createStore, applyMiddleware,compose } from 'redux'

import thunk from 'redux-thunk';

// 导入根reducer 根reducer就包含各个子的reducer
import rootReducer from './reducers'

// 如果使用了中间件之后，还想在Google浏览器中看到数据
// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

export default store