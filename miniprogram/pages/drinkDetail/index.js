// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    tesList: [
      {
        appid: "wx4080846d0cec2fd5",
        imgUrl:
          "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/yihetang.jpg?sign=43de0978020b5fab5d0ae94aea24e142&t=1621524575",
        text: "益禾堂",
      },
      {
        appid: "wxe87f500c8cef4c8a",
        imgUrl:
          "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/yidiandian.jpg?sign=bbcc3975fb5497d50bd36912cc8921b0&t=1621525007",
        text: "一点点",
      },
      {
        appid: "wx696a42df4f2456d3",
        imgUrl:
          "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/xicha.jpg?sign=d4be4294223fd5c04c50d90a596484f5&t=1621525043",
        text: "喜茶",
      },
      {
        appid: "wx86839632e688080d",
        imgUrl:
          "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/mixuebincheng.jpg?sign=0a5b652f22c2008052b119173f494a45&t=1621525059",
        text: "蜜雪冰城",
      },
      {
        appid: "wx2c348cf579062e56",
        imgUrl:
          "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/meituan.jpg?sign=8b22918f9ad84f80dfab45bb59726d7d&t=1621525077",
        text: "美团",
      },
      {
        appid: "wxece3a9a4c82f58c9",
        imgUrl:
          "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/elm.jpg?sign=d5ea9959fbba0e004318312009728556&t=1621525096",
        text: "饿了么",
      },
      {
        appid: "wx5684949c56ea8164",
        imgUrl:
          "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/coco.jpg?sign=403ec04667b4a8ade70a2cb8fdf3379c&t=1621525108",
        text: "coco",
      },
      {
        appid: "wx18c78c487f565b32",
        imgUrl:
          "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/chabaidao.jpg?sign=29b19ad5601ba17cf17d214446a9fc42&t=1621525123",
        text: "茶百道",
      },
    ],
  },
  onLoad() {},
  toOther(event){
    wx.navigateToMiniProgram({
      appId: event.currentTarget.dataset.url,
      path: '',
      envVersion: 'release',// 打开正式版
      success(res) {
           // 打开成功
      },
      fail: function (err) {
        console.log(err);
      }
   })
  }
});
