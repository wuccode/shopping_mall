<template>
    <div class="wrap">
        <div class="bgicon"></div>
        <div class="head">
            <div class="fixation" :style="{ opacity: top }">
                <div v-if="token">
                    <img :src="'http://localhost:5000' + photo" alt="" />
                    <span>{{ user }}</span>
                </div>
                <div v-else>
                    <router-link to="/login">
                        <img src="./../../images/defaultface_user_after.png" alt="" />
                        <span>登录/注册</span>
                    </router-link>
                </div>
            </div>
            <div class="photo" v-if="token">
                <img :src="'http://localhost:5000' + photo" alt="" />
            </div>
            <div class="photo" v-else>
                <router-link to="/login">
                    <img src="./../../images/defaultface_user_after.png" alt="" />
                </router-link>
            </div>
            <div v-if="token" class="content">{{ user }}</div>
            <router-link to="/login" v-else>
                <div class="content">登录/注册</div>
            </router-link>
            <div class="bottomBar">
                <div>
                    <p>{{ token ? '0' : '-' }}</p>
                    <p>积分</p>
                </div>
                <div>
                    <p>{{ token ? '0' : '-' }}</p>
                    <p>优惠券</p>
                </div>
                <div>
                    <p>{{ token ? '0.00' : '-' }}</p>
                    <p>代金券</p>
                </div>
            </div>
        </div>
        <div class="menu">
            <div class="title">
                <span>我的订单</span>
                <span>全部订单</span>
            </div>
            <div class="main">
                <div @click="orderIn(0)">
                    <i></i>
                    <span>待付款</span>
                    <div v-if="obligationTh && token" class="icon">{{ obligationTh }}</div>
                </div>
                <div @click="orderIn(1)">
                    <i></i>
                    <span>待收货</span>
                    <div v-if="waitReceivingTh && token" class="icon">{{ waitReceivingTh }}</div>
                </div>
                <div @click="orderIn(2)">
                    <i></i>
                    <span>待评价</span>
                    <div v-if="evaluateTh && token" class="icon">{{ evaluateTh }}</div>
                </div>
                <div @click="orderIn(3)">
                    <i></i>
                    <span>已完成</span>
                    <div v-if="completedTh && token" class="icon">{{ completedTh }}</div>
                </div>
            </div>
            <Swiper></Swiper>
        </div>
        <VipBox>
            <span slot="title">会员专享</span>
            <span slot="title">更多会员权益</span>
            <li slot="content">
                <p><small>￥</small>100</p>
                <p>华为品牌 100元优惠券</p>
                <span>领取</span>
            </li>
            <li slot="content">
                <p><small>￥</small>50</p>
                <p>【老用户专享】荣耀V30 PRO手机 50元优惠券</p>
                <span>领取</span>
            </li>
            <li slot="content">
                <p><small>￥</small>150</p>
                <p>华为品牌 150元优惠券</p>
                <span>领取</span>
            </li>
            <li slot="content">
                <p><small>￥</small>200</p>
                <p>华为品牌 200元优惠券</p>
                <span>领取</span>
            </li>
            <li slot="content">
                <p><small>￥</small>499</p>
                <p>华为品牌 499元优惠券</p>
                <span>领取</span>
            </li>
            <li slot="content">
                <p><small>￥</small>250</p>
                <p>华为品牌250元优惠券</p>
                <span>领取</span>
            </li>
        </VipBox>
        <IconBox></IconBox>
        <IconBox :s="true"></IconBox>
        <VipBox>
            <span slot="title">华为生活</span>
            <li class="simg" slot="content">
                <img src="./../../images/vbWjbV8qDpMZAEfVG6Rr.png" alt="" />
            </li>
            <li class="simg" slot="content">
                <img src="./../../images/SsPo08I0eVbYcxkbU6tP.png" alt="" />
            </li>
            <li class="simg" slot="content">
                <img src="./../../images/P4QEfc9ja3ryXeUhWskN.png" alt="" />
            </li>
        </VipBox>
        <Footer></Footer>
        <ButtonTop v-show="buttonTop" @BackTop="BackTop"></ButtonTop>
    </div>
</template>
<script>
import { mine } from './../../server/index'
import Swiper from './children/Swiper'
import VipBox from './children/VipBox'
import IconBox from './children/IconBox'
import Footer from './../../components/Footer'
import { scroll } from './../../config/scroll'
import ButtonTop from './../../components/ButtonTop'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            photo: '',
            user: '',
            buttonTop:false,
            obligationTh: 0,
            evaluateTh: 0,
            waitReceivingTh: 0,
            completedTh: 0,
            top: 0,
        }
    },
    computed: {
        ...mapState(['token']),
    },
    created() {
        this.initData()
        this.$nextTick(() => {
            scroll(() => {
                let scroll = document.body.scrollTop || document.documentElement.scrollTop
                let top = (scroll / 200).toFixed(1) >= 1 ? 1 : (scroll / 200).toFixed(1)
                this.top = top
                if(parseInt(scroll) > 500){
                    this.buttonTop = true       
                }else{
                    this.buttonTop = false
                }
            }, document)
        })
    },
    methods: {
        async initData() {
            let result = await mine()
            if (result.data.hint) {
                this.photo = result.data.photo
                this.user = result.data.user
                this.obligationTh = result.data.obligationTh
                this.evaluateTh = result.data.evaluateTh
                this.waitReceivingTh = result.data.waitReceivingTh
                this.completedTh = result.data.completedTh
            }
        },
        orderIn(index) {
            if (this.token) {
                this.$router.push('/order?index=' + index)
            } else {
                this.$router.push('/login')
            }
        },
        BackTop(){
            if(document.documentElement){
                document.documentElement.scrollTop = 0;
            }else{
                document.body.scrollTop.scrollTop = 0;
            }
            
        },
    },
    components: {
        VipBox,
        IconBox,
        Swiper,
        Footer,
        ButtonTop
    },
}
</script>
<style scoped>
.wrap {
    background: #f8f8f8;
    min-height: 100vh;
    overflow: hidden;
}
.bgicon {
    width: 140%;
    margin-left: -20%;
    margin-bottom: 2rem;
    height: 10rem;
    background: linear-gradient(120deg, #e97b32, #df212d 50%);
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
}
.head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    padding: 0 1rem 2rem 1rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.head .photo {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    overflow: hidden;
}
.head .photo img {
    width: 100%;
}
.head .content {
    color: #fff;
    font-size: 1.2rem;
    margin-left: 1rem;
}
.bottomBar {
    position: absolute;
    width: 94%;
    height: 4rem;
    background: #fff;
    bottom: -1.6rem;
    left: 50%;
    border-radius: 0.6rem;
    box-shadow: 0px 0.3rem 0.6rem 0 rgba(0, 0, 0, 0.04);
    transform: translateX(-50%);
    display: flex;
}
.bottomBar div {
    flex: 1;
    text-align: center;
    align-self: center;
    font-size: 0.72rem;
    color: #666;
    display: inline-block;
    position: relative;
}
.bottomBar div:nth-child(2)::before {
    content: '';
    display: inline-block;
    position: absolute;
    height: 1.2rem;
    width: 0.05rem;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #eaeaea;
}
.bottomBar div:nth-child(2)::after {
    content: '';
    display: inline-block;
    position: absolute;
    height: 1.2rem;
    width: 0.05rem;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #eaeaea;
}
.bottomBar div p:nth-child(1) {
    font-size: 1rem;
}
.menu {
    width: 94%;
    padding: 0.3rem 0;
    background: #fff;
    margin: 2.2rem auto 0.4rem auto;
    border-radius: 0.6rem;
    box-shadow: 0px 0.3rem 0.6rem 0 rgba(0, 0, 0, 0.04);
}
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.5rem 0.5rem 0.5rem;
}
.title span:nth-child(1) {
    font-weight: 900;
    font-size: 0.8rem;
}
.title span:nth-child(2) {
    font-size: 0.7rem;
    color: #999;
}
.title span:nth-child(2)::after {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.9rem;
    background: url('./../../images/icon-more-arrow-1.png') no-repeat;
    background-size: contain;
    vertical-align: bottom;
    margin-left: 0.1rem;
}
.main {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 0 0.5rem;
    padding-bottom: 0.5rem;
}
.main div {
    flex: 1;
    align-self: center;
    text-align: center;
    position: relative;
}
.main div i {
    display: block;
    width: 60%;
    height: 2.4rem;
    margin: 0 auto;
    background: url('./../../images/下载.png') no-repeat;
    background-size: cover;
    /* background-position: 0 -2.4rem; */
}
.main div:nth-child(2) i {
    background-position: 0 -2.86rem !important;
}
.main div:nth-child(3) i {
    background-position: 0 -5.66rem !important;
}
.main div:nth-child(4) i {
    background-position: 0 -8.56rem !important;
}

.main div span {
    font-size: 0.68rem;
    color: #666;
}
.main div .icon {
    position: absolute;
    background: #df212d;
    width: 0.7rem;
    height: 0.7rem;
    color: #fff;
    font-size: 0.6rem;
    line-height: 0.7rem;
    text-align: center;
    border-radius: 50%;
    top: 0.4rem;
    right: 1.3rem;
    border: 0.04rem solid #fff;
}
.fixation {
    position: fixed;
    width: 100vw;
    top: 0;
    padding: 0.2rem 0;
    background: linear-gradient(120deg, #e97b32, #df212d 50%);
    left: 0;
    z-index: 9999;
    opacity: 0;
    display: flex;
    align-items: center;
}
.fixation img {
    width: 2.2rem;
    border-radius: 50%;
    margin-left: 1rem;
    vertical-align: middle;
}
.fixation span {
    color: #fff;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    vertical-align: middle;
}
</style>
