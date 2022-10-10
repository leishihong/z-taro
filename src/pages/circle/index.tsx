import React, { useState, useEffect, FC, memo } from "react";
import { View } from "@tarojs/components";
import {classnames} from 'utils/classnames'
import styles from "./index.module.scss";

const cx = classnames('circle-page',styles);

const Circle: FC = () => {
  return (
    <View className={cx('root')}>
      <View className={cx("container")}>圈子</View>
    </View>
  );
};
export default memo(Circle);
