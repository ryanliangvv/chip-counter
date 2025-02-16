const { envList } = require("../../envList");

Page({
  data: {
    isInRoom: false,
    roomId: '',
    roomNo: '',
    password: '',
    isOwner: false,
  },
  onLoad: function(options) {    
    // 页面加载时执行的代码
    this.handleInitData()
  },
  onShow: function () {
    // 页面从后台进入前台时执行的代码
    this.handleInitData()
  },
  handleInitData() {
    wx.cloud.callFunction({ name: 'room', data: { type: 'getCurrRoom'} }).then(res => {
      let data = { isInRoom: false, roomNo: '', password: '', isOwner: false, roomId: '' }
      const { room } = res.result;
      // 当前用户正在房间中
      if (room) {
        data = { isInRoom: true, roomNo: room.roomNo, password: room.password, isOwner: room.isOwner, roomId: room.roomId }
      }
      this.setData(data)
    }).catch(console.error)
  },
  handleCreateRoom() {    
    wx.cloud.callFunction({ name: 'room', data: { type: 'createRoom'} }).then(res => {
      const { roomId } = res.result;      
      wx.redirectTo({url: `/pages/room/index?roomId=${roomId}`})
    }).catch(console.error)
  },
  handleReturnRoom() {
    const roomId = this.data.roomId
    wx.redirectTo({url: `/pages/room/index?roomId=${roomId}`})
  },
  handleQuitRoom() {
    const self = this
    wx.cloud.callFunction({ name: 'room', data: { type: 'quitRoom'} }).then(res => {
      self.handleInitData()
    }).catch(console.error)
  },
  handleCloseRoom() {
    const self = this
    const roomId = this.data.roomId
    wx.cloud.callFunction({ name: 'room', data: { type: 'closeRoom', data: { roomId }} }).then(res => {
      self.handleInitData()
      wx.showToast({ icon: 'success', title: '房间已关闭'});
    }).catch(console.error)
  },
});
