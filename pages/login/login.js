// pages/login/login.js
import { form } from '../../utils/form.js'
const API = require('../../utils/api.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgID: '/resources/images/idCard.png',
    imgResid: '/resources/images/ownerErr.png',
    idShow: false,
    residShow: false,
    nameEmpty: false,
    idCardEmpty: false,
    headPhoneEmpty: false,
    inputShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  showModal: function (e) {
    const show = e.currentTarget.dataset.type;
    this.setData({
      [show]: true,
      inputShow: false,
    })
  },
  inputStateEvent: function () {//模态框
    this.setData({
      inputShow: true,
    })
  },
  focusEvent: function (e) {//输入框聚焦
    form.focusEvent(this, e)
  },
  blurEvent: function (e) {//输入框失去焦点
    form.blurEvent(this, e);
  },
  formSubmit:form.throttle(function (e) {//户主登录
      const _this = this;
      const errCount = form.formSubmit(this, e);
      let params = e.detail.value;
      params.type = 'applet';
      if (errCount == 0) {
        app.globalData.addParams = params;
        API.login(params).then(res => {
          const state = res.status;
          if (state == 999008) {//未注册
            wx.navigateTo({
              url: '/pages/documentation/add',
            })
          }
          if (state == 200) {//已注册
            app.globalData.saveInfo = res.data;
            app.globalData.saveInfo.residenceImages = res.data.registeredResidenceImageList;
            wx.navigateTo({
              url: '/pages/documentation/auditing?imgType=objImg',
            })
          }
        })
      }
    }, 2000),

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