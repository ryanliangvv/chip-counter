const { envList } = require('../../envList');

// pages/me/index.js
Page({
  data: {
    gameResults: {      
    }
  },
  onLoad: function(options) {
    const storedList = wx.getStorageSync('gameResults');
    if (storedList) { this.setData({ gameResults: storedList }); }
  },
  onShow() {
    const storedList = wx.getStorageSync('gameResults');
    if (storedList) { this.setData({ gameResults: storedList }); }
  },
  handeViewItemDetail(e) {
    const time = e.currentTarget.id
    const index = this.data.gameResults.findIndex(e=>e.time == time)    
    if (index != -1) {
      wx.navigateTo({ url: "/pages/gameResultDetail/index?i=" + index })      
    }
  },
});
