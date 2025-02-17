// 云函数入口文件
const cloud = require('wx-server-sdk')
const conf = require('../../config')
cloud.init({ env: conf.envId })

const db = cloud.database();
const roomCol = db.collection('room');
const userRoomCol = db.collection('user_room');

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("close room", event)
  const wxContext = cloud.getWXContext()
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()  
  const userId = OPENID

  const roomId = event.data.roomId
  // 删除所有用户和该房间对应关系的记录
  await userRoomCol.where({ roomId }).remove()
  // TODO: 通知用户该房间已被删除
  console.log("close room done")
  return {}
}