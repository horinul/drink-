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
        need7: "0",
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
    filterMsg.map(async (message) => {
      const res = await cloud.openapi.subscribeMessage.send({
        touser: message._openid,
        page: "pages/serverapi/serverapi",
        data: {
          thing3: {
            value: "珍惜今天的喝茶时光[doge]",
          },
          thing7: {
            value: "今天喝什么好呢",
          },
        },
        template_id: "iCPBBBC4o29WwNwWkA4ICAoRv8kyzN59GOcmc2Vn7Oo",
      });
    });
    const _ = db.command;
    msg.data.map(async (msg) => {
      db.collection("idList3")
        .doc(msg._id)
        .update({
          data: {
            need7: "1",
          },
          success(res) {
            return res;
          },
        });
      db.collection("rank")
        .where({
          _openid: msg._openid,
        })
        .update({
          data: {
            rankNum: _.inc(1),
          },
          success(res) {
            return res;
          },
        });
    });
  } catch (e) {
    console.error(e);
  }
}
