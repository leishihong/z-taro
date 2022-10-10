import Taro from "@tarojs/taro";
import logger from "utils/logger";

export default {
  namespace: "login",
  state: {
    isNewUser: false,
    isAgreement: false
  },
  effects: {
    *handleLogin({ payload }, {  }) {
      try {
        Taro.showLoading({title:'登录中'})
        //TODO: 登录信息
        console.log(payload,'payload---')
        Taro.showLoading({title:'登录成功'})
      } catch (error) {
        Taro.showToast({ title: error?.message, icon: "none" });
        logger.error(
          `Logger::login:model ->[] *login[/wap/user/bind_phone_applet] -> e `,
          { error: error }
        );
      } finally {
        Taro.hideLoading()
      }
    }
  },
  reducers: {
    setValue(state, { payload: data }) {
      return { ...state, ...data };
    },
    setPhone(state, { payload: data }) {
      return { ...state, ...data };
    },
    setCode(state, { payload: data }) {
      return { ...state, ...data };
    },
    setBtnText(state, { payload: data }) {
      return { ...state, ...data };
    },
    setTime(state, { payload: data }) {
      return { ...state, ...data };
    },
    setValid(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
};
