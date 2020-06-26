import mongoose  from 'mongoose'
const Schema = mongoose.Schema;

// 商品模型
const ParticularSchema = new Schema({
    swiper:[{Img:Array,meta:String}],
    title:String,
    size:[{describe:String,price:String}],
    comment:[{userName:String,date:String,content:String,star:Number,modelNumber:String,Img:Array,Like:Number,photo:String}],
    parameter:{content:Array},
    type:[]
});
const ParticularModel = mongoose.model('particular', ParticularSchema);
export default ParticularModel;