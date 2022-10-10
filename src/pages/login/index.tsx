import { useState, useEffect, FC, Fragment } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Button, Toast } from "@taroify/core";
import { useUserInfo, useLogin } from "taro-hooks";
import { useSelector, useDispatch } from "react-redux";
import { ZButton, ZNavBar, ZVantProvider, ZAgreement } from "components/index";
import { fetchLogin } from "api/login";

import styles from "./index.module.scss";

const ZLogin: FC = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(({ login }) => login);
  const [phoneNumberInfo, setPhoneNumberInfo] = useState(Object);
  const [canGetUserInfo, setCanGetUserInfo] = useState<boolean>(() =>
    Taro.getStorageSync("canGetUserInfo")
  );
  const [userProfile, setUserProfile] = useState(Object);
  useEffect(() => {
    console.log(process.env.TARO_ENV, "BASE_URL", process.env);
    return () => {
      setPhoneNumberInfo(null);
    };
  }, []);

  //TODO:验证是否登录,进行自动登录的操作
  useEffect(() => {
    Taro.checkSession({
      success() {
        let code = Taro.getStorageSync("key");
        if (code) {
          handleGetUserInfo();
          Taro.switchTab({ url: "/pages/circle/index" });
        }
      },
      fail() {
        handleGetUserInfo();
      }
    });
  }, []);

  //TODO:未登录时,快捷登录操作
  const handleGetUserInfo = async (e?: any) => {
    console.log(e.detail, "event", e.detail.iv && e.detail.encryptedData);
    const userInfo = await Taro.getUserInfo();
    console.log(userInfo, "userInfo---");
    Taro.getUserInfo({
      success: function(res) {
        console.log(res, "---res");
        //存储等操作
        Taro.login({
          success: async res => {
            console.log(res, "存储等操作");
            //获取open_id和session_id
            // let code = await loginCode(res.code);
            // Taro.setStorageSync("key", code.data);
          }
        });
      },
      fail(res) {
        Taro.showToast({
          icon: "none",
          title: "请先授权登录"
        });
      }
    });
  };
  /**
   * @description 获取用户头型昵称、性别
   * @function getUserProfile
   * @subDescription 已经授权过不需要再次弹窗
   * @returns
   */
  const handleGetUserProfile = () => {
    if (!loginState.isAgreement) {
      Taro.showToast({ title: "请阅读并勾选用户协议", icon: "none" });
      return;
    }
    // let canGetUserInfo = Taro.getStorageSync("canGetUserInfo");
    if (canGetUserInfo) {
      const wxUserInfo = Taro.getStorageSync("wxUserInfo");
      console.log(wxUserInfo, "--wxUserInfo");
      return;
    }
    Taro.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别",
      success: res => {
        const { userInfo: wxUserInfo, encryptedData, iv, signature } = res;
        setUserProfile({ wxUserInfo, encryptedData, iv, signature });
        Taro.setStorage({ key: "canGetUserInfo", data: true });
        Taro.setStorage({ key: "wxUserInfo", data: wxUserInfo });
        setCanGetUserInfo(true);
        console.log("getUserProfile", wxUserInfo);
      },
      fail: error => {
        console.log(error, "error---");
        setCanGetUserInfo(false);
        Toast.fail("您拒绝了请求");
      }
    });
  };
  /**
   * @description 获取手机号码
   * @function getUserInfo
   * @function GetPhoneNumber
   * 1. 根据手机号码获取加密数据，并获取用户信息
   * 2. 将用户信息存储到redux中
   */
  const handleGetPhoneNumber = async ({ detail }) => {
    if (detail.iv && detail.encryptedData) {
      setPhoneNumberInfo({
        iv: detail.iv,
        encryptedData: detail.encryptedData
      });
      let { userInfo: taroUserInfo } = await Taro.getUserInfo();
      const payload = {
        iv: detail.iv,
        encryptedData: detail.encryptedData,
        nickName: taroUserInfo.nickName,
        avatarUrl: taroUserInfo.avatarUrl
      };
      dispatch({ type: "login/handleLogin", payload });
    } else {
      Taro.showToast({ title: "拒绝授权", icon: "none" });
    }
  };
  const handleGoPhoneLogin = () => {
    // getUserProfile({desc: "获取你的昵称、头像、地区及性别",}).then((res)=>{
    //   console.log(res,'--getUserProfile--')
    // })
    if (!loginState.isAgreement) {
      Taro.showToast({ title: "请阅读并勾选用户协议", icon: "none" });
      return;
    }
    Taro.navigateTo({ url: "/pagesUser/pages/code-login/index" });
  };

  return (
    <ZVantProvider>
      <View className={styles["z-login-page"]}>
        {canGetUserInfo ? (
          <ZButton
            type="primary"
            openType="getPhoneNumber"
            onGetPhoneNumber={handleGetPhoneNumber}
          >
            微信授权手机号
          </ZButton>
        ) : (
          <Button color="primary" shape="round" onClick={handleGetUserProfile}>
            微信用户快捷登录
          </Button>
        )}
        <ZButton
          block={true}
          type="primary"
          border={true}
          onClick={handleGoPhoneLogin}
        >
          手机号码登录/注册
        </ZButton>
        <ZAgreement />
      </View>
    </ZVantProvider>
  );
};
export default ZLogin;
