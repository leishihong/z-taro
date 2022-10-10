const { resolve } = require("path");

const pathResolve = fileName => resolve(__dirname, "..", fileName);

const config = {
  projectName: 'z-taro',
  date: '2022-10-10',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: process.env.TARO_ENV === "h5" ? "dist-h5" : "dist",
  plugins: [["@tarojs/plugin-framework-react", { reactMode: "concurrent" }]],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  alias: {
    api: pathResolve("src/api"),
    components: pathResolve("src/components"),
    assets: pathResolve("src/assets"),
    pages: pathResolve("src/pages"),
    utils: pathResolve("src/utils"),
    store: pathResolve("src/store"),
    libs: pathResolve("src/libs"),
    styles: pathResolve("src/styles")
  },
  mini: {
    enableExtract:true,
    miniCssExtractPluginOption: {
      //忽略css文件引入顺序
      ignoreOrder: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    router: {
      mode: "browser",
      customRoutes: {
        "/pages/index/index": "/index",
        "/pages/circle/index": "/circle",
        "/pages/follow/index": "/follow",
        "/pages/login/index": "/login",
        "/pages/mine/index": "/mine",
        "/pagesUser/pages/code-login/index": "/code-login"
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
