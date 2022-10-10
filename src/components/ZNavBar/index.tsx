import { FC, memo, CSSProperties } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import cls from "classnames";
import Back from "./assets/back.png";
import Home from "./assets/home.png";
import styles from "./index.module.scss";

interface IProps {
  title: string;
  styleBar?: CSSProperties;
  showBack?: boolean;
  showHome?: boolean;
  navBarBackCls?: string;
  navBarHomeCls?: string;
  isImmersive?: boolean; // 是否沉浸式
}

const prefixCls = "z-nav-bar";

const ZNavBar: FC<IProps> = props => {
  const {
    title,
    styleBar,
    showBack,
    showHome,
    navBarBackCls,
    navBarHomeCls,
    isImmersive = false
  } = props;
  const system: any = Taro.getSystemInfoSync();

  const style = {
    // 顶部导航高度 = 状态栏的高度 + navbar
    height: Taro.pxTransform(system.statusBarHeight * 2 + 88)
  };
  let navbarStyle: any = {
    paddingTop: Taro.pxTransform(system.statusBarHeight * 2),
    position: isImmersive ? "relative" : "fixed"
  };
  if (styleBar) {
    navbarStyle = Object.assign({}, { ...styleBar }, navbarStyle);
  }

  const handleClickBack = () => {
    Taro.navigateBack();
  };
  const handleClickHome = () => {
    Taro.switchTab({
      url: "/pages/circle/index"
    });
  };
console.log(navbarStyle,'navbarStyle')
  return (
    <View className={styles[`${prefixCls}-wrapper`]} style={style}>
      <View className={styles[prefixCls]} style={navbarStyle}>
        <View className={styles[`${prefixCls}__left`]}>
          {showBack && (
            <View
              className={styles[`${prefixCls}__icon-wrapper`]}
              onClick={handleClickBack}
            >
              <Image
                className={cls(styles[`${prefixCls}__icon`], navBarBackCls)}
                src={Back}
              />
            </View>
          )}
          {showHome && (
            <View
              className={styles[`${prefixCls}__icon-wrapper`]}
              onClick={handleClickHome}
            >
              <Image
                className={cls(styles[`${prefixCls}__icon`], navBarHomeCls)}
                src={Home}
              />
            </View>
          )}
        </View>
        <View className={styles[`${prefixCls}__title`]}>{title}</View>
        <View className={styles[`${prefixCls}__right`]} />
      </View>
    </View>
  );
};

export default memo(ZNavBar);
