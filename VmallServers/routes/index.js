import router from './../common/router'
import Goods from '../models/Goods'
import { home, particular, comment, mine, goodsSeek, addComment, upload}  from './../controller/indexController'
import { login, sendCode, isLogin, logout, delCode, isCode, register }  from './../controller/userController'
import { addCart, getCart, allSelect, updateCart, delCart }  from './../controller/cartController'
import { getAddress, addAddress, updataAddress, delAddress }  from './../controller/addressController'
import { getObligation, addObligation, delObligation, addWaitReceiving, getWaitReceiving, addEvaluate, getEvaluate, getCompleted, addCompleted, delCompleted}  from './../controller/orderController'

//首页
router.get('/api/home', home)
//详情页
router.get('/api/particular', particular)
//评论
router.get('/api/comment', comment)
//商品分类
router.get('/api/goodsSeek', goodsSeek)
//登录
router.post('/api/login', login)
//退出登录
router.get('/api/logout', logout)
//发送验证码
router.post('/api/sendCode', sendCode)
//判断是否登录
router.get('/api/isLogin', isLogin)
//删除验证码
router.post('/api/delCode', delCode)
//判断验证码是否正确
router.post('/api/isCode', isCode)
//用户注册
router.post('/api/register', register)
//添加购物车商品
router.post('/api/addCart', addCart)
//获取购物车商品
router.get('/api/getCart', getCart)
//购物车商品全选
router.post('/api/allSelect', allSelect)
//修改购物车商品数量和选中
router.post('/api/updateCart', updateCart)
//删除购物车
router.post('/api/delCart', delCart)
//获取收货地址
router.get('/api/getAddress', getAddress)
//添加收货地址
router.post('/api/addAddress', addAddress)
//修改收货地址
router.post('/api/updataAddress', updataAddress)
//删除收货地址
router.post('/api/delAddress', delAddress)
//我的页面数据
router.get('/api/mine', mine)
//获取代付款订单
router.get('/api/getObligation', getObligation)
//添加代付款订单
router.post('/api/addObligation', addObligation)
//删除代付款订单
router.post('/api/delObligation', delObligation)
//添加待收货订单
router.post('/api/addWaitReceiving', addWaitReceiving)
//获取待收货订单
router.get('/api/getWaitReceiving', getWaitReceiving)
//添加待评价订单
router.post('/api/addEvaluate', addEvaluate)
//获取待评价订单
router.get('/api/getEvaluate', getEvaluate)
//获取已完成订单
router.get('/api/getCompleted', getCompleted)
//添加已完成订单
router.post('/api/addCompleted', addCompleted)
//删除已完成订单
router.post('/api/delCompleted', delCompleted)
//给对应商品添加评论
router.post('/api/addComment', upload.array('img', 6), addComment)

router.get('/api/searchGoods', async (req, res) => {
   let keyword = RegExp(req.query.keyword, 'i')
   let doc = await Goods.find()      
   if (doc) {
      res.json({
         data: doc.filter((arr) => keyword.test(arr.name.replace(/\s/g, '')) ? arr : null),
         success_code: true
      })
   } else {
      res.json({
         success_code: false
      })
   }
   // } else {
   //    res.json({
   //       hint: '没有登陆'
   //    })
   // }
})

export default router;
