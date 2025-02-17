// 云函数入口文件
const cloud = require('wx-server-sdk')
const conf = require('../../config')
cloud.init({ env: conf.envId })

const db = cloud.database();
const userCol = db.collection('user');

// 云函数入口函数
exports.main = async (event, context) => {  
  const wxContext = cloud.getWXContext()
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()  
  const userId = OPENID

  // 获取用户 头像和昵称
  let user = {avatar: '', nickname: ''}
  const ret = await userCol.where({ _openid: userId }).get();
  if (ret.data && ret.data.length) {
    const u = ret.data[0]
    user = {
      avatar: u.avatar,
      nickname: u.nickname,      
    }
  }
  
  return user
}