import Taro from "@tarojs/taro";
import logger from "utils/logger";
import { fetchLoginVerifyCode } from "api/login";

interface IState {
  phoneNumber: string;
  verifyCode: String;
}
export default {
  namespace: "codeLoginPhone",
  state: {
    phoneNumber: "",
    verifyCode: "",
    phoneValid: false,
    codeValid: false
  },
  effects: {
    *sendVerifyCode({}, { select }): Generator<any, void, unknown> {
      try {
        const params = yield select(({ codeLoginPhone }) => {
          return { phone: codeLoginPhone.phoneNumber };
        });
        yield fetchLoginVerifyCode(params);
      } catch (error) {
        console.log("error:", error);
        Taro.showToast({ title: error?.message, icon: "none" });
        logger.error(
          `Logger::codeLoginPhone:model ->[] *send[/wap/user/send_validate_code] -> e `,
          { error: error }
        );
      }
    }
  },
  reducers: {
    setValue(state: IState, { payload: data }) {
      return { ...state, ...data };
    },
    setPhone(state: IState, { payload: data }) {
      return { ...state, ...data };
    },
    setCode(state: IState, { payload: data }) {
      return { ...state, ...data };
    },
    setBtnText(state: IState, { payload: data }) {
      return { ...state, ...data };
    },
    setTime(state: IState, { payload: data }) {
      return { ...state, ...data };
    },
    setValid(state: IState, { payload: data }) {
      return { ...state, ...data };
    }
  }
};
