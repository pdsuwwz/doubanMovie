// pages/index/index.js
const app = getApp()

Page({

  data: {
    movies: [],
    movieType: "喜剧",
    loading: true,
    pageStart: 0,
    btnMore: true,
    btnMoreText: "More"
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

  getMovieList: function(callback) {
    callback = callback || function(){}
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
        callback()
      },
    })
  },

  handleMore: function(){
    let { btnMore, btnMoreText } = this.data
    if (btnMore){
      btnMore = false
      btnMoreText = "loading..."
      this.setData({
        btnMore,
        btnMoreText
      })
      let { pageStart } = this.data
      pageStart = pageStart + 20
      this.setData({
        pageStart
      }, () => {
        this.getMovieList(() => {
          btnMore = true
          btnMoreText = "More"
          this.setData({
            btnMore,
            btnMoreText
          })
        })
      })
    }
  }
})