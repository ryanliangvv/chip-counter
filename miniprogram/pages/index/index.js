const { envList } = require("../../envList");

Page({
  data: {  
  },
  onLoad: function(options) {
    const db = wx.cloud.database();
    const roomId = options.id;
    db.collection('rooms').doc(roomId).get({
      success: res => {
        this.setData({
          room: res.data
        });
      },
      fail: err => {
        wx.showToast({ title: '加载房间信息失败', icon: 'none' });
      }
    });
  }  
});
