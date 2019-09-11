
const HTTP=amount=>{
  return new Promise(function (resolve, reject) {
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      ...amount,
      success: function (res) {// 999008 用户未注册
        if (res.data.status == 200 || res.data.status == 999008) {
          resolve(res.data);
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '请求出错',
          icon: 'none',
          duration: 2000
        })
        reject();
      },
      complete: function () {

      }
    })
  })

}
module.exports=HTTP;

