const createRoom = require('./createRoom/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'createRoom':
      return await createRoom.main(event, context);    
  }
};