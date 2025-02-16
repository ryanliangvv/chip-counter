// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "dev-9g35dbvy13585fb9"
})

const db = cloud.database();
const roomCol = db.collection('room');
const userRoomCol = db.collection('user_room');

function generateRandom6DigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}
function generateRandom4DigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function createRoom(userId) {
  // 获取所有房间号  
  const ret = await roomCol.get();
  let oldRoomIdMap = {}
  ret.data.forEach(e => {
    oldRoomIdMap[e.roomNo] = 1    
  });
  console.log("oldRoomIdMap", oldRoomIdMap)
  // 生成一个随机的房间号，判断是否被占用，没有被占用就创建房间
  let isOk = false
  let roomNo = generateRandom6DigitNumber()
  for (let index = 0; index < 100; index++) {
    if (!oldRoomIdMap[roomNo]) {
      isOk = true
      break
    }
    roomNo = generateRandom6DigitNumber()    
  }
  if (!isOk) throw new Error('房间号生成失败');  
  let password = generateRandom4DigitNumber()
  // 创建房间
  const result = await roomCol.add({
    data: {
      roomNo,
      password,
      createdAt: new Date(),
      _openid: userId      
    }
  });
  // 用户绑定到房间上
  const roomId = result._id
  await userRoomCol.add({
    data: {
      roomId,
      userId,
      createdAt: new Date(),
      _openid: userId      
    }
  });  
  return roomNo
}

 async function removeUserCreatedRooms(userId)  {
  // 查询当前用户的数据
  const res = await roomCol.where({ _openid: userId }).get();
  const oldRoomIds = res.data.map(e=>e._id)
  if (!oldRoomIds.length) return
  console.log("oldRoomIds", oldRoomIds)
  // 删除所有用户和该房间对应关系的记录
  await userRoomCol.where({ roomId: db.command.in(oldRoomIds)}).remove()
  // 删除该用户的所有房间
  await roomCol.where({ _openid: userId }).remove();
}
exports.removeUserCreatedRooms = removeUserCreatedRooms

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()  
  const userId = OPENID
  console.log("userId", userId)
  await removeUserCreatedRooms(userId)  
  const roomNo = await createRoom(userId)  

  return {
    roomNo,
  }
}