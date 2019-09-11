// pages/auditList /auditList .js
const app = getApp();
const API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currPage: 1,
    houseList: [],
    modalShow: false,
    phoneNumber: '40087512225',//客服电话
     canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHouseList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getHouseList: function () {//获取房屋列表
    const _this = this;
    let info = app.globalData.saveInfo;
    let openid=app.globalData.openid;
    API.houselist({
      openid: openid,
      headName: info.headName,
      idCardNo: info.idCardNo,
      headPhone: info.headPhone,
      pageNum: _this.data.currPage,
      pageSize: 3
    }).then(res => {
      if (res.data.list && res.data.list.length > 0) {
        const list = _this.data.houseList.concat(res.data.list);
        const initList = res.data.list[0];
        initList.residenceImageList = initList.registeredResidenceImageList;
        app.globalData.saveInfo = initList;
        _this.setData({
          houseList: list
        })
      }
    })
  },
  openModal: function () {//客服
    this.setData({
      modalShow: true
    })
  },
  closeModal: function () {//取消
    this.setData({
      modalShow: false
    })
  },
  makePhoneCall: function () {//拨打电话
    wx.makePhoneCall({
      phoneNumber: _this.data.phoneNumber
    })
  },
  tonextPage: function (e) {
    const state = e.currentTarget.dataset.state;
    let params = e.currentTarget.dataset.params;
    params.residenceImages = params.registeredResidenceImageList;
    app.globalData.saveInfo = params;
    console.log(state);
    if (state == "UD" || state=='DL') {//已提交
      wx.navigateTo({
        url: '/pages/documentation/auditing?imgType=objImg',
      })
    }
    if (state == "RJ") {//审核驳回

      wx.navigateTo({
        url: '/pages/documentation/edit',
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
    this.data.currPage = this.data.currPage + 1;
    this.getHouseList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})