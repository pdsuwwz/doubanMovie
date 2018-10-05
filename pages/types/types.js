// pages/types/types.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieTypes: ["剧情", "喜剧", "动作", "爱情", "科幻", "动画", "悬疑", "惊悚", "恐怖", "犯罪", "同性", "音乐", "歌舞", "传记", "历史", "战争", "西部", "奇幻", "冒险", "灾难", "武侠", "情色"],
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "全部类型"
    })
  },

  onShow: function () {
    wx.setNavigationBarTitle({
      title: "全部类型"
    })
  },

  onHide: function () {

  },

  typesChange: function(e){
    if (Object.keys(e.target.dataset).length != 0){
      App.globalData.movieType = e.target.dataset.name
      wx.reLaunch({
        url: '../index/index',
      })
    }
  }

})