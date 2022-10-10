import { useState, useEffect, FC, Fragment, useCallback } from "react";
import { View, Image, Text } from "@tarojs/components";
import Taro, { showModal, showToast } from "@tarojs/taro";
import { Button } from "@taroify/core";

import styles from "./index/module.scss";

const Mime: FC = () => {
  const handleLogout = useCallback(() => {
    showModal({
      content: "退出后不会删除历史数据,下次登录依然可以使用本账号",
      confirmText: "确定登录",
      success: () => {
        showToast({ title: "退出成功", icon: "success" });
      }
    });
  }, [showModal, showToast]);

  return (
    <View>
      <Button block variant="outlined" color="primary" onClick={handleLogout}>
        退出登录
      </Button>
    </View>
  );
};
export default Mime;
