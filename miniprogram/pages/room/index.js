const util = require('../../util/util')
const formatChipsCount = util.formatChipsCount

Page({
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
      {
        id: '1',
        name: '炸弹玩家玩家玩家玩家',        
        open: false,
        allBuyin: formatChipsCount(1000),
        totalCount: formatChipsCount(3000),
        profitCount: formatChipsCount(2000),
        buyinList: [
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"},
        ],
        needCheck: false,
        buyinCount: 0,
        buyinTime: null,
      },
      {
        id: '3',
        name: '炸弹玩家玩家玩家玩家',        
        open: false,
        allBuyin: formatChipsCount(3000),
        totalCount: formatChipsCount(1000),
        profitCount: formatChipsCount(-2000),
        buyinList: [
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"},
        ],
        needCheck: false,
        buyinCount: 0,
        buyinTime: null,
      },
      {
        id: '2',
        name: '玩家1',
        open: false,        
        allBuyin: formatChipsCount(3000),
        totalCount: formatChipsCount(1000),
        profitCount: formatChipsCount(-2000),
        buyinList: [
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"},
          {buyinCount: 200, buyinTime: "21:00:00"}
        ],
        needCheck: true,
        buyinCount: 200,
        buyinTime: "21:00:00",
      },       
    ],
    theme: 'light'
  },

  onLoad() {
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
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
    const newData = { setChipsFrom: "发放起始筹码", showSetChipsCount: true, showManagerOpt: false}
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