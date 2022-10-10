import { Component, PropsWithChildren } from "react";
import Taro from "@tarojs/taro";
// 此处必须使用 react-redux 否则报错
import { Provider } from "react-redux";
import store from "store/index";
import { getStorage } from "utils/utils";
import { ZVantProvider } from "components/index";
import logger from "utils/logger";

import "./app.scss";

class App extends Component<PropsWithChildren> {
  componentWillMount() {
    // Taro.checkSession({
    //   success() {
    //     //session_key 未过期，并且在本生命周期一直有效
    //     return Taro.getStorage({ key: "session3rd" });
    //   },
    //   fail() {
    //      // session_key 已经失效，需要重新执行登录流程
    //     return Taro.login()
    //       .then((response: any) => {
    //         return Taro.request({
    //           url: "后端接口"
    //           // code: response.code
    //         }).then((res: any) => {
    //           if (res.statusCode === 200) {
    //             Taro.setStorage({
    //               key: "session3rd",
    //               data: res.data.data.session3rd
    //             });
    //           } else if (res.status === 500) {
    //             Taro.showToast({
    //               title: "发生错误，请重试！",
    //               icon: "none"
    //             });
    //           }
    //         });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         Taro.showToast({
    //           title: "发生错误，请重试!",
    //           icon: "none"
    //         });
    //       });
    //   }
    // });
  }

  componentDidMount = async () => {
    const launchOptions = Taro.getLaunchOptionsSync() ?? {};
    let extraData =
      launchOptions &&
      launchOptions.referrerInfo &&
      Object.keys(launchOptions.referrerInfo).length !== 0
        ? launchOptions.referrerInfo.extraData
        : {};
    console.log("%c App -> componentDidMount -> extraData", extraData, store);
    if (extraData && Object.keys(extraData).length > 0) {
      let token = (await getStorage("accessToken")) ?? extraData?.accessToken;
      Taro.setStorage({ key: "accessToken", data: token });
    } else {
      extraData = {};
    }
    // 获取当前网络状态
    this.getNetWork();
    Taro.onNetworkStatusChange(res => {
      this.getNetWork();
    });
    // 获取系统信息
    const system = Taro.getSystemInfoSync();
    await store.dispatch({ type: "globals/setSystem", payload: { system } });
    // Taro.getSetting({
    //   success: function (res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       Taro.authorize({
    //         scope: 'scope.userInfo',
    //         success: function () {
    //           Taro.getUserProfile({
    //             desc:'用户授权，获取信息',
    //             success: function (userInfo){
    //               console.log(userInfo);
    //             }
    //           })
    //         }
    //       })
    //     };
    //   }
    // })
  };

  componentDidShow() {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });
    updateManager.onUpdateReady(function() {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          } else if (res.cancel) {
            // 用户点击取消,为了不骚扰用户，存储到store中
          }
        }
      });
    });
    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
      // 调用后台接口，获取提示语和升级方式
      Taro.showModal({
        title: "检测到新版本",
        content: "新版本已经上线啦~，请您重新打开小程序"
      });
    });
  }

  componentDidHide() {}
  // 获取网络类型
  getNetWork = () => {
    Taro.getNetworkType({
      success: async res => {
        if (res.networkType == "wifi") {
          await store.dispatch({
            type: "globals/setNetworkInfo",
            payload: { networkInfo: { isWiFi: true, isLine: true } }
          });
        } else if (res.networkType == "none") {
          await store.dispatch({
            type: "globals/setNetworkInfo",
            payload: { networkInfo: { isWiFi: false, isLine: false } }
          });
        } else {
          await store.dispatch({
            type: "globals/setNetworkInfo",
            payload: { networkInfo: { isWiFi: false, isLine: true } }
          });
        }
      }
    });
  };
  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        <ZVantProvider>{this.props.children}</ZVantProvider>
      </Provider>
    );
  }
}

export default App;
