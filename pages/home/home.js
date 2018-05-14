//index.js
//获取应用实例
const app = getApp();
const Search = require('../../utils/search.js');



Page({
  data: {
    inputValue:"",
    disabled:true,//按钮是否可用
    temp:"",
    low:"",
    high:"",
    type:"",
    week:"",
    weather:"",
    aqi:"",
    modalHidden:true
  },
  //事件处理函数
  onLoad: function () {
    //页面加载
    // console.log('home load');   
  },
  onShow:function(){
    wx.playBackgroundAudio({

      dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      title: '',
      coverImgUrl: ''
    }) 
  },
  onHide:function()
  {
    wx.pauseBackgroundAudio();
  },
  viewTap:function(){
    // console.log('click home');
  },

  //输入框绑定事件
  bindKeyInput:function(e){
    let value = e.detail.value// 输入内容
    this.setData({
      inputValue:value,
      disabled:value.length == 0
    })
  },

  //查询按钮
  search:function(e){
    this.setData({
      disabled:true
    })
    let that = this;
    wx.request({
      url:Search.WEATHER_URL,
      headler:{
        "Content-Type": "application/json",
      },
      data:{
        "city":this.data.inputValue// 请求的城市参数名称
      },
      success:function(res){
        
        if (res.data.status === 1000) {
          var SearchData = res.data.data
          var TodayData = SearchData.forecast[0]
          // console.log(SearchData);
          that.setData({
            city:SearchData.city,
            temp:SearchData.wendu,
            weather:SearchData.ganmao,
            high:TodayData.high,
            low:TodayData.low,
            type:TodayData.type,
            week:TodayData.date,
            aqi:SearchData.aqi,
            modalHidden:false,
          });
        }else{
          wx.showModal({
           title: '查询失败',
           content: res.data.desc,
           success: function(res) {
            if (res.confirm) {
             console.log('用户点击确定')
            }
           }
          });
        }
      },
      fail:function(res){
        console.log(res.errMsg)
        wx.showModal({
         title: '查询失败',
         content: res.errMsg,
         success: function(res) {
          if (res.confirm) {
           console.log('用户点击确定')
          }
         }
        });
        that.setData({ //这个位置应该用page的引用调用
          modalHidden: true,
        });
      },
      complete: function () {
        console.log("接口请求完成")
      }
    });

  },


})
