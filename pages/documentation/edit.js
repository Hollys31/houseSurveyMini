// pages/documentation/edit.js
const app = getApp();
import { form } from '../../utils/form.js'
const API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL_BASE: app.globalData.API_BASE_URL,
    inputShow: true,
    addresShow: false,
    completeTime: 2019,
    showAddress: '',
    info: {},
    address: {},
    idCardFront: '',
    idCardBack: '',
    resid: [],//新增加户口本照片
    residenceImages: [],//户口本照片原始数据
    canClick:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    let saveInfo = app.globalData.saveInfo;
    const showAddress = saveInfo.province + "" + saveInfo.city + "" + saveInfo.distrinct + "" + saveInfo.town + "" + saveInfo.village + saveInfo.addrInfo;
    let residenceImages = saveInfo.residenceImages;
    residenceImages = residenceImages.map(function (item) {
      return item =item.imgPath
    })
    this.setData({
      info: saveInfo,
      showAddress: showAddress,
      idCardFront:saveInfo.idCardFront,
      idCardBack:  saveInfo.idCardBack,
      residenceImages: residenceImages
    })
    _this.data.address.province = saveInfo.province;
    _this.data.address.city = saveInfo.city;
    _this.data.address.distrinct = saveInfo.distrinct;
    _this.data.address.town = saveInfo.town;
    _this.data.address.village = saveInfo.village;
    _this.data.address.addrInfo = saveInfo.addrInfo;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toUploadPhoto: function (e) {//拍照上传
    const type = e.currentTarget.dataset.type;
    console.log(this.data.canClick);
    if (this.data.canClick == true) {
      this.data.canClick = false
      wx.navigateTo({
        url: '/pages/scansion/index?type=' + type,
      })
    }
  },
  editHouseToChecking: function () {//编辑房屋
    let obj = {}
    obj.openid = app.globalData.openid;
    obj.addrId = app.globalData.saveInfo.addrId;
    obj.headName = app.globalData.saveInfo.headName;//户名
    obj.idCardNo = app.globalData.saveInfo.idCardNo;//身份证号
    obj.headPhone = app.globalData.saveInfo.headPhone;//手机号
    obj = Object.assign(obj, this.data.address);//地址
    obj.completeTime = this.data.completeTime;//竣工时间
    obj.idCardFront = this.data.idCardFront;
    obj.idCardBack = this.data.idCardBack;
    obj.residenceImages = this.data.residenceImages.concat(this.data.resid);;
    if (this.data.address) {
      obj = Object.assign(obj, this.data.address);
    }
    console.log(obj);
    const isOK = form.validParams(obj);
    if (isOK === true) {
      API.updateInfo(obj).then(res => {
        console.log("资料编辑");
        console.log(res.data);
        app.globalData.saveInfo = res.data;
        wx.redirectTo({
          url: '/pages/documentation/auditing',
        })
      })
    }
  },
  bindDateChange: function (e) {//日期选择器
    this.setData({
      completeTime: e.detail.value
    })
  },
  deleteImg: function (e) {//删除图片
    const imgType = e.currentTarget.dataset.imgtype;
    if (imgType == 'residenceImages') {
      const ind = e.currentTarget.dataset.ind;
      let residenceImages = [];
      let currResidenceImages = this.data.residenceImages
      currResidenceImages.map(function (item, index) {
        if (index != ind) {
          residenceImages.push(item)
        }
      })
      console.log(residenceImages);
      this.setData({
        residenceImages: residenceImages
      });
    } else {
      this.setData({
        [imgType]: ""
      })
    }

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