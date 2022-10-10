import Taro from "@tarojs/taro";
import { parse } from "query-string";
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = (): any => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};

/**
 * @description 获取url参数;
 * @return {*}
 */
export const getRouterParams = () => {
  const routerParams: any = Taro.getCurrentInstance().router?.params;
  return parse(routerParams);
};
/**
 * TODO: 先满足使用，后期需要完善
 * 根据URL字符串参数，反解析乘对象
 * ?name=Modeest&age=20&sex=1 => {name:'Modeest',age:20,sex:1}
 * @param params
 */
export const parseQuery = (url: string) => parse(url.split("?")[0]);

export const pageToLogin = () => {
  let path = getCurrentPageUrl();
  Taro.clearStorage();
  if (!path.includes("login")) {
    Taro.reLaunch({
      url: "/pages/login/index"
    });
  }
};
/**
 * @description: 获取设备权限
 * @param {string} scope 需要获取权限的 scope
 * @return: Promise<boolean>
 */
export const getAuthSetting = (scope: string): Promise<boolean> => {
  return new Promise(resolve => {
    return Taro.authorize({
      scope
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

/**
 * @description: 保存图片到系统相册
 * @param {string} imgUrl 图片url
 * @return: Promise<boolean>
 */
export const saveImageToPhotosAlbum = (imgUrl: string): Promise<boolean> => {
  return new Promise((resolve, rejecet) => {
    return Taro.saveImageToPhotosAlbum({ filePath: imgUrl })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        rejecet(false);
      });
  });
};

/**
 * 获取storage的数据
 */
export const getStorage = async key => {
  try {
    const storage = await Taro.getStorage({ key });
    return storage.data;
  } catch (e) {
    console.log(`storage不存在${key}`);
    return null;
  }
};
/**
 * 功能：跳转到webview页面
 * 注意：默认需要权限，也就是需要 真实token 换取 临时token
 */
//  export const goWebview = async ({ url, query = {}, webviewType = 'navigate' }) => {
//   try {
//       const city = store.getState().root.currentCity || {};
//       // 获取webview独有的数据
//       const data = { city_id: city.city_id, city_name: city.city_name, timestamp: Date.now() };

//       const accessToken = store.getState().root.accessToken;
//       if (accessToken) {
//           const res = await api.getTempToken();
//           data['temp_token'] = res.temp_token;

//           // 如果有学员信息，将学员信息一起带给微信公众号
//           const student = store.getState().root.student || {};
//           if (student.doing_student_id) {
//               data['doing_student_id'] = student.doing_student_id;
//               // 因为H5接收的字段可能会有不一样也为了与原声保持一致 新增统一参数名student_id
//               data['student_id'] = student.doing_student_id;
//           }
//       }
//       let oldUrl = getStringifyUrl(url).url;
//       let oldUrlQuery = getStringifyUrl(url).query;
//       // 获取小程序公参
//       let webviewComQuery = await webviewCommonQuery(query);
//       const newUrl = oldUrl + stringifyQuery({ ...query, ...data, ...oldUrlQuery, weappQuery: webviewComQuery }, oldUrl) + '#wechat_redirect';
//       store.dispatch({ type: 'webview/setUrl', payload: { url: newUrl } })

//       // console.error('webviewType:', webviewType);
//       if (webviewType === 'redirect') {
//           Taro.redirectTo({ url: '/pages/webview/index' });
//       } else {
//           Taro.navigateTo({ url: '/pages/webview/index' });
//       }
//   } catch (e) {
//       console.error("TCL: goWebview -> e", e)
//       Taro.showToast({ title: '获取临时token失败，请稍后再试', icon: 'none' });
//   }
// }
// 检验是否是http地址
export const isHttpUrl = (url:string) => /^http/.test(url)
/**
 * 获取当前页面的地址以及是什么类型的页面
 * @returns
 */
export const getCurrentPage = () => {
  let pages = Taro.getCurrentPages();
  let currPage = null as any;
  if (pages.length) {
      currPage = pages[pages.length - 1];
  }
  let route = '/' + currPage.route
  let reg = /(\/circle\/)|(\/follow\/)|(\/club-activity\/)|(\/mine\/)/
  let type = "page"
  if (isHttpUrl(route)) {
      type = 'webview'
  } else if (reg.test(route)) {
      type = 'tab'
  };
  return { route: route, type: type }
}
