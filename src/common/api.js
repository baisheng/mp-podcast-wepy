import wepy from 'wepy'
import global from './global'
export default {
  getUserInfo () {
    return new Promise((resolve, reject) => {
      let cache = global.getUserInfo()
      if (cache) {
        resolve(cache)
      } else {
        wepy.login().then((res) => {
          wepy.getUserInfo().then((res) => {
            console.log('getUserInfo success')
            console.log(res)
            global.setUserInfo(res.userInfo)
            resolve(res.userInfo)
          }).catch(reject)
        }).catch(reject)
      }
    })
  }
}
