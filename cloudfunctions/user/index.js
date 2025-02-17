const getCurrUser = require('./getCurrUser/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getCurrUser':
      return await getCurrUser.main(event, context);    
  }
};