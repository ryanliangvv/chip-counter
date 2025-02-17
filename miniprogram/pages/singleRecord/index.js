Page({
  onUnload: function () {
    // 页面卸载时保存数据
    wx.setStorageSync('singleRecordList', this.data.list);
    console.log("onUnload", this.data.list)
  },
  onHide: function () {    
    wx.setStorageSync('singleRecordList', this.data.list);    
    console.log("onHide", this.data.list)
  },  
  onLoad: function(options) {
    const storedList = wx.getStorageSync('singleRecordList');        
    console.log("onLoad", storedList)
    if (storedList) { this.setData({ list: storedList }); }
  },
  onShow() {
    const storedList = wx.getStorageSync('singleRecordList');
    console.log("onShow", storedList)
    if (storedList) { this.setData({ list: storedList }); }
  },
  data: {
    showAddPlayer: false,
    showManagerOpt: false,
    showPlayerOpt: false,
    
    showSetChipsCount: false,
    setChipsFrom: '',
    setChipsTitle: '',
    setChipsCount: null,
    editUserId: '',

    newUserNickname: '',
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
  setShowPlayerOpt(newVal) {
    let newData = { showPlayerOpt: newVal }    
    if (newVal) {
      newData.showManagerOpt = false      
    }
    this.setData(newData)  
  },
  handleClickPlayerOpt(e) {
    const newVal = !this.data.showPlayerOpt
    this.setShowPlayerOpt(newVal)
  },
  setShowManagerOpt(newVal) {
    let newData = { showManagerOpt: newVal }
    if (newVal) {
      newData.showPlayerOpt = false      
    }
    this.setData(newData)  
  },
  handleClickManagerOpt(e) {
    const newVal = !this.data.showManagerOpt
    this.setShowManagerOpt(newVal)
  },  
  handleGiveInitChips(e) {
    const newData = { setChipsFrom: 'initChips', setChipsTitle: "给所有玩家发放筹码", showSetChipsCount: true, showManagerOpt: false, setChipsCount: null}
    this.setData(newData)
  },  
  handleSetChipsCountChange(event) {         
    this.setData({ setChipsCount: event.detail.value });
  },
  // 取消筹码设置
  handleCancelSetChips(e) {
    this.setData({showSetChipsCount: false})
  },
  // 清除所有人的筹码
  handleClearChips() {
    const self = this
    wx.showModal({
      title: '注意',
      content: `确定要清除所有玩家筹码吗？`,
      success(res) {
        if (res.confirm) {
          const list = self.data.list
          for (let i = 0, len = list.length; i < len; ++i) {        
            list[i].buyinList = []
            list[i].totalCount = 0
          }
          self.setData({ list, showManagerOpt: false })
        }
      }
    });
  },
  // 确认筹码设置
  handleConfirmSetChips(e) {
    const userId = this.data.editUserId
    const setChipsCount = this.data.setChipsCount 
    const setChipsFrom = this.data.setChipsFrom
    const self = this
    if (setChipsFrom == 'initChips') {      
      // 起始
      wx.showModal({
        title: '注意',
        content: `确定给所有玩家发放 ${setChipsCount} 的筹码吗？`,
        success(res) {
          if (res.confirm) {
            const list = self.data.list
            for (let i = 0, len = list.length; i < len; ++i) {        
              list[i].buyinList.push({buyinCount: parseInt(setChipsCount), buyinTime: self.formatDateTime(new Date())})
            }
            self.setData({ list, showSetChipsCount: false })
          }
        }
      });
    } else if (setChipsFrom == 'buyin') {
      // 买入
      wx.showModal({
        title: '注意',
        content: `确定给玩家发放 ${setChipsCount} 的筹码吗？`,
        success(res) {
          if (res.confirm) {
            const list = self.data.list
            for (let i = 0, len = list.length; i < len; ++i) {
              if (list[i].userId === userId) {
                list[i].buyinList.push({buyinCount: parseInt(setChipsCount), buyinTime: self.formatDateTime(new Date())})
              }
            }
            self.setData({ list, showSetChipsCount: false })
          }
        }
      });      
    } else if (setChipsFrom == 'inhand') {
      // 手上码量
      const list = this.data.list
      for (let i = 0, len = list.length; i < len; ++i) {
        if (list[i].userId === userId) {
          list[i].totalCount = parseInt(setChipsCount)
        }
      }
      this.setData({ list, showSetChipsCount: false })
    }    
  },  
  handleCancelAddPlayer() {
    this.setData({showAddPlayer: false})
  },
  handleOpenAddPlayer() {
    this.setData({showAddPlayer: true, newUserNickname: ''})
  },
  handleNicknameChange(event) {         
    this.setData({ newUserNickname: event.detail.value });
  },
  handleConfirmAddPlayer() {
    if (!this.data.newUserNickname) {
      wx.showToast({
        title: "昵称不允许为空",
        icon: 'error',
        duration: 2000
      });
      return
    }
    const timestamp = Date.now();
    const nickname = this.data.newUserNickname
    const list = this.data.list
    const newU = {
      userId: timestamp+'',
      nickname,
      open: false,      
      totalCount: 0,
      buyinList: [],        
    }
    this.setData({ list: [...list, newU] })
  },
  handleDelPlayer(e) {
    const userId = e.currentTarget.id    
    const nickname = e.currentTarget.dataset.nickname
    const self = this
    wx.showModal({
      title: '注意',
      content: `确定要删除玩家 ${nickname} 吗？`,
      success(res) {
        if (res.confirm) {
          const newList = self.data.list.filter(e=>e.userId != userId)
          self.setData({list: newList})
        }
      }
    });
  },
  handleSetBuyin(e) {
    const userId = e.currentTarget.id
    const nickname = e.currentTarget.dataset.nickname
    const newData = { setChipsFrom: 'buyin', setChipsTitle: `设置玩家 ${nickname} 买入`, showSetChipsCount: true, editUserId: userId, setChipsCount: null}
    this.setData(newData)
  },
  handleSetChipsInhand(e) {
    const userId = e.currentTarget.id
    const nickname = e.currentTarget.dataset.nickname
    const newData = { setChipsFrom: 'inhand', setChipsTitle: `设置玩家 ${nickname} 手上码量`, showSetChipsCount: true, editUserId: userId, setChipsCount: null}
    this.setData(newData)    
  },
  // 设置游戏结束
  handleGameOver() {
    // 计算是否相等
    const list = this.data.list
    let allBuyin = 0
    let allInhand = 0
    for (let index = 0; index < list.length; index++) {
      const e = list[index];
      const tt = e.buyinList.map(e=>e.buyinCount).reduce((acc, currentValue) => acc + currentValue, 0);      
      allBuyin = tt +allBuyin
      allInhand = e.totalCount + allInhand
    }
    console.log("allBuyin, allInhand", allBuyin, allInhand)
    const gapCount = allBuyin - allInhand
    if (gapCount != 0) {
      wx.showModal({
        title: '核算不通过，请检查',
        content: `总买入筹码 ${allBuyin}，手上总筹码 ${allInhand}，差值 ${gapCount}`,
      });
      return
    }
    // 将结果存入本地，跳到展示排名页        
    const gameResult = {
      time: new Date(),
      list: this.data.list.map(e=>{
        return Object.assign({}, e, {open: false})
      }),
    }
    let newGameResults = [gameResult]
    const storedGameResults = wx.getStorageSync('gameResults');
    if (storedGameResults) {
      newGameResults = [gameResult, ...storedGameResults]
    }
    // 只保存近期10次的记录
    newGameResults = newGameResults.slice(0, 10);
    wx.setStorageSync('gameResults', newGameResults);
    this.setData({ showManagerOpt: false })
    wx.navigateTo({ url: "/pages/gameResultDetail/index?i=0" })
  },
})