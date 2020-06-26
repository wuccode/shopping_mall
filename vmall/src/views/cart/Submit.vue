<template>
    <div class="submit">
        <div class="head">
            <i @click="$router.go(-1)"></i>
            <span>确认订单</span>
        </div>
        <Address @setSelect="setSelect"></Address>
        <div>
            <div class="main" v-for="list in Goods" :key="list._id">
                <div class="left">
                    <img :src="url+list.img" alt="">
                </div>
                <div class="right">
                    <p>{{list.goods}}</p>
                    <p>{{list.model}}</p>
                    <p><span>¥{{list.price}}</span><span>x{{list.count}}</span></p>
                </div>
            </div>
        </div>
        <div></div>
        <div class="section">
            <div class="dispatching"><span>配送</span><span>标准配送 {{times + '(' + day +')'}}</span></div>
            <div class="dispatching"><span>发票</span><span><em>电子</em>普通发票-个人</span></div>
        </div>
        <div class="hrBorder"></div>
        <div class="section">
            <div class="dispatching"><span>优惠卷</span><span>无可用优惠卷<i></i></span></div>
            <div class="dispatching"><span>积分</span><span class="btn">0积分<van-switch v-model="checked" active-color="#ca141d" size="20px" /></span></div>
        </div>
        <div class="hrBorder"></div>
            <div class="dispatching"><span>商品总价</span><span>¥{{allPrice}}</span></div>
            <div class="dispatching"><span>配送费</span><span><em>+ ¥0</em></span></div>
        <div class="hrBorderW"></div>
        <div class="action">配送至: {{selectAddress.address}}</div>
        <div class="bottomBar">
            <span><small>¥</small>{{allPrice}}</span>
            <button @click="createOrder">提交订单</button>
        </div>
    </div>
</template>
<script>
import Address from './Address'
import {URL,addObligation,delCart, isLogin} from './../../server/index'
import { mapState, mapMutations } from 'vuex'
import {time} from './../../config/countDown'
export default {
    name: 'Submit',
    data() {
        return {
            checked:false,
            selectAddress:{},
            id:[],
            everyDay:['周日','周一','周二','周三','周四','周五','周六']
        }
    },
    components:{
        Address
    },
    computed: {
        ...mapState(['cartGoods','addCartGoods']),
        Goods() {
            return this.$route.query.can === '1' ? [{
                img:this.addCartGoods.img,
                count:1,
                price:this.addCartGoods.price,
                goods: this.addCartGoods.title,
                model:this.addCartGoods.color +','+ this.addCartGoods.size +','+ this.addCartGoods.type,
                particularId:this.addCartGoods.id

            }] : this.cartGoods.filter((arr) => arr.checked)
        },
        url(){
            return URL
        },
        times(){
            return time(0).split(' ')[0].replace(/\//g,'-')
        },
        day(){
            return this.everyDay[new Date().getDay()]
        },
        allPrice(){
            return this.Goods.reduce((num,currentValue)=>  num+=currentValue.price * currentValue.count, 0)
        } 
    },
    created() {                
        this.UPDATE_TABSHOW(false)        
        this.Goods.forEach(arr=>this.id.push(arr._id))
        
    },
    methods: {
        ...mapMutations(['UPDATE_TABSHOW','UPDATE_COUNT']),
        async createOrder(){
            if(!this.selectAddress.name) {
                this.$toast('你还没有选择地址哟')   
                return;             
            }
            let newOrder = {
                goods:[...this.Goods].map(arr => {
                   delete arr.checked
                   delete arr._id
                   delete arr.discountPrice
                   return arr
                }),
                allPrice:this.allPrice,
                time:time(30),
                serial:'11'+ ('0000000000' + Math.round(Math.random() * 9999999999)).slice(-10),
                count:this.Goods.reduce((num,currentValue)=> num+= currentValue.count,0),
                shipping:{
                    address:this.selectAddress.address,
                    name:this.selectAddress.name,
                    tel:this.selectAddress.tel
                }
            } 
            if( this.$route.query.can !== '1'){
                await delCart(this.id)
            }           
            await addObligation(newOrder)
            let result = await isLogin();
            this.UPDATE_COUNT(result.data.count)
            this.$router.push('/pay?serial='+newOrder.serial)
        },
        setSelect(select){
            this.selectAddress = select;            
        },
    },
    beforeDestroy() {
        this.UPDATE_TABSHOW(true)
    },
}
</script>
<style scoped>
.head {
    padding: 0.5rem 0.5rem;
    position: fixed;
    z-index: 99;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    color: #333;
    box-sizing: border-box;
}
.hrBorder {
    border-bottom: 0.7rem solid #f9f9f9;
}
.hrBorderW{
    border-bottom: 4rem solid #f9f9f9;
}
.head i {
    width: 1.2rem;
    height: 2rem;
    background: url('./../../images/icon_black_1.png') no-repeat;
    background-size: cover;
    position: absolute;
    left: 0.5rem;
}
.main{
    display: flex;
    align-items: center;
    padding: 1rem 0;
    margin: 0 1rem;
    border-bottom: 0.05rem solid rgba(153, 153, 153, 0.137);
}
.main .left{
    width: 7rem;
    margin-right:0.5rem ;
}
.main .left img{
    width: 5.6rem;
}
.main .right{
    align-self: start;
}
.main .right p{
    line-height: 1.3rem;
}
.main .right p:nth-child(1){
    font-size: 0.8rem;
    word-break: break-all;
    font-weight: bold;
    height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.main .right p:nth-child(2){
    font-size: 0.7rem;
    color: #999;
}
.main .right p:nth-child(3){
    line-height: 1.8rem;
    display: flex;
    justify-content: space-between;
}
.main .right p:nth-child(3) span:nth-child(1){
    color: #ca141d;
    font-weight: bold;
}
.main .right p:nth-child(3) span:nth-child(2){
    font-size: 0.68rem;
    color: #666;
}
.dispatching{
    margin: 0 1rem;
    padding: 0.6rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dispatching span:nth-child(1){
    font-size: 0.82rem;
    color: #666;
}
.dispatching span:nth-child(2){
    font-size: 0.8rem;
    color: #333;
    font-weight: bold;
    position: relative;
}
.dispatching span em{
    font-style: normal;
    color: #ca141d;
}
.dispatching i{
    display: inline-block;
    width: 1.5rem;
    height: 1rem;
    background: url('./../../images/icon_header_nav.png') no-repeat;
    background-size: cover;
    margin-left:0.2rem ;
    opacity: 0.5;
}
.section{
    padding: 0.5rem 0;
}
.btn{
    padding-right:2.6rem ;
}
.van-switch  >>>{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0rem;
}
.bottomBar{
    position: fixed;
    bottom: 0;
    height: 3rem;
    width: 100%;
    left: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    box-sizing: border-box;
}
.bottomBar button{
    background:linear-gradient(90deg,#e43e2d 0,#ca141d 100%);
    padding: 0.5rem 2.6rem;
    border: none;
    outline: none;
    color: #fff;
    font-size: 0.93rem;
    border-radius: 2rem;
}
.bottomBar span{
    font-size: 1.3rem;
    color: #ca141d;
    font-weight: bold;
}
.bottomBar span small{
    font-size: 0.93rem;
}
/*  */
.action{
    position: fixed;
    bottom: 3rem;
    height: 1.5rem;
    width: 100%;
    left: 0;
    background: #fbf5d5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #f26944;
    font-size: 0.7rem;
    line-height: 1.5rem;
    padding: 0 1rem;
    box-sizing: border-box;
}
</style>
