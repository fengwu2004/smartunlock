// main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticket:{
      payfailed: 0,
      unlockfailed: 1,
      unlocksuccess: 2,
      unlocking: 3,
      unpay: 4,
      doorStatus:0,
      message: '支付失败，请重新支付!', 
    },
    bottom: {
      paysuccess:0,
    },
    card: {
      userHeadicon:'http://wx.indoorun.com/indoorun/indoorun/unlock/dist/static/avatar.png'
    }
  },

  payorder: function () {
  
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})