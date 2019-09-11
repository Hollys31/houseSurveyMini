const app = getApp();
const HTTP = require('./http.js');
const API_BASE_URL = app.globalData.API_BASE_URL;
module.exports = {
  login: (params = {}) => {//登录
    return HTTP({
      url: API_BASE_URL + '/user/login',
      method: 'GET',
      data: params
    })
  },
  addInfo: (params = {}) => {//资料添加
    return HTTP({
      url: API_BASE_URL + '/house/add',
      method: 'GET',
      data: params
    })
  },
  updateInfo:(params={})=>{//资料修改
    return HTTP({
      url: API_BASE_URL + '/house/update',
      method: 'GET',
      data: params
    })
  },
  address: (params = {}) => {//地区查询
    return HTTP({
      url: API_BASE_URL + '/house/branch',
      method: 'GET',
      data: params
    })
  },
  houselist: (params = {}) => {//获取房屋列表
    return HTTP({
      url: API_BASE_URL + '/house/applet_list',
      method: 'GET',
      data: params
    })
  },
}
