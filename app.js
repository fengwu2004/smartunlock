
//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
    wx.startBeaconDiscovery({
	    uuids:['AB8190D5-D11E-4941-ACC4-42F30510B408'],
      success(res) {
      
        console.log(JSON.stringify(res))
      }
    })
    
    wx.onBeaconUpdate(res => {
	
	    console.log(JSON.stringify(res))
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
		deviceId: '',
    userInfo: null,
  }
})