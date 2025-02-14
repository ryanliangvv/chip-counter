const { envList } = require("../../envList");

Page({
  data: {  
  },
  onLoad: function(options) {    
  },
  handleCreateRoom() {    
    wx.cloud.callFunction({ name: 'room', data: { type: 'createRoom'},
    }).then(res => {
      const { roomNo } = res.result;      
      wx.redirectTo({url: `/pages/room/index?roomId=${roomNo}`})
    }).catch(console.error)
  }
});
