const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/',async(ctx)=>{
  ctx.body = '用户首页'
})

router.post('/register',async(ctx)=>{
  ctx.body = ctx.request.body
})



module.exports = router