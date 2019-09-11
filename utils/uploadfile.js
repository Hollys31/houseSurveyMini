const app = getApp();
const API_BASE_URL = app.globalData.API_BASE_URL;
const uploadImg = function (context, fileUrl) {
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: API_BASE_URL + '/file/upload',
      filePath: fileUrl,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success(result) {
        resolve(JSON.parse(result.data));
      },
      fail(e) {
        wx.showModal({ title: '提示', content: '上传失败', showCancel: false });
        reject();
      },
      complete() {
        wx.hideToast(); //隐藏Toast
      }
    })
  })
}
module.exports = {
  uploadImg: uploadImg
}