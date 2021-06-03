// 云函数入口文件
const cloud = require("wx-server-sdk");
const time = require("./time");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  return sendSubscribeMessage(event);
};
async function sendSubscribeMessage(event) {
  try {
    const db = cloud.database();
    const msg = await db
      .collection("idList3")
      .where({
        need2: "0",
      })
      .get({
        success: function (res) {
          return res;
        },
      });
    let tmpArr = [];
    let filterMsg = [];
    for (let i = 0; i < msg.data.length; i++) {
      if (tmpArr.indexOf(msg.data[i]._openid) === -1) {
        tmpArr.push(msg.data[i]._openid);
        filterMsg.push(msg.data[i]);
      }
    }
    const nowTime = time.formatTime(new Date());
    filterMsg.map(async (message) => {
      // try {
      // 发送订阅消息
      const res = await cloud.openapi.subscribeMessage.send({
        touser: message._openid,
        page: "pages/serverapi/serverapi",
        data: {
          date3: {
            value: nowTime,
          },
          thing5: {
            value: "您预约的饮茶🍵时间已到～",
          },
          thing7: {
            value: "上班第二天也要加油鸭",
          },
        },
        template_id: "WVe-ZbI39-WLG2w3e-cQsdhlWyuJPouGrhJTZDAtmrc",
      });
    });
    msg.data.map(async (msg) => {
      db.collection("idList3")
        .doc(msg._id)
        .update({
          data: {
            need2: "1",
          },
          success(res) {
            return res;
          },
        });
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
