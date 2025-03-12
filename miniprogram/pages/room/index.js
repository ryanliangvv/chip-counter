Page({
  onLoad: function(options) {   
    wx.cloud.callFunction({ name: 'room', data: { type: 'getCurrRoom'} }).then(res => {
      const { room } = res.result;
      // 当前用户正在房间中
      if (!room || room.roomId != options.roomId) {
        wx.showToast({ icon: 'error', title: '房间已关闭'});
        setTimeout(()=>{ wx.switchTab({ url: "/pages/index/index" }) }, 2000)
      } else {
        this.handleInitData()
      }
    }).catch(console.error)
  },
  onShow() {},
  onShareAppMessage() {
    return {
      title: '邀请你加入Poker计分房间',
      path: 'page/component/index'
    }
  },
  onShareTimeline() {
    '邀请你加入Poker计分房间'
  },
  data: {
    showManagerOpt: false,
    showPlayerOpt: false,
    showSetChipsCount: false,
    setChipsFrom: '',

    list: [
      // {
      //   userId: '1',
      //   avatar: '',
      //   nickname: '玩家1',
      //   open: false,
      //   allBuyin: 1000,
      //   totalCount: 3000,
      //   buyinList: [
      //     {buyinCount: 200, buyinTime: "21:00:00"},
      //     {buyinCount: 200, buyinTime: "21:00:00"},
      //     {buyinCount: 200, buyinTime: "21:00:00"},
      //     {buyinCount: 200, buyinTime: "21:00:00"},
      //   ],
      //   needCheck: false,
      //   buyinCount: 0,
      //   buyinTime: null,
      // }
    ]
  },
  handleInitData() {
    // 获取并设置初始数据
    wx.cloud.callFunction({ name: 'game', data: { type: 'getGameData'} }).then(res => {
      const { list } = res.result
      this.setData({list})
    }).catch(console.error)
  },
  handleOpenLisetItem(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
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
    const newData = { setChipsFrom: "给所有人筹码", showSetChipsCount: true, showManagerOpt: false}
    this.setData(newData)
  },
  handleBuyinChips(e) {    
    const newData = { setChipsFrom: "买入筹码", showSetChipsCount: true, showPlayerOpt: false}
    this.setData(newData)
  },
  handleChipsInHand(e) {    
    const newData = { setChipsFrom: "设置手上码量", showSetChipsCount: true, showPlayerOpt: false}
    this.setData(newData)
  },
  handleCancelSetChips(e) {
    this.setData({showSetChipsCount: false})
  },
  handleConfirmSetChips(e) {
    this.setData({showSetChipsCount: false})
  },
  handleBackIndex(e) {
    wx.switchTab({ url: "/pages/index/index" })
  },
})