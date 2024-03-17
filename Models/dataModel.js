const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    image:String
})

const dataModel = mongoose.model("datas",dataSchema)
module.exports={dataModel}