// 云函数入口文件
const cloud = require('wx-server-sdk')
const conf = require('../../config')
cloud.init({ env: conf.envId })

const db = cloud.database();
const roomCol = db.collection('room');
const userRoomCol = db.collection('user_room');
const userCol = db.collection('user');

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()  
  const userId = OPENID

  let room = null
  const ret1 = await userRoomCol.where({ _openid: userId }).get();
  if (ret1.data && ret1.data.length) {
    const roomId = ret1.data[0].roomId
    const ret2 = await roomCol.where({ _id: roomId }).get();
    if (ret2.data && ret2.data.length) {
      const r = ret2.data[0]
      const isOwner = r._openid == userId
      room = {
        roomId: r._id,
        roomNo: r.roomNo,
        password: r.password,
        isOwner
      }
    }
  }  
  return {
    room,
  }
}