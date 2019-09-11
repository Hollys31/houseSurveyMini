const form={
  focusEvent: function (context,e) {//输入框聚焦
  const that=this;
    const isEmpty = e.currentTarget.dataset.empty;
    context.setData({
      [isEmpty]: false
    })
  },
  blurEvent: function (context,e) {//输入框失去焦点
    const isEmpty = e.currentTarget.dataset.empty;
    if (e.detail.value) {
      context.setData({
        [isEmpty]: false
      })
    } else {
      context.setData({
        [isEmpty]: true
      })
    }
  },
  formSubmit: function (context,e) {//提交
    let params = e.detail.value;
    let arr = Object.keys(params);
    let errCount=0;
    arr.map(function (item, index) {
      let isempty = item + 'Empty';
      if (params[item]) {
        context.setData({
          [isempty]: false
        })
      } else {
        errCount++;
        context.setData({
          [isempty]: true
        })
      }
    })
    return errCount;
  },
  validParams: function (obj) {//校验必填信息
    if (obj.address == {} || obj.idCardFront == '' || obj.idCardBack == "" || !obj.residenceImages || obj.residenceImages.length < 2) {
      wx.showToast({
        icon:'none',
        title: '请将资料信息补充完整！',
      })
      return false;
    } else {
      return true
    }
  },
  throttle: function (fn, gapTime = 1500){
    let _lastTime = null
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments)   //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
  },
  debounce:function(fn,delay){//防抖函数 按钮多次提交执行最后一次
    let delays=delay||2000,
      timer,
      _this=this,
      args=arguments;
    return ()=>{
      if(timer){
        clearTimeout(timer);
      }
      timer=setTimeout(function(){
        timer=null;
        fn.apply(_this,args)
      },delays)
    }
  },
}
module.exports = {
  form:form
}