import ajax from './ajax'
const BASE_URL = 'http://192.168.3.6:5000';
export const URL = BASE_URL;
//首页数据
export const getDataHome = () => ajax(BASE_URL + '/api/home');
//详情数据
export const getDataParticular = (id) => ajax(BASE_URL + '/api/particular',{id});
//评论数据
export const getDataComment = ({skip,limit,id}) => ajax(BASE_URL + '/api/comment',{skip,limit,id});
//分类数据
export const getDataGoods = (index) => ajax(BASE_URL + '/api/goodsSeek',{index});
//用户登录
export const userLogin = ({phone,account,password,code}) => ajax(BASE_URL + '/api/login',{phone,account,password,code}, 'post');
//发送验证码
export const sendCode = (phone,flag) => ajax(BASE_URL + '/api/sendCode',{phone,flag},'post');
//删除验证码
export const delCode = () => ajax(BASE_URL + '/api/delCode', {},'post');
//判断是否登录
export const isLogin = () => ajax(BASE_URL + '/api/isLogin',);
//判断验证码
export const isCode = (code,phone) => ajax(BASE_URL + '/api/isCode',{code,phone}, 'post');
//用户注册
export const register = (phone, account, pwd, isPwd) => ajax(BASE_URL + '/api/register',{phone,account,pwd,isPwd}, 'post');
//我的页面
export const mine = () => ajax(BASE_URL + '/api/mine',);
//退出登录
export const logout = () => ajax(BASE_URL + '/api/logout',);
//添加购物车商品
export const addCart = (goods) => ajax(BASE_URL + '/api/addCart',goods,'post');
//获取购物车商品
export const getCart = () => ajax(BASE_URL + '/api/getCart');
//购物车商品全选
export const allSelect = (value) => ajax(BASE_URL + '/api/allSelect',{value},'post');
//修改购物车商品数量和选中
export const updateCart = (id,key,value) => ajax(BASE_URL + '/api/updateCart',{id,key,value},'post');
//删除购物车
export const delCart = (arrId) => ajax(BASE_URL + '/api/delCart',{arrId},'post');
//获取收货地址
export const getAddress = () => ajax(BASE_URL + '/api/getAddress');
//添加收货地址
export const addAddress = (address) => ajax(BASE_URL + '/api/addAddress',address,'post');
//修改收货地址
export const updataAddress = (address) => ajax(BASE_URL + '/api/updataAddress',address,'post');
//删除收货地址
export const delAddress = (id) => ajax(BASE_URL + '/api/delAddress',{id},'post');
//获取代付款订单
export const getObligation = (serial) => ajax(BASE_URL + '/api/getObligation',{serial});
//添加代付款订单
export const addObligation = (obligation) => ajax(BASE_URL + '/api/addObligation',obligation,'post');
//删除代付款订单
export const delObligation = (id) => ajax(BASE_URL + '/api/delObligation',{id},'post');
//添加待收货订单
export const addWaitReceiving = (id) => ajax(BASE_URL + '/api/addWaitReceiving',{id},'post');
//获取待收货订单
export const getWaitReceiving = () => ajax(BASE_URL + '/api/getWaitReceiving');
//添加待评价订单
export const addEvaluate = (id) => ajax(BASE_URL + '/api/addEvaluate',{id},'post');
//获取待评价订单
export const getEvaluate = () => ajax(BASE_URL + '/api/getEvaluate');
//给对应商品添加评论
export const addComment = (formData) => ajax(BASE_URL + '/api/addComment',formData,'post');
//添加已完成订单
export const addCompleted = (id,serial) => ajax(BASE_URL + '/api/addCompleted',{id,serial},'post');
//获取已完成订单
export const getCompleted = () => ajax(BASE_URL + '/api/getCompleted');
//删除已完成订单
export const delCompleted = (id) => ajax(BASE_URL + '/api/delCompleted',{id},'post');



