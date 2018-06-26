// ENV
const env = 'production' // 'development' or 'production'
// const isProdMode = Object.is(process.env.NODE_ENV , 'production')

// WXAPP VERSION
const version = 1.0

// development and production host
const hosts = {
  development: 'http://api.picker.la/v1',
  production: 'https://api.picker.cc/v1'
}

const basic_token = 'Basic token='
const PICKER_APPID = 'S11SeYT2W'
const APP_API = `/app/${PICKER_APPID}`
// apis
const api = {
  user: {
    login: {
      method: 'POST',
      url: `${APP_API}/wxlogin`,
      headers: {}
    }
  },
  common: {
    get: {
      method: 'GET',
      url: `${APP_API}/posts`,
      data: {}
    },
    options: {
      method: 'GET',
      url: `${APP_API}/options?key=_wxapp`
    },
    sticky: {
      method: 'GET',
      url: `${APP_API}/posts`
    },
    list: {
      method: 'GET',
      url: `${APP_API}/posts?term=category`
    },
    recommend: {
      method: 'GET',
      url: `${APP_API}/posts`
    }
  }

}

module.exports = {
  env,
  version,
  api: disposeUrl(api, hosts[env])
}

function disposeUrl(obj, prefix) {
  Object.keys(obj).forEach(v => {
    if (obj[v].url) {
      obj[v].url = prefix + obj[v].url
    } else {
      obj[v] = disposeUrl(obj[v], prefix)
    }
  })
  // console.log(JSON.stringify(obj))
  return obj
}
