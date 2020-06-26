import mongoose  from 'mongoose'
const Schema = mongoose.Schema;

// 用户模型
const UserSchema = new Schema({
    //用户名
    user: String,
    //头像
    photo: { type: String, default: '/update/userPhoto/defaultface_user.png' },
    //账号
    account: String,
    //手机号
    phone: String,
    //密码
    password: String,
    //代付款       
    obligation: [{ serial: String,count: Number, allPrice: Number, goods:[{goods:String,model: String,count: Number,img: String,particularId: String,price: Number}], time: String ,shipping:{address:String,name:String,tel:String}}],
    //代收货         订单号        价格          商品名       商品型号       数量         商品图片
    waitReceiving: [{ serial: String,count: Number, allPrice: Number, goods:[{goods:String,model: String,count: Number,img: String,particularId: String,price: Number}],shipping:{address:String,name:String,tel:String}}],
    evaluate:[{ serial: String,count: Number, allPrice: Number, goods:[{goods:String,model: String,count: Number,img: String,particularId: String,price: Number}],shipping:{address:String,name:String,tel:String}}], 
    //已完成      订单号        价格          商品名       商品型号       数量         商品图片
    
    completed: [{ serial: String,count: Number, allPrice: Number, goods:[{goods:String,model: String,count: Number,img: String,particularId: String,price: Number}],shipping:{address:String,name:String,tel:String}}],
    //购物车 价格        优惠前的价格           商品名       商品型号      数量          商品图片
    cart: [{ price: Number, discountPrice: Number, goods: String, model: String, count: Number, img: String, checked: { type: Boolean, default: true }, particularId: String }],
    //收货地址
    receiverAdd: [
        // _id: '1',
        {
            name: String,
            tel: String,
            address: String,
            addressDetail: String,
            isDefault: Boolean,
            province: String,
            city: String,
            county: String,
            areaCode: String,
        }
    ],
    //优惠卷
    coupons: [{ price: Number, time: String, describe: String }],
    flag: { type: Boolean, default: false }
});
const UserModel = mongoose.model('user', UserSchema);
export default UserModel;