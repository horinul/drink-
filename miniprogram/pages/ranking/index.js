Page({
  data: {
    rankList: [],
    imgUrl: [
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/1st.png?sign=baf45ebb5ebe02afab7f5e3466d2b45e&t=1623559624",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/2nd.png?sign=d2699ebe3efe56d12214a2cb109adca7&t=1623559635",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/3rd%20.png?sign=3e4efb1d90905447c7f5e0361dc69d89&t=1623559643",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/4.png?sign=7b5a3c049e0bf50af932a8b2e7ced3bc&t=1623559650",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/5.png?sign=509f20657f8a68dc1bad7d5939dbcbc8&t=1623559657",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/6.png?sign=bf8eb89c2a689c2d1b8abc0c61470366&t=1623559667",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/7.png?sign=623dc407edfea522c352e085a6da8d4e&t=1623559675",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/8.png?sign=6c2bcb2df8249caad813ed0143f4a8c6&t=1623559682",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/9.png?sign=079536e3221d167b1235413945dd7057&t=1623559688",
      "https://636c-cloud1-5gde52mzca59cee4-1305972572.tcb.qcloud.la/10.png?sign=f11460287705a882d938b29cf7ac5646&t=1623559696",
    ],
    hasAuthor: false,
    openid: "",
    userRank: "无",
    isHasInDB: false,
    allRankList: [],
    isLoading: true,
  },
  onLoad() {
    if (wx.getStorageSync("username") && wx.getStorageSync("userAvatar")) {
      this.setData({
        hasAuthor: true,
      });
    } else {
      this.getRankfromdb();
    }
    wx.cloud
      .callFunction({
        name: "getOpenId",
      })
      .then((res) => {
        this.setData({
          openid: res.result.openid,
        });
        this.getRankfromdb();
      });
  },
  getRankfromdb() {
    const db = wx.cloud.database();
    const that = this;
    db.collection("rank")
      .orderBy("rankNum", "desc")
      .get({
        success(res) {
          that.setData({
            allRankList: res.data,
          });
          that.setData({
            rankList: that.data.allRankList.slice(0, 10),
          });
          if (that.data.allRankList.length !== 0) {
            for (let i = 0; i < that.data.allRankList.length; i++) {
              if (that.data.allRankList[i]._openid === that.data.openid) {
                that.setData({
                  userRank: i + 1,
                });
                break;
              }
            }
          }
          that.setData({
            isLoading: false,
          });
        },
      });
  },
  getAuthor() {
    const db = wx.cloud.database();
    const that = this;
    wx.getUserProfile({
      desc: "用于完善会员资料",
      success: function (res) {
        wx.setStorageSync("username", res.userInfo.nickName);
        wx.setStorageSync("userAvatar", res.userInfo.avatarUrl);
        db.collection("rank")
          .where({
            _openid: that.data.openid,
          })
          .get({
            success(res) {
              that.setData({
                isHasInDB: res.data.length !== 0,
              });
            },
          });
        if (!that.data.isHasInDB) {
          db.collection("rank").add({
            data: {
              username: wx.getStorageSync("username"),
              avatarUrl: wx.getStorageSync("userAvatar"),
              rankNum: 0,
            },
            success(res) {
              that.getRankfromdb();
            },
          });
          that.setData({
            hasAuthor: true,
          });
        }
      },
    });
  },
});
