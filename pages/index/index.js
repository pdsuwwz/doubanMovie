// pages/index/index.js
const App = getApp()

Page({

  data: {
    movies: [],
    loading: true,
    pageStart: 0,
    btnMore: true,
    btnMoreText: "More"
  },

  onLoad: function (options) {
    this.getMovieList()
    wx.setNavigationBarTitle({
      title: "loading..."
    })
  },

  onShow: function (options) {
    wx.setNavigationBarTitle({
      title: App.globalData.movieType
    })
  },

  getMovieList: function (callback) {
    callback = callback || function () { }
    wx.request({
      url: App.globalData.tagApi + App.globalData.movieType + "&start=" + this.data.pageStart,
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

  handleMore: function () {
    let { btnMore, btnMoreText } = this.data
    // 防止重复点击
    if (btnMore) {
      btnMore = false
      btnMoreText = "loading..."
      this.setData({
        btnMore,
        btnMoreText
      }) // 禁止点击底部加载更多按钮 ❎

      let { pageStart } = this.data // 获取更多电影数据
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
          }) // 恢复点击底部加载更多按钮 ✅
        })
      })
    } else { }
  },
  toDetails: function (e) {
    let { id } = e.target.dataset
    wx.navigateTo({
      url: '../details/details?id=' + id,
    })
  }
})