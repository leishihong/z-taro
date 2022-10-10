export default defineAppConfig({
  pages: [
    "pages/circle/index",
    "pages/index/index",
    "pages/follow/index",
    "pages/mine/index",
    "pages/webview/index",
    "pages/login/index"
  ],
  subpackages: [
    {
      root: "pagesUser",
      pages: ["pages/code-login/index"]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: "#f9fafc"
  },
  tabBar: {
    color: "#0C0D0D",
    selectedColor: "#00B4C4",
    backgroundColor: "#fff",
    list: [
      {
        text: "圈子",
        pagePath: "pages/circle/index",
        iconPath: "assets/image/eb36b645c7650247.png",
        selectedIconPath: "assets/image/9556679d3d47527c.png"
      },
      {
        text: "社团活动",
        pagePath: "pages/index/index",
        iconPath: "assets/image/eb36b645c7650247.png",
        selectedIconPath: "assets/image/9556679d3d47527c.png"
      },
      {
        text: "关注",
        pagePath: "pages/follow/index",
        iconPath: "assets/image/eb36b645c7650247.png",
        selectedIconPath: "assets/image/9556679d3d47527c.png"
      },
      {
        text: "我的",
        pagePath: "pages/mine/index",
        iconPath: "assets/image/eb36b645c7650247.png",
        selectedIconPath: "assets/image/9556679d3d47527c.png"
      }
    ]
  },
})
