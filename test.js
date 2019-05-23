const fs = require('fs')
const mongoose = require('mongoose')

fs.readFile('./data_json/category.json','utf8',(err,data)=>{
  data=JSON.parse(data)
  let saveCount=0
  const Category = mongoose.model('Category')
  data.RECORDS.map((value,index)=>{
      console.log(value)
      let newCategory = new Category(value)
      newCategory.save().then(()=>{
          saveCount++
          console.log('插入成功:'+saveCount)
      }).catch(error=>{
          console.log('插入失败:'+error)
      })
  })

})