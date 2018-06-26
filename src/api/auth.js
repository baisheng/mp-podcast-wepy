import base from './base'
import wepy from 'wepy'

export default class auth extends base {
  /**
   * 一键登录
   */
  static async login() {
    console.log('login.....')
    const _token = await this.getConfig('_token')
    console.log('get token' + _token)
    let res = null
    if (_token !== undefined && _token !== null && _token !== '') {
      try {
        res = await this.verifyToken(_token)
        if (res.verify === 'success') {
          console.log(JSON.stringify(res))
          return true
        } else {
          return false
        }
      } catch (e) {
        console.warn('check token fail', _token)
        await this.doLogin()
      }
    } else {
      console.warn('token not exists', _token)
      await this.doLogin()
    }
  }

  /**
   * 获取用户信息
   */
  static async user(param = {block: false, redirect: false}, userInfo) {
    try {
      // 检查
      if (this.hasConfig('user')) {
        return true
      }
      // 重新登录
      await this.login()
      // 获取用户信息
      const rawUser = userInfo !== undefined && userInfo !== null ? userInfo : await wepy.getUserInfo()
      // console.log(rawUser)
      // 检查是否通过 校验数据完整性
      await this.checkUserInfo(rawUser)
      // 解密信息
      const data = await this.decodeUserInfo(rawUser)
      // 保存登录信息
      await this.setConfig('user', JSON.stringify(data))
      return true
    } catch (error) {
      console.error('授权失败', error)
      if (param.block) {
        const url = `/pages/home/login?redirect=${param.redirect}`
        if (param.redirect) {
          wepy.redirectTo({url})
        } else {
          wepy.navigateTo({url})
        }
      }
      return false
    }
  }

  /**
   * 服务端检查数据完整性
   */
  static async checkUserInfo(rawUser) {
    const url = `${this.baseUrl}/auth/check`
    const param = {
      // action: 'check_user_info',
      rawData: rawUser.rawData,
      signature: rawUser.signature
      // thirdSession: this.getConfig('third_session'),
      // app_code: this.getShopCode()
    }
    return await this.post(url, param)
  }

  /**
   * 服务端解密用户信息
   */
  static async decodeUserInfo(rawUser) {
    const url = `${this.baseUrl}/auth/decode`
    const param = {
      // action: 'decode_userinfo',
      encryptedData: rawUser.encryptedData,
      iv: rawUser.iv
      // thirdSession: this.getConfig('third_session'),
      // app_code: this.getShopCode()
    }
    return await this.post(url, param)
  }

  /**
   * 执行登录操作
   */
  static async doLogin() {
    await this.removeConfig('_token')
    const {code} = await wepy.login()
    const {token} = await this.token(code)
    await this.setConfig('_token', token)
    console.log(token)
    // await this.setConfig('third_session', third_session);
    await this.login()
  }

  /**
   * 获取会话
   */
  static async token(jsCode) {
    // const appCode = wepy.$instance.globalData.app_code;
    const url = `${this.baseUrl}/auth/token?code=${jsCode}`
    return await this.get(url)
  }

  /**
   * 检查登录情况
   */
  static async verifyToken(token) {
    const url = `${this.baseUrl}/auth/verify`
    const data = await this.post(url, {
      // action: 'verify_token',
      token: token
    })
    return data
  }

  /**
   * 获取就用标识符
   */
  static getAppCode() {
    return wepy.$instance.globalData.app_code
  }

  /**
   * 设置权限值
   */
  static getConfig(key) {
    return wepy.$instance.globalData.auth[key]
  }

  /**
   * 检查是否存在权限制
   */
  static hasConfig(key) {
    const value = this.getConfig(key)
    return value !== undefined && value !== null && value !== ''
  }

  /**
   * 读取权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({key: key, data: value})
    wepy.$instance.globalData.auth[key] = value
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    wepy.$instance.globalData.auth[key] = null
    await wepy.removeStorage({key: key})
  }
}
