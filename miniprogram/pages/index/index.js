//index.js
const app = getApp();

Page({
  data: {
    isMuted: true,
    avatarUrl: "./user-unlogin.png",
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: "",
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse("open-data.type.userAvatarUrl"), // 如需尝试获取用户信息可改为false
    // danmuList: [
    //   {
    //     text: "饮茶先啦",
    //     color: "#fff",
    //     time: 1,
    //   },
    //   {
    //     text: "三点几啦",
    //     color: "#fff",
    //     time: 1,
    //   },
    //   {
    //     text: "饮宾果茶咧",
    //     color: "#fff",
    //     time: 1,
    //   },
    //   {
    //     text: "好久某嘿饮早茶啦",
    //     color: "#fff",
    //     time: 1,
    //   },
    //   {
    //     text: "种🈚️饮茶",
    //     color: "#fff",
    //     time: 1,
    //   },
    //   {
    //     text: "饮佐茶咩啊",
    //     color: "#fff",
    //     time: 1,
    //   },
    //   {
    //     text: "打点水泡茶",
    //     color: "#fff",
    //     time: 1,
    //   },
    //   {
    //     text: "点杯茶先啦",
    //     color: "#fff",
    //     time: 1,
    //   },
    //   {
    //     text: "听日去饮点好茶",
    //     color: "#fff",
    //     time: 2,
    //   },
    //   {
    //     text: "某做啦，三点啦",
    //     color: "#fff",
    //     time: 2,
    //   },
    //   {
    //     text: "某做工啦",
    //     color: "#fff",
    //     time: 2,
    //   },
    //   {
    //     text: "哪家的茶好饮咧",
    //     color: "#fff",
    //     time: 2,
    //   },
    //   {
    //     text: "下午饮茶防瞌睡",
    //     color: "#fff",
    //     time: 2,
    //   },
    //   {
    //     text: "伐第饮茶啦",
    //     color: "#fff",
    //     time: 2,
    //   },
    //   {
    //     text: "今日饮乜野啊",
    //     color: "#fff",
    //     time: 2,
    //   },
    //   {
    //     text: "点击饮茶",
    //     color: "#fff",
    //     time: 3,
    //   },
    //   {
    //     text: "饮茶小助手解君愁",
    //     color: "#fff",
    //     time: 3,
    //   },
    //   {
    //     text: "某做工啦",
    //     color: "#fff",
    //     time: 3,
    //   },
    //   {
    //     text: "哪家的茶好饮咧",
    //     color: "#fff",
    //     time: 3,
    //   },
    //   {
    //     text: "下午饮茶防瞌睡",
    //     color: "#fff",
    //     time: 3,
    //   },
    //   {
    //     text: "饮宾果茶咧",
    //     color: "#fff",
    //     time: 3,
    //   },
    //   {
    //     text: "好久某嘿饮早茶啦",
    //     color: "#fff",
    //     time: 3,
    //   },
    //   {
    //     text: "种🈚️饮茶",
    //     color: "#fff",
    //     time: 3,
    //   },
    //   {
    //     text: "饮茶饮茶啦",
    //     color: "#fff",
    //     time: 4,
    //   },
    //   {
    //     text: "记得提醒饮茶哈",
    //     color: "#fff",
    //     time: 4,
    //   },
    //   {
    //     text: "某做啦，三点啦",
    //     color: "#fff",
    //     time: 4,
    //   },
    //   {
    //     text: "某做工啦",
    //     color: "#fff",
    //     time: 4,
    //   },
    //   {
    //     text: "哪家的茶好饮咧",
    //     color: "#fff",
    //     time: 4,
    //   },
    //   {
    //     text: "查看你的饮茶排行",
    //     color: "#fff",
    //     time: 4,
    //   },
    //   {
    //     text: "记得投币！",
    //     color: "#fff",
    //     time: 4,
    //   },
    // ],
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: "../chooseLib/chooseLib",
      });
      return;
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
  },
  changeMuted() {
    this.setData({ isMuted: !this.data.isMuted });
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      });
    }
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        wx.showLoading({
          title: "上传中",
        });

        const filePath = res.tempFilePaths[0];

        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`;
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: (res) => {
            console.log("[上传文件] 成功：", res);

            app.globalData.fileID = res.fileID;
            app.globalData.cloudPath = cloudPath;
            app.globalData.imagePath = filePath;

            wx.navigateTo({
              url: "../storageConsole/storageConsole",
            });
          },
          fail: (e) => {
            console.error("[上传文件] 失败：", e);
            wx.showToast({
              icon: "none",
              title: "上传失败",
            });
          },
          complete: () => {
            wx.hideLoading();
          },
        });
      },
      fail: (e) => {
        console.error(e);
      },
    });
  },
});
