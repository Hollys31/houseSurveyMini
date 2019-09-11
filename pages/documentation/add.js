// pages/documentation/add.js
const app = getApp();
import { form} from '../../utils/form.js'
const API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL_BASE: app.globalData.API_BASE_URL,
    residShow: false,
    addresShow: false,
    inputShow: true,
    imgResid: '/resources/images/addressErr.png',
    idCardEmpty: false,
    showAddress: '',
    address: {},
    completeTime: 2019,
    idCardFront: '',
    idCardBack: '',
    ownerRsid: "", //户主户口本照片
    resid: [], //户口本照片
    showUploadImg: true,
    clickCount: 0,
    canClick:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.canClick);
    if (options.type && options.type == 'reAdd') {
      this.setData({
        type: options.type,
        showUploadImg: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
  deleteImg: function (e) {//删除图片
    const imgType = e.currentTarget.dataset.imgtype;
    if (imgType == 'resid') {
      const ind = e.currentTarget.dataset.ind;
      let residenceImages = [];
      let currResidenceImages = this.data.resid;
      console.log(currResidenceImages);
      currResidenceImages.map(function (item, index) {
        if (index != ind) {
          residenceImages.push(item)
        }
      })
      console.log(residenceImages);
      this.setData({
        resid: residenceImages
      });
    } else {
      this.setData({
        [imgType]: ""
      })
    }
  },
  bindDateChange: function (e) { //日期选择器
    this.setData({
      completeTime: e.detail.value
    })
  },
  showModal: function (e) { //照片提示弹窗
    const show = e.currentTarget.dataset.type;
    this.setData({
      [show]: true,
      inputShow: false,
    })
  },
  inputStateEvent: function () { //模态框
    this.setData({
      inputShow: true,
    })
  },
  toUploadPhoto:function(e){//拍照上传
    const type = e.currentTarget.dataset.type;
    console.log(this.data.canClick);
    if (this.data.canClick==true){
      this.data.canClick=false
      wx.navigateTo({
        url: '/pages/scansion/index?type=' + type,
      })
    }
  },
  addHouseToChecking: function () { //添加房屋
    console.log("添加房屋");
    this.data.clickCount++;
    let obj = {}
    obj.openid = app.globalData.openid;
    obj.headName = app.globalData.saveInfo.headName;
    obj.idCardNo = app.globalData.saveInfo.idCardNo;
    obj.headPhone = app.globalData.saveInfo.headPhone;
    obj.idCardBack = app.globalData.saveInfo.idCardBack;
    obj.idCardFront = app.globalData.saveInfo.idCardFront;
    let residenceImages = app.globalData.saveInfo.registeredResidenceImageList || app.globalData.saveInfo.residenceImages;
    residenceImages = residenceImages.map(function (item) {
      return item.imgPath || item
    })
    obj.residenceImages = residenceImages
    obj.completeTime = this.data.completeTime;
    if (this.data.address) {
      obj = Object.assign(obj, this.data.address);
    }
    console.log(obj);
    const isOK = form.validParams(obj);
    if (isOK === true && this.data.clickCount < 2) {
      API.addInfo(obj).then(res => {
        console.log("添加房屋");
        console.log(res.data);
        app.globalData.saveInfo = res.data;
        wx.reLaunch({
          url: '/pages/documentation/auditing',
        })
      })
    }
  },
  submitToChecking: function () { //首次资料审核
    this.data.clickCount++;
    let obj = {}
    let rsidList = this.data.resid;
    obj.openid = app.globalData.openid;
    if (this.data.ownerRsid){
      let owneLis=[];
      owneLis.push(this.data.ownerRsid);
      console.log(owneLis);
      rsidList=rsidList.concat(owneLis)//户口本照片
    }else{
      wx.showToast({
        title: '请添加户主照片',
      })
    }
    obj.idCardFront = this.data.idCardFront; //身份证 正
    obj.idCardBack = this.data.idCardBack; //身份证 反
    obj.residenceImages = rsidList; //户口本
    obj.completeTime = this.data.completeTime; //竣工时间
    obj.openid = app.globalData.openid;
    if (this.data.address) {
      obj = Object.assign(obj, app.globalData.addParams, this.data.address);
    }
    const isOK = form.validParams(obj);
    console.log("首次提交资料");
    console.log(obj);
    if (isOK === true && this.data.clickCount < 2 && this.data.ownerRsid) {
       API.addInfo(obj).then(res => {
        app.globalData.saveInfo = res.data;
        console.log(res.data);
        wx.reLaunch({
          url: '/pages/documentation/auditing',
        })
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
})