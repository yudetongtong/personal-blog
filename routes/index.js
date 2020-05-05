var express = require('express');
var router = express.Router();
const model = require('../model')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

//渲染注册页
router.get('/regist',(req,res,next)=>{
  res.render('regist',{})
})

//渲染登录页
router.get('/login',(req,res,next)=>{
  res.render('login',{})
})

module.exports = router;
