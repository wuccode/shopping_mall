import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// 商品模型
const GoodsSchema = new Schema({
    name:String,
    img:String,
    price:Number,
    specification:String,
    discountPrice:Number,
    describe:String,
    affiliation:String,
    series:String,
    particular:{type:String,default:''},
});
const GoodsModel = mongoose.model('good', GoodsSchema);
export default GoodsModel;