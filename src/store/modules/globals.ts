export default {
  namespace: "globals",
  state: {
    // 登录之后，页面回调信息
    callback: {
      type: "", // 回调类型：tab,webview,page
      url: "", // 回调地址
      query: {} // 回调参数
    },
    // 用户全局位置
    location: {
      lat: 0,
      lng: 0
    },
    // 系统信息
    system: {},
    // 网络状况
    networkInfo: {},
    // 通过定位获取的 address
    address: {},
    // accessToken
    accessToken: "",
    // 保存openid的密钥
    secret: ""
  },
  effects: {},
  reducers: {
    setNetworkInfo(state, { payload }) {
      console.log(state, payload, "payload---");
      return { ...state, ...payload };
    },
    setSystem(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
