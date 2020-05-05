const mongodb = require('mongodb')

const url = 'mongodb://localhost:27017'

const dbName = 'project'

//数据库连接方法
function connectDb(callback){
    mongodb.connect(url,(err,client)=>{
        if(err){
            console.log('数据库连接错误')
        }else{
            console.log('数据库连接成功')
            let db = client.db(dbName)
            callback && callback(db)
            client.close()
        }
    })
}

module.exports = {connectDb}