// const env = process.env.NODE_ENV // 'development' or 'production'
const isProdMode = Object.is(process.env.NODE_ENV , 'production')
// ENV
exports = {
  baseURL: isProdMode ? 'https://api.picker.cc' : 'http://api.picker.la',
  socketHost: isProdMode ? 'https://picker.cc' : 'http://localhost:5000'
}
