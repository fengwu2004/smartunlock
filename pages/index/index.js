//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    connect: {
      connectstatus:0
    },
  },
  //事件处理函数

  updateData:function(keyvalue) {

    this.setData(keyvalue)
  },

  onConnectFailed: function(){

    this.updateData({
      connect: {
        connectstatus: 1
      }
    })
  },

  onConnectSuccess: function () {
    wx.navigateTo({
      url: '../main/main'
    })
  },

  onLoad: function (options) {

    function onGetSystemInfo() {
      return new Promise(function(resolve, reject){
        wx.getSystemInfo({
          success: function (res) { resolve(res) },
          fail: function (res) { reject(res) }
        })
      })
    }

    var self = this

    var deviceId = 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825'

    var serverId = null

    function onOpenBluetoothAdapter() {

      return new Promise(function (resolve, reject) {
        wx.openBluetoothAdapter({
          success: function (res) { resolve() },
          fail: function (res) { reject(res) }
        })
      })
    }
    function onCreateConnection() {
      return new Promise(function (resolve, reject) {
        wx.createBLEConnection({
          deviceId:deviceId,
          success: function (res) { resolve() },
          fail: function (res) { reject(res)}
        })
      })
    }
    function onGetDeviceServices() {
      return new Promise(function (resolve, reject) {
        wx.getBLEDeviceServices({
          deviceId: deviceId,
          success: function (res) { resolve(res) },
          fail: function (res) { reject(res) }
        })
      })
    }
    function onGetBLEDeviceCharacteristics(serverid) {
      return new Promise(function (resolve, reject) {
        wx.getBLEDeviceCharacteristics({
          deviceId: deviceId,
          serviceId: serverId,
          success: function (res) { resolve(res) },
          fail: function (res) { reject(res) }
        })
      })
    }
    function onResult(res) {

      for (var i = 0; i < res.characteristics.length; ++i) {

        if (res.characteristics[i].properties.indicate) {

          app.globalData.indicatecharacteristicId = res.characteristics[i].uuid

          break
        }
      }

      for (var i = 0; i < res.characteristics.length; ++i) {

        if (res.characteristics[i].properties.write) {

          app.globalData.writecharacteristicId = res.characteristics[i].uuid

          break
        }
      }

      self.onConnectSuccess()
    }

    onGetSystemInfo()
    .then(function(res){

      app.globalData.ios = (res.model.indexOf('iPhone') >= 0)

      return onOpenBluetoothAdapter()   
    })
    .then(function(){

      return onCreateConnection()
      
    })
    .catch(function(error){

      throw error
    })
    .then(function(){

      return onGetDeviceServices()

    })
    .catch(function (error) {

      throw error
      
    })
    .then(function(res){

      serverId = res.services[0].uuid

      return onGetBLEDeviceCharacteristics(serverId)

    })
    .catch(function(error){

      throw error
    })
    .then(function(res){

      onResult(res)
    })
    .catch(function(error){

      // self.onConnectFailed()
      setTimeout(function(){

        self.onConnectSuccess()

      }, 500)
    
      console.log(error)
    })
  },
})
