<template>
    <div class="pay" v-if="obligation.allPrice">
        <div class="head">
            <i @click="$router.push('/order?index=0')"></i>
            <span>收银台</span>
        </div>
        <div class="warning" ref="warning"></div>
        <div class="orderSection">
            <span>付款金额</span>
            <span>¥{{ obligation.allPrice }}.00</span>
        </div>
        <div class="orderDetails">
            <div>
                <span>收货信息:</span>
                <span>{{ obligation.shipping.name + ',' + obligation.shipping.tel.slice(0, 3) + '****' + obligation.shipping.tel.slice(-4) }}</span>
            </div>
            <div>
                <span>送货地址:</span>
                <span>{{ obligation.shipping.address }}</span>
            </div>
            <p>请选择支付方式</p>
        </div>
        <van-cell @click="show(1)">
            <div class="item">
                <span>微信支付</span>
                <i></i>
            </div>
        </van-cell>
        <van-cell @click="show(2)">
            <div class="item a">
                <span>支付宝</span>
                <i></i>
            </div>
        </van-cell>
        <van-popup v-model="showPopup" class="Popup"><van-loading type="spinner" />正在{{ hint }}</van-popup>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { getObligation, addWaitReceiving } from './../../server/index'
import { current } from './../../config/countDown'

export default {
    name: 'Pay',
    data() {
        return {
            showPopup: false,
            hint: '微信支付',
            obligation: {},
        }
    },
    created() {
        this.UPDATE_TABSHOW(false)
        this.initData()
    },
    methods: {
        ...mapMutations(['UPDATE_TABSHOW']),
        async show(i) {
            this.showPopup = !this.showPopup
            if (i === 1) {
                this.hint = '微信支付'
            } else {
                this.hint = '支付宝支付'
            }
            await addWaitReceiving(this.obligation._id);
            setTimeout(()=>{
                this.$router.push('/order?index=1')
            },1000)
        },
        async initData() {
            let result = await getObligation(this.$route.query.serial)
            if (result.data.success_code) {
                this.obligation = result.data.data[0]
                this.$nextTick(() => {
                    current(this.$refs.warning, this.obligation.time, 'P', async () => {
                            this.$router.push('/order?index=0')
                    })
                })
            }
        },
    },
    beforeDestroy() {
        this.UPDATE_TABSHOW(true)
    },
}
</script>
<style scoped>
.pay {
    width: 100%;
    height: calc(100vh);
    background: #efeff4;
    overflow: hidden;
}
.head {
    padding: 0.5rem 0.5rem;
    position: relative;
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
.head i {
    width: 1.2rem;
    height: 2rem;
    background: url('./../../images/icon_black_1.png') no-repeat;
    background-size: cover;
    position: absolute;
    left: 0.5rem;
}
.warning {
    width: 100%;
    padding: 0.5rem 0;
    background: #fffdd8;
    border-top: 0.08rem solid #e9e9e9;
    text-align: center;
    color: #999;
    font-size: 0.8rem;
    background: #fff;
    /* color: #da3232; */
}
.orderSection {
    display: flex;
    padding: 0.5rem 0.8rem;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    color: #da3232;
    background: #fff;
}
.orderSection span:nth-child(1) {
    font-size: 0.8rem;
    color: #333;
    font-weight: 400;
}
.orderDetails div {
    font-size: 0.7rem;
    padding: 0.2rem 0.8rem;
    display: flex;
    /* white-space: nowrap; */
    color: #666;
    background: #fff;
}
.orderDetails div span:nth-child(1) {
    flex: 1;
}
.orderDetails div span:nth-child(2) {
    flex: 5;
}
.orderDetails div:nth-child(2) {
    padding-bottom: 0.8rem;
}
.orderDetails div:nth-child(2) span:nth-child(2) {
    flex: 5;
    color: #da3232;
}
p {
    padding: 0.5rem 0.8rem;
    font-size: 0.76rem;
    color: #999;
}
.item {
    padding: 0.3rem 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.1rem 0;
}
.item span {
    font-size: 0.8rem;
    color: #000;
}
.item span::before {
    content: '';
    display: inline-block;
    /* position: absolute; */
    margin-right: 0.5rem;
    vertical-align: middle;
    width: 1.5rem;
    height: 1.2rem;
    background: url('./../../images/WXPAY.png') no-repeat;
    background-size: contain;
}
.a span::before {
    width: 1.5rem;
    height: 1.2rem;
    background: url('./../../images/ALIPAY.png') no-repeat;
    background-size: contain;
}

.item i {
    width: 0.5rem;
    height: 1.2rem;
    background: url('./../../images/icon-more-arrow-1.png') no-repeat;
    background-size: cover;
}
.Popup {
    padding: 1rem;
    overflow: hidden;
    display: flex;
    font-size: 0.76rem;
    color: #999;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    top: 40%;
}
.van-loading {
    margin-right: 0.5rem;
}
</style>
