// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  return sendSubscribeMessage(event);
  // console.log(event)
  // switch (event.action) {
  //   case 'requestSubscribeMessage': {
  //     return requestSubscribeMessage(event)
  //   }
  //   case 'sendSubscribeMessage': {
  //     return sendSubscribeMessage(event)
  //   }
  //   default: {
  //     return
  //   }
  // }
};

async function requestSubscribeMessage(event) {
  // 此处为模板 ID，开发者需要到小程序管理后台 - 订阅消息 - 公共模板库中添加模板，
  // 然后在我的模板中找到对应模板的 ID，填入此处
  return "rcv57r2mZ3NeH6HlZtvPKi8zRgMWGIy1sUD0tWB03io"; // 如 'N_J6F05_bjhqd6zh2h1LHJ9TAv9IpkCiAJEpSw0PrmQ'
}

async function sendSubscribeMessage(event) {
  try {
    const db = cloud.database();
    const msg = await db
      .collection("idList1")
      .where({
        need: "0",
      })
      .get({
        success: function (res) {
          return res;
        },
      });
    const nowTime = time.formatTime(new Date());
    msg.data.map(async (message) => {
      // try {
      // 发送订阅消息
      const res = await cloud.openapi.subscribeMessage.send({
        touser: message._openid,
        page: "pages/openapi/openapi",
        data: {
          thing2: {
            value: "🕒喝茶时间到！",
          },
          date4:{
            value:nowTime
          }
        },
        template_id: "WDAd3d2yWD8bi4K0YTjuXtaFEmyzyYSzYOsvVgZLwX4",
      });
      console.info("inin", res);

      // 发送成功后将消息的状态改为已发送
      db.collection("idList1")
        .doc(message._id)
        .update({
          data: {
            need: "1",
          },
          success(res) {
            return res;
          },
        });
      // } catch (e) {
      //   return e;
      // }
    });
    // return sendPromises;
  } catch (e) {
    console.error(e);
  }
}
// sendSubscribeMessage(e) {
//   this.setData({
//     subscribeMessageResult: "",
//   });

//   wx.cloud.callFunction({
//     name: "openapi",
//     data: {
//       action: "sendSubscribeMessage",
//       templateId: this.data.templateId,
//     },
//     success: (res) => {
//       console.warn(
//         "[云函数] [openapi] subscribeMessage.send 调用成功：",
//         res
//       );
//       wx.showModal({
//         title: "发送成功",
//         content: "请返回微信主界面查看",
//         showCancel: false,
//       });
//       wx.showToast({
//         title: "发送成功，请返回微信主界面查看",
//       });
//       this.setData({
//         subscribeMessageResult: JSON.stringify(res.result),
//       });
//     },
//     fail: (err) => {
//       wx.showToast({
//         icon: "none",
//         title: "调用失败",
//       });
//       console.error(
//         "[云函数] [openapi] subscribeMessage.send 调用失败：",
//         err
//       );
//     },
//   });
// },
