<template>
    <div>
        <div class="order">
            <div class="headBar">
                <i @click="$router.push('/mine')"></i>
                <span>订单中心</span>
                <i @click="$router.push('/cart')"></i>
            </div>
            <div class="tabControl" ref="tabControl">
                <span v-for="li in list" :key="li">{{ li }}</span>
            </div>

            <div class="orderList">
                <ul ref="List">
                    <li :class="{ bg: obligation.length > 0 }">
                        <div class="hint" v-if="obligation.length < 1">
                            <i></i>
                            <span>您没有待付款订单</span>
                        </div>
                        <Item :obligation="obligation" @upObligation="upObligation" index="1"> </Item>
                    </li>
                    <li :class="{ bg: waitReceiving.length > 0 }">
                        <div class="hint" v-if="waitReceiving.length < 1">
                            <i></i>
                            <span>您没有待收货订单</span>
                        </div>
                        <Item :obligation="waitReceiving" index="2" @upShow="upShow">
                            <span slot="one">待收货</span>
                            <span slot="two">实付</span>
                        </Item>
                    </li>
                    <li :class="{ bg: evaluate.length > 0 }">
                        <div class="hint" v-if="evaluate.length < 1">
                            <i></i>
                            <span>您没有待评价订单</span>
                        </div>
                        <Item :obligation="evaluate" index="3" >
                            <span slot="one">待评价</span>
                            <span slot="two">实付</span>
                        </Item>
                    </li>
                    <li :class="{ bg: completed.length > 0 }">
                        <div class="hint" v-if="completed.length < 1">
                            <i></i>
                            <span>您没有已完成订单</span>
                        </div>
                        <Item :obligation="completed" index="4" @upCompleted="upCompleted">
                            <span slot="one">已完成</span>
                            <span slot="two">实付</span>

                        </Item>
                    </li>
                </ul>
            </div>
        </div>
        <vanPopup v-model="show" position="bottom" class="popup" :lock-scroll="true" :lazy-render="true" :style="{ height: '50%' }">
            <div class="wrap">
                <van-password-input class="int" :value="value" info="密码为 6 位数字" :focused="showKeyboard" @focus="showKeyboard = true" :error-info="error" />
                <van-number-keyboard class="number" :show="true" close-button-text="完成" @input="onInput" theme="custom" @delete="onDelete" @blur="ok" />
            </div>
        </vanPopup>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Item from './children/Item'
import swiper from './../../config/touch'
//
import { getObligation, getWaitReceiving, getEvaluate, addEvaluate, getCompleted } from './../../server/index'

export default {
    name: 'Order',
    data() {
        return {
            list: ['待付款', '待收货', '待评价', '已完成'],
            obligation: [],
            waitReceiving: [],
            evaluate: [],
            completed:[],
            show: false,
            value: '',
            showKeyboard: true,
            error:'',
            id:''
        }
    },
    components: {
        Item,
    },
    created() {
        this.UPDATE_TABSHOW(false)
        this.initData()
        this.$nextTick(() => {
            swiper(this.$refs.List, this.$refs.tabControl, 0.6, 160, this.$route.query.index,25)
        })
    },
    methods: {
        ...mapMutations(['UPDATE_TABSHOW']),
        async initData() {
            let resultObligation = await getObligation('')
            let resultWaitReceiving = await getWaitReceiving()
            let resultEvaluate = await getEvaluate()
            let resultCompleted = await getCompleted()
            this.completed = resultCompleted.data.data || []
            this.waitReceiving = resultWaitReceiving.data.data || []
            if (resultObligation.data.success_code) {
                this.obligation = resultObligation.data.data || []
            }
            this.evaluate = resultEvaluate.data.data || []
        },
        upObligation(obligation) {
            this.obligation = obligation
        },
        upCompleted(completed) {
            this.completed = completed
        },
        upShow(id){
            this.show = true;
            this.id = id;
        },
        onInput(key) {
            this.error = '' 
            this.value = (this.value + key).slice(0, 6)
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1)
        },
        async ok(){
            if(!this.show) return;
            if(this.value.length === 6){
                console.log(1);
                let result = await addEvaluate(this.id)
                this.evaluate = result.data.evaluate
                this.waitReceiving = result.data.waitReceiving
                this.show = false 
                this.value = '';
                
            }else{
               this.error = '密码不足6位' 
            }

        }
    },
    beforeDestroy() {
        this.UPDATE_TABSHOW(true)
    },
}
</script>
<style scoped>
.order {
    overflow: hidden;
}
.headBar {
    padding: 0.5rem 0.5rem;
    position: fixed;
    z-index: 99;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #333;
    box-sizing: border-box;
}
.headBar i {
    position: absolute;
}
.headBar i:nth-child(1) {
    left: 0.5rem;
    width: 1rem;
    height: 1.6rem;
    background: url('./../../images/icon_black_1.png') no-repeat;
    background-size: cover;
}
.headBar i:nth-child(3) {
    height: 1.6rem;
    right: 1rem;
    width: 1.6rem;
    background: url('./../../images/icon-cart-new.png') no-repeat;
    background-size: cover;
}
.bar {
    height: 0.7rem;
    width: 100%;
    background: #f9f9f9;
}
.tabControl {
    position: fixed;
    top: 2.4rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    background: #fff;
}
.active {
    color: #ca141d;
    position: relative;
}
.active::after {
    content: '';
    display: block;
    width: 80%;
    height: 0.14rem;
    background: #ca141d;
    position: absolute;
    bottom: -0.3rem;
    left: 50%;
    transform: translateX(-50%);
}
.orderList {
    width: 100%;
    position: fixed;
    top: 4.8rem;
    height: calc(100vh - 4.4rem);
    background: #f9f9f9;
}
.orderList ul {
    width: 400%;
    height: 100vh;
    display: flex;
    position: absolute;
    left: 0%;
    transform: translate3d(0, 0, 0);
}
.orderList ul li {
    width: 25%;
    padding-bottom: 8rem;
    overflow-y: scroll;
    position: relative;
}
.bg {
    background: #fff;
}
.orderList ul li div:nth-child(1) {
    border-top: 0.4rem solid #f9f9f9;
}
.orderList ul li:nth-child(1)::-webkit-scrollbar {
    display: none;
}
.hint {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -100%);
    display: flex;
    align-items: center;
    flex-direction: column;
}
.hint i {
    display: block;
    width: 7rem;
    height: 7rem;
    background: url('./../../images/new-list-empty.png') no-repeat;
    background-size: cover;
}
.hint span {
    font-size: 0.8rem;
    color: #999;
}
.int{
    margin-top: 1.6rem;
}
.wrap >>> i.van-key--blue{
    background: #ca141d;
}
.wrap >>> i.van-key--blue::after {
    border: none;
}
</style>
