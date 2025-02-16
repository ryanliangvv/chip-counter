const createRoom = require('./createRoom/index');
const getCurrRoom = require('./getCurrRoom/index');
const quitRoom = require('./quitRoom/index');
const enterRoom = require('./enterRoom/index');
const closeRoom = require('./closeRoom/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'createRoom':
      return await createRoom.main(event, context);
    case 'getCurrRoom':
      return await getCurrRoom.main(event, context);
    case 'quitRoom':
      return await quitRoom.main(event, context);
    case 'enterRoom':
      return await enterRoom.main(event, context);
    case 'closeRoom':
      return await closeRoom.main(event, context);
  }
};