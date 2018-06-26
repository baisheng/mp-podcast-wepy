/* eslint-disable func-call-spacing,no-unexpected-multiline,no-unused-vars,no-unused-vars */
import base from './base'

export default class Users extends base {
  /**
   * 获取作者信息
   * @param userId user_login
   * @returns {Promise.<*>}
   */
  static async detail (userId) {
    const url = `${this.baseUrl}/users/login:${userId}`
    const data = await this.get(url)
    return data
  }

  /**
   * 我喜欢的
   * @param userId
   * @returns {Promise.<*>}
   */
  static async iLiked (userId) {
    const url = `${this.baseUrl}/me/likes`
    const data = await this.get(url)
    return data
  }

  /**
   * 获取个人信息
   * @returns {Promise.<void>}
   */
  static async me () {
    const url = `${this.baseUrl}/me`
    const data = await this.get(url)
    return data
  }
}
