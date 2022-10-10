import { FC, memo, ReactNode } from "react";
import { ConfigProvider } from "@taroify/core";

interface IProps {
  children: ReactNode;
  theme?: { [key: string]: any };
}
const defaultTheme = {
  rateIconFullColor: "#07c160",
  sliderTrackHeight: "4px",
  sliderButtonWidth: "20px",
  sliderButtonHeight: "20px",
  sliderActiveBackgroundColor: "#07c160",
  buttonPrimaryBorderColor: "#07c160",
  buttonPrimaryBackgroundColor: "#07c160"
};

const ZVantProvider: FC<IProps> = props => {
  const { children, theme } = props;
  const vantTheme = Object.assign({}, defaultTheme, theme);
  return <ConfigProvider theme={vantTheme}> {children}</ConfigProvider>;
};

export default memo(ZVantProvider);
