// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "dev-9g35dbvy13585fb9"
})

const db = cloud.database();
const roomCol = db.collection('room');
const userRoomCol = db.collection('user_room');

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()  
  const userId = OPENID
  // 将当前用户所在房间信息删除
  await userRoomCol.where({ _openid: userId }).remove() 
  return {}
}