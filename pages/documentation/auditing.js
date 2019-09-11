// pages/documentation/auditing.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL_BASE: '',
    checkData: {},
    noFirst:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      URL_BASE: app.globalData.API_BASE_URL,
      checkData: app.globalData.saveInfo
    })
    if (options.imgType =='objImg'){
      this.setData({
        noFirst:false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  preViewImages:function(e){//图片预览
    const url = e.currentTarget.dataset.url;
    if (url !== this.data.URL_BASE){
      wx.previewImage({
        current: url,
        urls: [url] // 需要预览的图片http链接列表
      })
    }
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