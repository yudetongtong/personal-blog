var express = require('express');
var router = express.Router();
const model = require('../model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//这是一个注册接口
router.post('/regist',(req,res,next)=>{
  let data = {
    username:req.body.username,
    password:req.body.password,
    confirmPassword: req.body.confirmPassword
  }
  //数据校验
  model.connectDb((db)=>{
    db.collection('users').insertOne(data,(err,ret)=>{
      if(err){
        console.log('注册失败')
        res.redirect('/regist')
      }else{
        res.redirect('/login')
      }
    })
  })
})

//登录接口
router.post('/login',(req,res,next)=>{
  let data = {
    username:req.body.username,
    password:req.body.password
  }
  //数据校验 判断用户名是否为空
  
  model.connectDb((db)=>{
    db.collection('users').findOne(data,(err,data)=>{
      if(err){
        res.redirect('/login')
      }else if(data){
        //登录成功，进行session回话存储
        req.session.username = data.username
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    })
  })
})

module.exports = router;
