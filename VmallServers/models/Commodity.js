import mongoose from 'mongoose'
const Schema = mongoose.Schema;
// 商品模型
const CommoditySchema = new Schema({
    //轮播图
    slideshow:[{Img:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}],
    //精灵图
    sprite:{Img:String,item:[{text:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}]},
    //秒杀
    seckill:[{Img:String,text:String,promotion:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}],
    //grid
    channel:[{Img:String,title:String,promotion:String,price:String,discount_price:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}],
    //精品推荐
    recommendation:[{Img:String,title:String,promotion:String,price:String,discount_price:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}],
    //phone
    phone:[{Img:String,title:String,promotion:String,price:String,discount_price:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}],
    //笔记本
    notebook:[{Img:String,title:String,promotion:String,price:String,discount_price:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}],
    //平板
    tablet:[{Img:String,title:String,promotion:String,price:String,discount_price:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}],
    //配件
    accessories:[{Img:String,title:String,promotion:String,price:String,discount_price:String,particular:{type:mongoose.SchemaTypes.ObjectId,ref:'particular'}}],
});

const CommodityModel = mongoose.model('commodity', CommoditySchema);
export default CommodityModel;