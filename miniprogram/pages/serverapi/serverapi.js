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
    const templateId = "rcv57r2mZ3NeH6HlZtvPKi8zRgMWGIy1sUD0tWB03io";
    if (!templateId) {
      wx.showModal({
        title: "获取失败",
        content: "提醒不存在",
        showCancel: false,
      });
    }
    const db=wx.cloud.database()
    if (templateId) {
      wx.requestSubscribeMessage({
        tmplIds: [templateId],
        success: (res) => {
          if (res[templateId] === "accept") {
            this.setData({
              requestSubscribeMessageResult: "成功",
            });
            db.collection('idList').add({
              data:{
                need:'0'
              },
              success(res){
                console.info('success:',res)
              },
              fail(err){
                console.error('error:',err)
              }
            })
          } else {
            this.setData({
              requestSubscribeMessageResult: `失败（${res[templateId]}）`,
            });
          }
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
      config:{ env:'cloud1-5gde52mzca59cee4'},
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
