// components/address/address.js
import {
  form
} from '../../utils/form.js'
const API = require('../../utils/api.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached: function() {
      const _this = this;
      this.getAddress('province', 1);

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    currLevel: 1,
    province: '',
    provinceList: [],
    city: '',
    cityList: [],
    distrinct: '',
    distrinctList: [],
    town: '',
    townList: [],
    village: '',
    villageList: [],
    addrInfo: '',
    group: '',
    num: '',
    groupEmpty: false,
    numEmpty: false, 
    currAddressName:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchModal: function(e) {
      console.log(e);
    },
    formSubmit: function(e) { //完成 并关闭模态框
      const params = e.detail.value;
      const errCount = form.formSubmit(this, e);
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1]; //当前页面
      let obj = {};
      obj.province = this.data.province;
      obj.city = this.data.city;
      obj.distrinct = this.data.distrinct;
      obj.town = this.data.town;
      obj.village = this.data.village;
      obj.addrInfo = params.group + "组" + params.num + "号";
      let showAddress = this.data.province + "" + this.data.city + "" + this.data.distrinct + "" + this.data.town +""+ this.data.village+"" + params.group+"组" + params.num+"号";
      if (errCount == 0) {
        currPage.setData({
          address: obj,
          showAddress: showAddress
        })
        this.setData({
          isShow: false
        })
        this.triggerEvent('addressEvent')
      }
    },
    focusEvent: function(e) { //输入框聚焦
      form.focusEvent(this, e)
    },
    blurEvent: function(e) { //输入框失去焦点
      form.blurEvent(this, e);
    },
    getAddress: function(name, level, parentName,type) { //获取地址请求
      const _this = this;
      if (!parentName) parentName = '';
      API.address({
        parentName: parentName,
        level: level
      }).then(res => {
        let address="";
        let currAddress="";
        if (type){
          const currAddressName = _this.data.currAddressName;
          address = _this.data[currAddressName];
           currAddress = address
        }else{
           currAddress = address || res.data.children[0];
        }
        const list = name + "List";
        _this.setData({
          [name]: currAddress,
          [list]: res.data.children,
        })
      })
    },
    getNextAddress: function(e) { //获取下一级地址信息
      const level = e.currentTarget.dataset.nextlevel;
      const val = e.currentTarget.dataset.val;
      const name = e.currentTarget.dataset.nextname;
      const currName = e.currentTarget.dataset.currname;
      this.getAddress(name, level, val);
      this.setData({
        [currName]:val,
        currLevel: parseInt(level)
      });
    },
    getAddressDetail: function(e) { //获取 组 号 的详细信息
      const val = e.currentTarget.dataset.val;
      this.setData({
        village:val,
        currLevel: 6
      })
    },
    updateAddress: function(e) {
      const _this = this;
      const level = parseInt(e.currentTarget.dataset.level);
      const name = e.currentTarget.dataset.name;
      this.setData({
        currLevel: level,
        currAddressName:name
      })
      switch (level) {
        case 1:
          _this.getAddress('province', 1,"",'tab');
          _this.setData({
            city: '',
            distrinct: '',
            town: '',
            village: '',
            addrInfo: ''
          })
          break;
        case 2:
          _this.getAddress('city', 2, _this.data.province, 'tab');
          _this.setData({
            distrinct: '',
            town: '',
            village: '',
            addrInfo: ''
          })
          break;
        case 3:
          _this.getAddress('distrinct', 3, _this.data.city, 'tab');
          _this.setData({
            town: '',
            village: '',
            addrInfo: ''
          })
          break;
        case 4:
          _this.getAddress('town', 4, _this.data.distrinct, 'tab');
          _this.setData({
            village: '',
            addrInfo: ''
          })
          break;
        default:
          _this.getAddress('distrinct', 5, _this.data.town, 'tab');
          _this.setData({
            addrInfo: ''
          })
      }
    }
  }
})