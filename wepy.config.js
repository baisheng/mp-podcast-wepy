/* eslint-disable padded-blocks */
const path = require('path')
const prod = process.env.NODE_ENV === 'production'
module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  eslint: true,
  compilers: {
    less: {
      compress: true
    },
    sass: {
      indentSyntax: true,
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'es2015',
        'stage-1'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
    'replace': {
      filter: /moment\.js$/,
      config: {
        find: /([\w\[\]a-d\.]+)\s*instanceof Function/g,
        replace: function (matchs, word) {
          return ' typeof ' + word + " ==='function' "
        }
      }
    }
  }
}

if (prod) {

  delete module.exports.compilers.babel.sourcesMap
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
