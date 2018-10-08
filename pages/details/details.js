// pages/details/details.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    details: {}
  },

  onLoad: function (options) {
    let {id, details} = this.data
    id = options.id
    this.setData({
      id,
      details
    })
    this.getMovieDetails((res) => {   
      details = res.data
      console.log(details)
      this.setData({
        details
      })
      wx.setNavigationBarTitle({
        title: this.data.details.title
      })
    })
  },

  onReady: function(){
    wx.setNavigationBarTitle({
      title: "loading..."
    })
  },

  onHide: function(){
    let { id, data } = this.data
    id = 0
    data = {}
    this.setData({
      id
    })
  },
  getMovieDetails: function(callback){
    let {id} = this.data
    wx.request({
      url: App.globalData.detailsApi + id,
      header: {
        "content-type": 'json'
      },
      success: (res) => {
        callback(res)
      },
      fail: (res) => {
        console.log("fail: ", res)
      }
    })
  }
})