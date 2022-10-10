import Taro from "@tarojs/taro";

const postCache = async function(val) {
  console.log("000000000000000", val);
  // await store.dispatch(val)
  // return
};
const setCache = (key = "1", value) => {
  let params = { key, value };
  let data = Object.assign(params, { startTime: new Date().getTime() });
  // 记录何时将值存入缓存，毫秒级
  // Taro.setStorageSync(key, data);
  Taro.setStorage({ key: key, data: data });
};
const cleanCache = key => {
  Taro.removeStorageSync(key);
};
/*
 *接口本地缓存：取缓存的数据
 **/
const getCache = key => {
  console.log("0e0e0e0ee0e0wee", key);
  let item = Taro.getStorageSync(key);
  if (!item) {
    // 缓存的值不存在返回
    return false;
  }
  console.log("look", item);
  return item;
};
/*
 *本地缓存：判断是否过期及空间不够
 **/
const isCanUseCache = (key, time, size) => {
  let getCacheTime = time || new Date().getTime();
  let getCacheSize = size || Taro.getStorageInfoSync().currentSize;
  let getCacheLimitSize = Taro.getStorageInfoSync().limitSize;
  let cacheTime = 1000000000; // 过期时间1000000000天
  let countTime = 86400000; //(1000*60*60*24)
  // 1568044800000   ||  Taro.getStorageSync('cacheIdxDatas').startTime
  let canUseCache =
    (getCacheTime - Taro.getStorageSync("cacheIdxDatas").startTime) /
      countTime <
      cacheTime && getCacheLimitSize - getCacheSize > 0;
  if (canUseCache) {
    //缓存未超过1天且可使用
    console.log("utils有可用缓存");
    return getCache(key); // 取缓存内的数据返回到页面
  } else {
    cleanCache(key);
  }
};
/** 本地缓存:判断是否有缓存：有使用，无发请求
 **/
const isHaveCache = (key, postParams, callback, cleanCache = "") => {
  let getTime = new Date().getTime(),
    getSize = Taro.getStorageInfoSync().currentSize;
  console.log("2233333", cleanCache == "cleanCache");
  let cCache = cleanCache == "cleanCache" || false;
  if (isCanUseCache(key, getTime, getSize) && !cCache) {
    // cache-如果存在可用缓存数据
    console.log("22222存在缓存数据");
    callback();
    postCache(postParams).then(() => {});
  } else {
    // cache-如果不存在缓存数据
    console.log("333333不存在缓存数据");
    postCache(postParams).then(() => {
      console.log("......zous");
      console.log(
        "%c isHaveCache -> callback",
        "color: red; background: yellow; font-size: 20px;",
        callback
      );

      callback();
    });
  }
};
export default {
  postCache: postCache,
  setCache: setCache,
  getCache: getCache,
  cleanCache: cleanCache,
  isCanUseCache: isCanUseCache,
  isHaveCache: isHaveCache
};
