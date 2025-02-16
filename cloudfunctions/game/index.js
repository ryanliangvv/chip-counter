const getGameData = require('./getGameData/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getGameUsers':
      return await getGameData.main(event, context);
  }
};