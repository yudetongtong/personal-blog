var express = require('express');
var router = express.Router();
const model = require('../model')
const moment = require('moment')

/* GET home page. */
router.get('/',function(req, res, next) {
  let username = req.session.username
  //当前页数
  let page = req.query.page || 1 
  let totalData = {
    total:0,//文章总共有多少页
    nowPage:page,//当前页
    list:[]//当前页的文章列表
  }

  let pageSize = 2 ;//每页请求两条数据

  model.connectDb((db)=>{
    //第一步，查询所有文章
    db.collection('articles').find().toArray((err, ret) => {
      console.log('文章列表', err)
      
      totalData.total = Math.ceil(ret.length / pageSize) 
      //第二步，查询当前页的文章列表
      model.connectDb((db)=>{
        db.collection('articles').find().sort({_id:-1}).limit(pageSize).skip((page-1)*pageSize).toArray((err,ret2)=>{
          ret2.map((item, index) => {
            item['time'] = moment(item.timeId).format('YYYY-MM-DD HH:mm:ss')
          })
          totalData.list = ret2
          res.render('index', { username, title: "首页", totalData });
        })
      })
    })
  })
});

//渲染注册页
router.get('/regist',(req,res,next)=>{
  res.render('regist',{})
})

//渲染登录页
router.get('/login',(req,res,next)=>{
  res.render('login',{})
})

//渲染写文章页面
router.get('/write',(req,res,next)=>{
  let username = req.session.username
  res.render('write', { username: username, title: "写文章" })
})

module.exports = router;
