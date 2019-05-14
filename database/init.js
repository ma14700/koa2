const mongoose = require('mongoose')
const db = "mongodb://localhost/simle-db"
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

mongoose.Promise = global.Promise

exports.connect = ()=>{
  mongoose.connect(db)

  let maxConnectTimes = 0

  return new Promise((resolve,reject)=>{
    mongoose.connection.once('open',()=>{
      console.log('数据库连接成功')

      resolve()
    })
  
    mongoose.connection.on('disconnected',()=>{
      console.log('***********数据库断开***********')
      mongoose.connect(db)
      if(maxConnectTimes<3){
        maxConnectTimes ++
      } else {
        reject()
        throw new Error ('重连次数3次以上，关闭')
      }
    })
  
    mongoose.connection.on('error', err=>{
      console.log('出错了,去重连',err)
      console.log('***********数据库错误')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
            }
      mongoose.connect(db)
    })
  })
}