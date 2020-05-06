var express = require('express');
var router = express.Router();
const model = require('../model')

router.post('/add',(req,res,next)=>{
    let data = {
        title : req.body.title,
        content : req.body.content,
        timeId : Date.now(),
        username : req.session.username
    }

    model.connectDb((db)=>{
        db.collection('articles').insertOne(data,(err,ret)=>{
            if(err){
                console.log('文章发布失败')
                res.redirect('/write')
            }else{
                res.redirect('/')
            }
        })
    })
})

module.exports = router;
