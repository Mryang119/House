import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import {isLogin} from '../../utils/token'
function AuthRoute({component:Component,...rest}){
  return (
    <Route 
      {...rest}
      render={routeProps => {
        if(isLogin()){
          return <Component {...routeProps} />
        } else {// 未登录
          return <Redirect to={{pathname:'/login',state: {to: routeProps.location.pathname}
          }}/>
        }
      }}
    />
  )
}

export default AuthRoute;