const HKZF_TOKEN = 'hkzf-token'

// 保存token
const setToken = token => {
    localStorage.setItem(HKZF_TOKEN,token)
}

// 取出token
const getToken = () => {
    return localStorage.getItem(HKZF_TOKEN)
}


// 删除token

const removeToken = ()=>{
    return localStorage.removeItem('HKZF_TOKEN')
}



// 判断是否登录了
const isLogin = () => {
    const token = getToken()
    
    if (token) {
        return true
    } else {
        return false
    }
}

export {setToken,getToken,isLogin,removeToken}