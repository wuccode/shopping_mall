<template>
    <div>
        <div class="orderItem" v-for="list in obligation" :key="list._id">
            <div class="orderHead">
                <span>订单编号:{{ list.serial }}</span>
                <slot name="one">
                    <span>待支付<em ref="time"></em></span
                ></slot>
            </div>
            <div class="goods" v-for="li in list.goods" :key="li._id">
                <div class="left">
                    <img :src="url + li.img" alt="" />
                </div>
                <div class="right">
                    <p>{{ li.goods }}</p>
                    <p>{{ li.model }}</p>
                </div>
                <span class="price">¥{{ li.price }}</span>
                <span class="count">x{{ li.count }}</span>
                <span class="evaluate" v-if="index === '3'" @click="evaluate(li, list.serial)">
                    评价
                </span>
            </div>
            <div class="bottom">
                共件{{ list.count }}商品，<slot name="two">代付</slot>:<strong>¥{{ list.allPrice }}</strong
                ><i></i>
            </div>
            <div class="btnBar">
                <slot name="three">
                    <div v-if="index === '1'">
                        <button class="one" @click="cancel(list._id)">取消订单</button>
                        <button class="three" @click="pay(list.serial)">去支付</button>
                    </div>
                    <div v-if="index === '2'">
                        <button class="two">查看物流</button>
                        <button class="three" @click="$emit('upShow', list._id)">确定收货</button>
                    </div>
                    <div v-if="index === '4'">
                        <!-- <button class="three">评价</button> -->
                        <button class="one" @click="delCom(list._id)">删除订单</button>
                        <button class="two">查看物流</button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import { URL } from './../../../server/index'
import { delObligation, delCompleted } from './../../../server/index'
import { current } from './../../../config/countDown.js'
import { mapMutations } from 'vuex'
export default {
    name: 'Item',
    props: {
        obligation: Array,
        index: String,
    },
    data() {
        return {}
    },
    computed: {
        url() {
            return URL
        },
    },
    watch: {
        obligation() {
            this.$nextTick(() => {
                if (!this.$refs.time) return
                this.$refs.time.forEach((arr, index) => {
                    current(arr, this.obligation[index].time, '', async () => {
                        let result = await delObligation(this.obligation[index]._id)
                        this.$emit('upObligation', result.data.data)
                    })
                })
            })
        },
    },
    methods: {
        ...mapMutations(['ADD_EVALUATE']),
        pay(serial) {
            this.$router.push('/pay?serial=' + serial)
        },
        cancel(id) {
            this.$dialog.confirm({ message: '你确定要取消吗', confirmButtonText: '确定' }).then(async () => {
                let result = await delObligation(id)
                this.$emit('upObligation', result.data.data)
            })
        },
        evaluate(goods, serial) {
            this.ADD_EVALUATE({ ...goods, serial })
            this.$router.push('/evaluate')
        },
        delCom(id) {
            this.$dialog.confirm({ message: '你确定要删除吗', confirmButtonText: '确定' }).then(async () => {
                let result = await delCompleted(id)
                this.$emit('upCompleted', result.data.data)
            })
        },
    },
}
</script>
<style scoped>
.orderItem {
    padding: 0rem 0.8rem;
    border-bottom: 0.4rem solid #f9f9f9;
}
.orderHead {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0;
    border-bottom: 0.05rem solid rgba(153, 153, 153, 0.13);
}
.orderHead span:nth-child(1) {
    color: #999;
    font-size: 0.7rem;
}
.orderHead span:nth-child(2) {
    color: #ca141d;
    font-size: 0.76rem;
}
.orderHead span em {
    font-style: normal;
    margin-left: 0.3rem;
}
.goods {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    position: relative;
    padding-right: 2.6rem;
}
.goods .left {
    width: 5rem;
    margin-right: 0.5rem;
}
.goods .left img {
    width: 4.2rem;
}
.goods .right {
    align-self: start;
}
.goods .right p {
    line-height: 1.3rem;
}
.goods .right p:nth-child(1) {
    font-size: 0.7rem;
    word-break: break-all;
    height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.goods .right p:nth-child(2) {
    font-size: 0.66rem;
    color: #999;
}
.goods .right p:nth-child(3) {
    /* line-height: 1.8rem; */
    display: flex;
    justify-content: flex-end;
}
.price {
    position: absolute;
    right: 0rem;
    font-size: 0.66rem;
    top: 1.26rem;
}
.count,
.evaluate {
    position: absolute;
    right: 0rem;
    font-size: 0.66rem;
    top: 2.56rem;
    color: #999;
}
.bottom {
    padding: 0.2rem 0rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 0.05rem solid rgba(153, 153, 153, 0.13);
    font-size: 0.72rem;
    line-height: 1.6rem;
    position: relative;
}
.bottom strong {
    margin-left: 0.3rem;
    font-size: 0.8rem;
}
.bottom i {
    position: absolute;
    width: 0.7rem;
    height: 0.7rem;
    top: -0.4rem;
    right: 1rem;
    border-top: 0.05rem solid rgba(153, 153, 153, 0.13);
    border-left: 0.05rem solid rgba(153, 153, 153, 0.13);
    transform: rotate(45deg);
    background: #fff;
}
.btnBar {
    text-align: right;
    padding: 0.8rem 0;
    font-size: 0.77rem;
}
.btnBar button {
    margin-left: 0.5rem;
    width: 4rem;
    border-radius: 2rem;
    padding: 0.2rem 0;
    outline: none;
}
.btnBar button.one {
    background: none;
    border: 0.08rem solid rgba(153, 153, 153, 0.33);
}
.btnBar button.two {
    background: none;
    border: 0.08rem solid rgba(153, 153, 153, 0.33);
}
.btnBar button.three {
    background: linear-gradient(90deg, #e43e2d 0, #ca141d 100%);
    border: none;
    color: #fff;
}
.evaluate {
    top: 4.5rem;
    border: 0.06rem solid rgba(153, 153, 153, 0.185);
    padding: 0.1rem 0.5rem;
    color: #333;
    border-radius: 0.5rem;
}
</style>
