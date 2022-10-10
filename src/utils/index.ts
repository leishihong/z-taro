import Taro from '@tarojs/taro'
/**
 *  滚动到页面顶部
 * @param title
 */
 export const pageScrollTo = (): void => {
  Taro.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  })
}
/**
 * 拨打电话
 * @param number 需要拨打的电话号码
 */
export const makePhoneCall = (number: string): void => {
  Taro.makePhoneCall({
    phoneNumber: number,
  })
}
/**
 * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
 */
 interface InterfacePreviewImage {
  urls: Array<string> // 需要预览的图片http链接列表
  current?: string // 当前显示图片的http链接
}
/**
 *
 * @param params
 */
export const previewImage = (params: InterfacePreviewImage): void => {
  Taro.previewImage(params)
}
/**
 *  计算两个经纬度之间的距离
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 */

 export const distance = (lat1: number, lng1: number, lat2: string, lng2: string): number => {
  const radLat1 = (lat1 * Math.PI) / 180.0
  const radLat2 = (Number(lat2) * Math.PI) / 180.0
  const a = radLat1 - radLat2
  const b = (lng1 * Math.PI) / 180.0 - (Number(lng2) * Math.PI) / 180.0
  let s =
    2 *
    Math.asin(
      Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2))
    )
  s = s * 6378.137 // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000
  return s
}
