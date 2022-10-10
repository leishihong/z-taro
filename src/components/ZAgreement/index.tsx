import { FC, memo, useState } from "react";
import { View, Text } from "@tarojs/components";
import { Checkbox } from "@taroify/core";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";

const prefixCls = "z-agreement";

const ZAgreement: FC = () => {
  const dispatch = useDispatch();
  const {isAgreement} = useSelector(({ login }) => login);

  const handleChange = (event: boolean) => {
    dispatch({type:'login/setValue',payload:{isAgreement:event}})
  };
  //TODO: 打开协议webview
  const handleAgreement = () => {};

  return (
    <View className={styles[prefixCls]}>
      <Checkbox
        className={styles[`${prefixCls}-radio`]}
        size={20}
        checked={isAgreement}
        onChange={handleChange}
      />
      <View className={styles[`${prefixCls}-content`]}>
        我已阅读并接受
        <Text
          className={styles[`${prefixCls}-content__text`]}
          onClick={handleAgreement}
        >
          《用户协议》
        </Text>
        与
        <Text
          className={styles[`${prefixCls}-content__text`]}
          onClick={handleAgreement}
        >
          《注册协议》
        </Text>
      </View>
    </View>
  );
};

export default memo(ZAgreement);
