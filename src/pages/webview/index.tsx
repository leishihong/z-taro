import { FC, memo, useState, useEffect } from "react";
import {  WebView } from "@tarojs/components";
import { parseQuery } from "utils/utils";

const ZWebview: FC = () => {
  const [url]=useState<string>('')
  const handleMessage = async (e: any) => {
    console.log("TCL: Webview -> handleMessage -> e", e);
    // TODO: 此处只取第一个task任务
    const taskList = e.detail.data;
    const task = taskList.pop();
    // console.error("TCL: Webview -> handleMessage -> task", task)
    // 解析URL地址的参数
    if (task.callback) {
      const tmp: any = parseQuery(task.callback.url);
      // 融合传递过来的参数
      const query = { ...tmp.query, ...task.callback.query };
      // 回调跳转是否保存历史记录
      const webviewType = task.callback.webviewType || "page";
      console.log(query,webviewType)
      // 设置回调地址
      // setCallback({
      //   url: task.callback.url || tmp.url,
      //   query,
      //   type: task.callback.type,
      //   from: "h5",
      //   webviewType
      // });
    }
  };
  const handleLoad = () => {
    // console.log("TCL: Webview -> handleLoad -> e", e)
  };
  const handleError = () => {
    // console.log("TCL: Webview -> handleError -> e", e)
  };
  return (
    <WebView
      src={url}
      onMessage={handleMessage}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default memo(ZWebview);
