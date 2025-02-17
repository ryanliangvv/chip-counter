Page({  
  onLoad: function(options) {
    console.log("CCCCC", options)
    if (!options.i) return
    const index = parseInt(options.i)
    const gameResults = wx.getStorageSync('gameResults');
    if (gameResults) { 
      const result = gameResults[index]      
      const self = this      
      const newList = result.list.slice().sort((a, b) => self.calcProfit(b) - self.calcProfit(a));
      this.setData({gameTime: result.time, list: newList})
    }
  },
  calcProfit(item) {
    const allBuyin = item.buyinList.map(e=>e.buyinCount).reduce((acc, currentValue) => acc + currentValue, 0);
    return item.totalCount - allBuyin
  },
  onShow() {
  },
  data: {
    viewIndex: 0,
    gameTime: null,
    list: [
      // {
      //   userId: '1',
      //   nickname: '玩家1',
      //   open: false,      
      //   totalCount: 3000,
      //   buyinList: [      
      //     {buyinCount: 200, buyinTime: "21:00:00"},
      //   ],
      // }
    ]
  },
  formatDateTime(date) {    
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let timeOnly = `${hours}:${minutes}:${seconds}`;
    return timeOnly
  },
  handleOpenListItem(e) {
    const userId = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].userId === userId) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({ list })
  },  
})