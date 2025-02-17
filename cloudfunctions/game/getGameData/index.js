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

  const list = [
    {
      userId: '1',
      avatar: '',
      nickname: '玩家1',
      open: false,
      allBuyin: 1000,
      totalCount: 3000,
      buyinList: [
        {buyinCount: 200, buyinTime: "21:00:00"},
        {buyinCount: 200, buyinTime: "21:00:00"},
        {buyinCount: 200, buyinTime: "21:00:00"},
        {buyinCount: 200, buyinTime: "21:00:00"},
      ],
      needCheck: false,
      buyinCount: 0,
      buyinTime: null,
    },
    {
      userId: '1',
      avatar: '',
      nickname: '玩家2',
      open: false,        
      allBuyin: 3000,
      totalCount: 1000,
      profitCount: -2000,
      buyinList: [
        {buyinCount: 200, buyinTime: "21:00:00"},
        {buyinCount: 200, buyinTime: "21:00:00"},
        {buyinCount: 200, buyinTime: "21:00:00"},
        {buyinCount: 200, buyinTime: "21:00:00"}
      ],
      needCheck: true,
      buyinCount: 200,
      buyinTime: "21:00:00",
    },       
  ]
  console.log("AA", list)
  return { list }
}