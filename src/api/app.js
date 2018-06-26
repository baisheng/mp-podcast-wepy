import base from './base'
// import wepy from 'wepy';

export default class app extends base {

  /**
   * 获取应用配置
   */
  static async options() {
    const url = `${this.baseUrl}?key=_wxapp`
    return await this.get(url)
  }

  static async getSticky(id) {
    const url = `${this.baseUrl}/posts`
    return await this.get(url, {id: id})
  }
}
