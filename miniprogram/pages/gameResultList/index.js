const { envList } = require('../../envList');

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以要加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

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
  handleDelRecord(e) {    
    const time = e.currentTarget.id
    const tt = formatDate(new Date(time))
    const count = e.currentTarget.dataset.count
    const self = this
    const msg = `时间：${tt}，人数：${count}`
    
    wx.showModal({
      title: '确定删除该记录吗？',
      content: msg,
      success(res) {
        if (res.confirm) {
          const newData = self.data.gameResults.filter((e)=> e.time != time)
          self.setData({ gameResults: newData });
          wx.setStorageSync('gameResults', newData);
        }
      }
    });
  },
});
