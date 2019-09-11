// pages/scansion/index.js

import {uploadImg} from '../../utils/uploadfile.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    modalShow: true,
    cameraShow: false,
    type: '', //扫描照片类型
    clickCount:0,
    photoClickCount:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.photoClickCount=0;
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
    this.setData({
      mgSrc: ''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.data.canClick = true;
  },
  toTakePhoto: function () { //了解示意图后去拍照
    this.setData({
      modalShow: false,
      cameraShow: true
    })
  },
  takePhotos: function () { //拍照
    const _this = this;
    const ctx = wx.createCameraContext()
    this.data.photoClickCount++;
    if (this.data.photoClickCount<2){
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          _this.setData({
            cameraShow: false,
            imgSrc: res.tempImagePath
          })
        }
      })
    }
  },
  newTackPhoto: function () { //重新拍照
    this.data.photoClickCount=0
    this.setData({
      imgSrc: '',
      cameraShow: true
    })
  },
  sureToUpload: function () { //确认上传
    const _this=this;
    this.data.clickCount++;
    if (this.data.clickCount<=1){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      uploadImg(this, this.data.imgSrc).then(res => {
        const fileName = res.data.fileName;
        const type = _this.data.type;
        if (type && fileName) {
          if (type == 'resid') {
            const urls = prevPage.data.resid;
            urls.push(fileName);
            console.log(urls);
            prevPage.setData({
              [type]: urls
            })
          } else {
            prevPage.setData({
              [type]:fileName
            })
          }
          _this.data.photoClickCount=0;
          wx.navigateBack({
            delta: 1
          })
        }
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