import { FC, memo, useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Form, Button, Input, Toast, Cell, Field } from "@taroify/core";
import { useSelector, useDispatch } from "react-redux";
import { ZVantProvider, ZAgreement } from "components/index";
import { fetchLoginVerifyCode } from "api/login";
import logger from "utils/logger";

import styles from "./index.module.scss";

const prefixCls = "code-login";

let timeFun: NodeJS.Timer;

const CodeLogin: FC = () => {
  const dispatch = useDispatch();
  const codeLoginPhone = useSelector(({ codeLoginPhone }) => codeLoginPhone);
  const loginState = useSelector(({ login }) => login);
  const { phoneNumber, phoneValid, verifyCode, codeValid } = codeLoginPhone;
  const [btnTitle, setBtnTitle] = useState<string>("发送验证码");
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);

  useEffect(() => {
    clearInterval(timeFun);
    return () => {
      clearInterval(timeFun);
    };
  }, []);
  useEffect(() => {
    if (btnDisabled && time > 0 && time < 60) {
      setBtnTitle(`${time}s后重发`);
    } else {
      setBtnTitle("获取验证码");
      setBtnDisabled(false);
      setTime(60);
      clearInterval(timeFun);
    }
  }, [time]);
  const handleAgreementChange=e=>{

  }
  const sendVerifyCode = async () => {
    timeFun = setInterval(() => setTime(t => --t), 1000);
    setBtnDisabled(true);
    try {
      await fetchLoginVerifyCode({});
      Taro.showToast({ title: "验证码已发送", icon: "none" });
    } catch (error) {
      Taro.showToast({ title: error?.message || "发送失败", icon: "none" });
      console.log("error:", error);
    }
  };
  const handleSubmit = async value => {
    try {
      if (!phoneValid) {
        Taro.showToast({ title: "手机号无效", icon: "none" });
        return;
      }
      if (!codeValid) {
        Taro.showToast({ title: "验证码无效", icon: "none" });
        return;
      }
      let getUserInfo = await Taro.getUserInfo();
    } catch (error) {
      console.error("[code-login-index.tsx]:", error);
      Taro.showToast({ title: error?.message, icon: "none" });
      logger.error("Logger::codeLogin:index -> fn handleSubmit -> e", {
        error: error
      });
    }
    console.log(value, "value---");
  };

  return (
    <ZVantProvider>
      <View className={styles[prefixCls]}>
        <View className={styles[`${prefixCls}-title`]}>您好</View>
        <View className={styles[`${prefixCls}-subtitle`]}>
          欢迎来到，未注册过的手机号将自动创建账号
        </View>
        <Form onSubmit={handleSubmit}>
          <Toast id="toast" />
          <Cell.Group inset>
            <Form.Item
              name="phoneNumber"
              rules={[{ required: true, message: "请输入手机号" }]}
            >
              <Form.Label>手机号</Form.Label>
              <Form.Control>
                <Input placeholder="请输入手机号" />
              </Form.Control>
            </Form.Item>
            <Form.Item name="code">
              <Form.Label>验证码</Form.Label>
              <Form.Control>
                <Input maxlength={4} placeholder="请输入验证码" />
                <Button
                  size="small"
                  color="primary"
                  disabled={btnDisabled}
                  onClick={sendVerifyCode}
                >
                  {btnTitle}
                </Button>
              </Form.Control>
            </Form.Item>
          </Cell.Group>
          <View style={{ margin: "16px" }}>
            <Button
              shape="round"
              block
              color="primary"
              formType="submit"
              disabled={!phoneValid || !codeValid}
            >
              登录
            </Button>
            <ZAgreement />
          </View>
        </Form>
      </View>
    </ZVantProvider>
  );
};

export default memo(CodeLogin);
