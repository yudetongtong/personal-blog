var express = require('express');
var router = express.Router();
const model = require('../model')

/* GET home page. */
router.get('/', function(req, res, next) {
  let username = req.session.username
  res.render('index', { username:username,title:"首页" });
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
  let username = req.session.username || null
  res.render('write', { username: username, title: "写文章" })
})

module.exports = router;
