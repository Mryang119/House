import {axios} from './axios'
// 一开始先获取定位信息
const getCity = ()=>{
  return window.localStorage.getItem('city')
}

// 保存定位信息
const setCity = city=>{
  window.localStorage.setItem('city',JSON.stringify(city))
}
const BMap = window.BMap
const getCurrencity = async ()=>{
  const city = getCity()
  if(city) {
    return Promise.resolve(JSON.parse(getCity()))
  } else {
    return new Promise((resolve,reject)=>{
      // 调用百度地图获取定位api获取经纬度and城市名
      var myCity = new BMap.LocalCity()
      // 得到百度对象调用它的get方法得到一个返回result,这个就是城市名加经纬度信息
      myCity.get(async result=>{
        const res = await axios.get(`/area/info?name=${result.name}`)
        // 吧结果缓存一下
        setCity(res.data.body)
        resolve(res.data.body)
      })
    })
  }
}
export {
  getCurrencity
}
