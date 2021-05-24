Page({
  data: {
    templateId: "rcv57r2mZ3NeH6HlZtvPKi8zRgMWGIy1sUD0tWB03io",
    subscribeMessageResult: "",
    requestSubscribeMessageResult: "",
    wxacodeSrc: "",
    wxacodeResult: "",
    showClearWXACodeCache: false,
  },

  async requestSubscribeMessage() {
    const templateId = [
      "rcv57r2mZ3NeH6HlZtvPKi5-jfsc642tKIJOcQUzTgA",
      "kC6Ow7pgrI95TPJsAh59yrQt5UxogPVs4tatKYuAcbA",
      "h2pJLutQtzwB74qH5tqhOqZ2xE0H9frJZRLWfPs0EsU",
    ];
    if (!templateId) {
      wx.showModal({
        title: "获取失败",
        content: "提醒不存在",
        showCancel: false,
      });
    }
    const db = wx.cloud.database();
    if (templateId) {
      wx.requestSubscribeMessage({  
        tmplIds: templateId,
        success: (res) => {
          let toData = {};
          for (let i = 1; i <= templateId.length; i++) {
            if (res[templateId[i - 1]] === "accept") {
              toData["need" + (i * 2 - 1)] = "0";
            }
          }
          db.collection("idList1").add({
            data: toData,
            success(res) {
              console.info("success:", res);
            },
            fail(err) {
              console.error("error:", err);
            },
          });
        },
        fail: (err) => {
          this.setData({
            requestSubscribeMessageResult: `失败（${JSON.stringify(err)}）`,
          });
        },
      });
    }
  },
  async requestSubscribeMessage1() {
    const templateId = [
      "WVe-ZbI39-WLG2w3e-cQsdhlWyuJPouGrhJTZDAtmrc",
      "WDAd3d2yWD8bi4K0YTjuXtaFEmyzyYSzYOsvVgZLwX4",
    ];
    if (!templateId) {
      wx.showModal({
        title: "获取失败",
        content: "提醒不存在",
        showCancel: false,
      });
    }
    const db = wx.cloud.database();
    if (templateId) {
      wx.requestSubscribeMessage({
        tmplIds: templateId,
        success: (res) => {
          let toData = {};
          for (let i = 1; i <= templateId.length; i++) {
            if (res[templateId[i - 1]] === "accept") {
              toData["need" + i * 2] = "0";
            }
          }
          db.collection("idList1").add({
            data: toData,
            success(res) {
              console.info("success:", res);
            },
            fail(err) {
              console.error("error:", err);
            },
          });
        },
        fail: (err) => {
          this.setData({
            requestSubscribeMessageResult: `失败（${JSON.stringify(err)}）`,
          });
        },
      });
    }
  },
  async requestSubscribeMessage2() {
    const templateId = [
      "bPBS4BX4GdkUFmfuU_vhbMlTQ8fCeXzIuPTatyl1iMk",
      "iCPBBBC4o29WwNwWkA4ICAoRv8kyzN59GOcmc2Vn7Oo",
    ];
    if (!templateId) {
      wx.showModal({
        title: "获取失败",
        content: "提醒不存在",
        showCancel: false,
      });
    }
    const db = wx.cloud.database();
    if (templateId) {
      wx.requestSubscribeMessage({
        tmplIds: templateId,
        success: (res) => {
          let toData = {};
          for (let i = 6; i <= templateId.length; i++) {
            if (res[templateId[i - 6]] === "accept") {
              toData["need" + i] = "0";
            }
          }
          db.collection("idList1").add({
            data: toData,
            success(res) {
              console.info("success:", res);
            },
            fail(err) {
              console.error("error:", err);
            },
          });
        },
        fail: (err) => {
          this.setData({
            requestSubscribeMessageResult: `失败（${JSON.stringify(err)}）`,
          });
        },
      });
    }
  },
  sendSubscribeMessage(e) {
    this.setData({
      subscribeMessageResult: "",
    });

    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "sendSubscribeMessage",
        templateId: this.data.templateId,
      },
      success: (res) => {
        console.warn(
          "[云函数] [openapi] subscribeMessage.send 调用成功：",
          res
        );
        wx.showModal({
          title: "发送成功",
          content: "请返回微信主界面查看",
          showCancel: false,
        });
        // wx.showToast({
        //   title: "发送成功，请返回微信主界面查看",
        // });
        this.setData({
          subscribeMessageResult: JSON.stringify(res.result),
        });
      },
      fail: (err) => {
        wx.showToast({
          icon: "none",
          title: "调用失败",
        });
        console.error(
          "[云函数] [openapi] subscribeMessage.send 调用失败：",
          err
        );
      },
    });
  },

  submitSubscribeMessageForm(e) {
    this.setData({
      subscribeMessageResult: "",
    });

    wx.cloud.callFunction({
      name: "openapi",
      config: { env: "cloud1-5gde52mzca59cee4" },
      data: {
        action: "sendSubscribeMessage",
        formId: e.detail.formId,
      },
      success: (res) => {
        console.warn(
          "[云函数] [openapi] subscribeMessage.send 调用成功：",
          res
        );
        wx.showModal({
          title: "发送成功",
          content: "请返回微信主界面查看",
          showCancel: false,
        });
        wx.showToast({
          title: "发送成功，请返回微信主界面查看",
        });
        this.setData({
          templateMessageResult: JSON.stringify(res.result),
        });
      },
      fail: (err) => {
        wx.showToast({
          icon: "none",
          title: "调用失败",
        });
        console.error(
          "[云函数] [openapi] templateMessage.send 调用失败：",
          err
        );
      },
    });
  },

  clearWXACodeCache() {
    wx.removeStorageSync("wxacodeCloudID");

    this.setData({
      wxacodeSrc: "",
      wxacodeResult: "",
      showClearWXACodeCache: false,
    });

    wx.showToast({
      title: "清除成功",
    });
  },
});
