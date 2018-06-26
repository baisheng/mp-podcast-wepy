import wepy from 'wepy'
export default class REST {
  constructor() {
    /**
     * 接口基础地址
     * @type {string}
     */
    this.baseURL = ''

    /**
     * 接口版本
     * @type {string}
     */
    this.version = ''

    /**
     * 接口路径
     * @type {string}
     */
    this.path = ''

    /**
     * Headers
     *
     * @type {Object}
     */
    this.headers = {}

    /**
     * 统一错误处理
     * @type {Function}
     */
    this.errorHandler = () => {
    }

    // 支持的请求方式
    const methods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']

    // 注册方法到 this
    methods.forEach((method) => {
      this[method] = options => this._request(method, options)
    })
  }

  _request(method = 'GET', options = {}) {
    const {uri = '', params = null, data = null} = options
    let url = this.version ? `/${this.version}/${this.path}` : `/${this.path}`
    if (uri) {
      url = `${url}/${uri}`
    }
    // GET
    if (params) {
      url = url + this._objToUrl(params)
    }

    return new Promise((resolve, reject) => {
      wepy.request({
        baseURL: this.baseURL,
        headers: this.headers,
        method,
        url,
        data
      }).then((res) => {
        res && resolve(res)
      }).catch(this.errorHandler())
    })
  }
}
