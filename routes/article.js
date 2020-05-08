var express = require('express');
var router = express.Router();
const fs = require('fs')
//图片上传插件
const multiparty = require('multiparty')
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
                console.log('写入成功')
                res.redirect('/')
            }
        })
    })
})

router.post('/delete',(req,res,next)=>{
    let title = req.body.title
    model.connectDb((db)=>{
        db.collection('articles').deleteOne({title},(err,ret)=>{
            if(err){
                console.log('删除失败')
            }else{
                console.log('删除成功')
            }
        })
    })
})

router.post('/upload',(req,res,next)=>{
    let form = new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
        if(err){
            console.log(上传失败)
        }else{
            console.log('文件列表',files)
            let file = files.filedata[0]

            let rs = fs.createReadStream(file.path)
            let newPath = '/uploads/' + file.originalFilename
            let ws = fs.createWriteStream('./public'+newPath)
            rs.pipe(ws)
            ws.on('close',()=>{
                console.log('文件上传成功')
                res.send({err:"",msg:newPath})
            })
            
        }
    })
})

module.exports = router;
