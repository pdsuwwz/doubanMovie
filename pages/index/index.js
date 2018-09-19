// pages/index/index.js
const app = getApp()

Page({

  data: {
    movies: [],
    movieType: "美国",
    loading: true,
    pageStart: 0
  },

  onLoad: function (options) {
    this.getMovieList()
  },

  onReady: function () {
  
  },

  onShow: function () {
  },

  onReachBottom: function () {
    
  },

  getMovieList: function() {
    wx.request({
      url: app.globalData.api + this.data.movieType + "&start=" + this.data.pageStart,
      header: {
        "content-type": 'json'
      },
      success: (res) => {
        let { movies, loading } = this.data
        movies = movies.concat(...res.data.subjects)
        loading = false
        this.setData({
          movies,
          loading
        })
      },
    })
  },

  handleMore: function(){
    let { pageStart } = this.data
    pageStart = pageStart + 20
    this.setData({
      pageStart
    }, () => {
      this.getMovieList()
    })
  }
})