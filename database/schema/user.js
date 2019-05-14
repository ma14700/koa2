const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建用户Schema
const userSchema = new Schema({
  UserId: ObjectId,
  userName: {unique:true, type:String},
  password: String,
  createAt: {type:Date, default:Date.now()},
  lastLoginAt: {type:Date, default:Date.now()}
})

userSchema.pre('save', function(next){
  console.log(this)
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt,(err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      })
  })
})

//发布模型
mongoose.model('User',userSchema)