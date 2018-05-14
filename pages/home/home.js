//index.js
//获取应用实例
const config = require('../../conf.js');
const util = require('../../utils/util.js');
const request = require('../../utils/request.js');

const app = getApp()

Page({
  data: {
  	previewing:false,
  	navItems:[],
  	navBtnSelectIdx : 0,
  },
  //事件处理函数
  onLoad: function () {
  	this.loadTagData();
  },

  loadTagData(){
  	this.fetchTags().then((resp)=>{
  		if (resp.code !== 0) {
  			console.log("get   log   lgo       wromg")
  			return;
  		}
  		this.setData({'navItems':resp.data});
  	});
  },

  fetchTags(){
  	console.log('url:'+util.getUrl('/tags'));
  	return request({method:'GET',url:util.getUrl('/tags')});
  }


})
