//app.js
const HTTP = require('/utils/http.js');
App({
  onLaunch: function () {
     this.getOpenId(); 
  },
  globalData: {//http://192.168.2.74:9999/api
    API_BASE_URL: "https://home.yufengtek.com/api",//https://home.yufengtek.com/api
    openid: '',
    session_key: '',
    addParams: {},//添加用户信息字段
    saveInfo: {}
  },
  wxLogin: new Promise(function (resolve, reject) {//微信登录
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject();
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }),
  getOpenId: function () {//获取openId
    const _this = this;
    new Promise(function (resolve, reject) {
      _this.wxLogin.then(code => {
        HTTP({
          url: _this.globalData.API_BASE_URL + '/user/getOpenid/' + code,
          method: 'GET',
          data: {}
        }).then(res => {
          _this.globalData.openid = res.data.openid;
          _this.globalData.session_key = res.data.session_key;
          resolve(res.data.openid)
        })
      })
    })
  },
})