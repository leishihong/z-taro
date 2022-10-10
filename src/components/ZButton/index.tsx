import { FC, memo, ReactNode } from "react";
import { Button } from "@tarojs/components";
import cs from 'classnames'
import styles from "./index.module.scss";

interface IProps {
  children?: ReactNode;
  formType?: "submit" | "reset";
  showMessageCard?: boolean;
  openType?:
    | "contact"
    | "share"
    | "getUserInfo"
    | "getPhoneNumber"
    | "launchApp"
    | "openSetting"
    | "feedback"
    | "getRealNameAuthInfo"
    | "chooseAvatar"
    | "getAuthorize"
    | "contactShare";
  [key: string]: any;
}
const ZButton: FC<IProps> = props => {
  const {
    children,
    formType,
    openType,
    style,
    sendMessageTitle,
    sessionFrom,
    sendMessagePath,
    sendMessageImg,
    showMessageCard = false,
    appParameter,
    onClick,
    onGetUserInfo,
    onGetPhoneNumber,
    onOpenSetting,
    onError,
    onContact,
    type,
    zBtnCs
  } = props;
  return (
    <Button
      className={cs(styles["z-button-page"],zBtnCs)}
      style={style}
      type={type}
      formType={formType}
      openType={openType}
      sessionFrom={sessionFrom}
      sendMessageTitle={sendMessageTitle}
      sendMessagePath={sendMessagePath}
      sendMessageImg={sendMessageImg}
      showMessageCard={showMessageCard}
      appParameter={appParameter}
      onClick={onClick}
      onGetUserInfo={onGetUserInfo}
      onGetPhoneNumber={onGetPhoneNumber}
      onOpenSetting={onOpenSetting}
      onError={onError}
      onContact={onContact}
    >
      {children}
    </Button>
  );
};
export default memo(ZButton);
