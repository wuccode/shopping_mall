<template>
    <div :class="{ cart: true, show: token && cartGoods.length }">
        <div class="title">
            <span>购物车</span>
            <p v-show="!del && cartGoods.length && token" @click="del = true">编辑</p>
            <p v-show="del && cartGoods.length" @click="ok">完成</p>
        </div>
        <div class="main">
            <div class="noneCart" v-if="!count">
                <i></i>
                <span>{{ token ? '您的购物车没有商品' : '你还没有登录' }}</span>
                <router-link to="/home" v-if="token">
                    <span class="btn">去购物</span>
                </router-link>
                <router-link to="/login" v-else>
                    <span class="btn">去登陆</span>
                </router-link>
            </div>
            <div v-else>
                <ul>
                    <li v-for="(goods, index) in cartGoods" :key="goods._id">
                        <div class="head">
                            <div class="icon"><i ref="select" :class="{ select: goods.checked && !del }" @click="delCartSelect(goods._id, index, goods.checked)"></i></div>
                            <img :src="url + goods.img" alt="" />
                            <div class="content">
                                <p>{{ goods.goods }}</p>
                                <p>{{ goods.model }}</p>
                                <p><span>分期免息</span><span>积分双倍抵现</span></p>
                            </div>
                        </div>
                        <div class="bottomBar">
                            <span><small>¥</small>{{ goods.price }}</span>
                            <div>
                                <i @click="countAlter(index, goods.count - 1,goods._id)"></i>
                                <span>{{ goods.count }}</span>
                                <i @click="countAlter(index, goods.count + 1,goods._id)" class="add"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="fixedBottom" v-if="token && cartGoods.length">
            <div class="left">
                <i :class="{ select: checkAll && !del }" @click="checkAllSelect(checkAll)" ref="check"></i>
                <span>全选</span>
            </div>
            <div class="right">
                <span v-show="!del">总计:<em>¥{{ aggregate }}</em></span>
                <button v-show="!del" @click="submitGoods">结算({{ num }})</button>
                <button v-show="del" class="btnDel" @click="delCart">删除</button>
            </div>
        </div>
    </div>
</template>
<script>
import { URL } from './../../server/index'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name: 'Cart',
    data() {
        return {
            del: false,
            delGoods: [],
        }
    },
    computed: {
        ...mapState(['token', 'count', 'cartGoods']),
        url() {
            return URL
        },
        num() {
            return this.cartGoods.reduce((num, currentValue) => (currentValue.checked ? (num += currentValue.count) : num), 0)
        },
        checkAll() {
            return this.cartGoods.every((arr) => arr.checked)
        },
        aggregate() {
            return this.cartGoods.reduce((num, currentValue) => (currentValue.checked ? (num += currentValue.price * currentValue.count) : num), 0)
        },
    },
    created() {
        this.addCart()
    },
    methods: {
        ...mapActions(['addCart']),
        ...mapMutations(['DELETE_CARTGOODS', 'UPDATE_CARTGOODS', 'ALLSELECT_CARTGOODS']),
        delCartSelect(id, index, checked) {
            if (this.del) {
                let index = this.delGoods.indexOf(id)
                if (index !== -1) {
                    this.delGoods.splice(index, 1)
                    event.target.className = ''
                } else {
                    this.delGoods.push(id)
                    event.target.className = 'select'
                }
                if (this.delGoods.length === this.cartGoods.length) {
                    this.$refs.check.className = 'select'
                } else {
                    this.$refs.check.className = ''
                }
            } else {
                this.UPDATE_CARTGOODS({
                    index: index,
                    key: 'checked',
                    value: !checked,
                    id:id
                })
            }
        },
        ok() {
            this.del = false
            this.$refs.select.forEach((arr) => (arr.className = ''))
            this.delGoods = []
        },
        delCart() {
            if (this.delGoods.length < 1) return
            this.$dialog.confirm({ message: '确定要删除所选商品吗？', confirmButtonText: '确定' }).then(() => {
                this.DELETE_CARTGOODS(this.delGoods)
            })
        },
        checkAllSelect(checkAll) {
            if (this.del) {
                if (event.target.className !== 'select') {
                    this.$refs.select.forEach((arr) => (arr.className = 'select'))
                    this.cartGoods.forEach((arr) => this.delGoods.push(arr._id))
                    event.target.className = 'select'
                } else {
                    this.$refs.select.forEach((arr) => (arr.className = ''))
                    event.target.className = ''
                    this.delGoods = []
                }
            } else {
                this.ALLSELECT_CARTGOODS(!checkAll)
            }
        },
        countAlter(index, count,id) {
            if (count >= 1) {
                this.UPDATE_CARTGOODS({
                    index: index,
                    key: 'count',
                    value: count,
                    id:id
                })
            }
            // else{
            //     event.target.className = 'invalid';
            // }
        },
        submitGoods(){
            if(this.cartGoods.some((arr) => arr.checked)){
                this.$router.push('/submit')
            }else{
                this.$toast('你还没有选择商品哟')                
            }
        }
    },
}
</script>
<style scoped>
.cart {
    box-sizing: border-box;
    background: #f9f9f9;
    position: fixed;
    top: 2.4rem;
    bottom: 2.8rem;
    width: 100%;
    padding: 0 0.8rem;
    overflow-y: scroll;
}
.show {
    bottom: 5.6rem !important;
}
.title {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    text-align: center;
    height: 2.4rem;
    line-height: 2.4rem;
    background: #fff;
}
.title p {
    position: absolute;
    right: 1rem;
    top: 0;
    font-size: 0.88rem;
    color: #666;
}
.main {
    width: 100%;
    height: calc(100% - 2.4rem);
    position: relative;
}
.noneCart {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
}
.noneCart i {
    display: block;
    margin: 0 auto;
    position: relative;
    left: -0.2rem;
    width: 6rem;
    height: 6rem;
    background: url('./../../images/new-cart-empty.cc2a5c0.png') no-repeat;
    background-size: cover;
}
.noneCart span:nth-child(2) {
    color: #999;
    font-size: 0.82rem;
    margin-bottom: 0.5rem;
}
.noneCart span.btn {
    display: block;
    font-size: 0.76rem;
    margin: 0 1rem;
    padding: 0.4rem 1rem;
    border-radius: 1rem;
    color: rgb(102, 102, 102);
    border: 0.07rem solid #ccc;
}
ul li {
    width: 100%;
    height: 7rem;
    background: #fff;
    margin: 0.5rem 0 0.5rem 0;
    border-radius: 0.5rem;
    padding: 1rem 0;
}
ul li .head {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
ul li .head .icon {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    text-align: right;
    padding-right: 0.3rem;
}
ul li .head .icon i {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    /* border: 0.05rem solid #ccc; */
    border-radius: 50%;
    background: url('./../../images/select.png') no-repeat;
    background-size: cover;
}
.select {
    background-position: 0 -1.2rem !important;
}
ul li .head img {
    width: 4.6rem;
}
ul li .head .content {
    width: 18rem;
    padding: 0 0.6rem 0 0.3rem;
    align-self: start;
    font-size: 0.74rem;
    color: #333;
}
ul li .head .content p:nth-child(1) {
    word-break: break-all;
    height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
ul li .head .content p:nth-child(2) {
    line-height: 1.6rem;
    overflow: hidden;
    height: 1.2rem;
    color: #666;
    font-size: 0.64rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
ul li .head .content p:nth-child(3) {
    margin-top: 0.5rem;
    font-size: 0.6rem;
}
ul li .head .content p:nth-child(3) span {
    padding: 0.1rem 0.3rem;
    border: 0.05rem solid #ef5a62;
    color: #ef5a62;
    border-radius: 1rem;
    margin-right: 0.3rem;
}
ul li .bottomBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0.5rem;
    padding-left: 7rem;
}
ul li .bottomBar span {
    font-size: 0.88rem;
    color: #ca141d;
    font-weight: bold;
    display: inline-block;
    height: 1.4rem;
    vertical-align: top;
    line-height: 1.2rem;
}
ul li .bottomBar span small {
    font-size: 0.66rem;
}
ul li .bottomBar div span {
    display: inline-block;
    height: 1.4rem;
    vertical-align: top;
    line-height: 1.4rem;
    color: #333;
    font-size: 0.8rem;
    font-weight: 500;
}
ul li .bottomBar div i {
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
    text-align: center;
    border-radius: 50%;
    background: url('./../../images/input_number_minus.8442302.png') no-repeat;
    background-size: 200% 100%;
    margin: 0 0.6rem;
}
.invalid{
    background-position:-1.4rem 0 !important;
}
ul li .bottomBar div i.add {
    background: url('./../../images/input_number_add.8ccfc56.png') no-repeat;
    background-size: 200% 100%;
}
.fixedBottom {
    position: fixed;
    width: 100%;
    height: 2.8rem;
    bottom: 2.8rem;
    left: 0;
    right: 0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.fixedBottom .left {
    height: 2.8rem;
    line-height: 2.7rem;
}
.fixedBottom .left span {
    font-size: 0.76rem;
    color: #999;
    vertical-align: middle;
}
.fixedBottom .left i {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: url('./../../images/select.png') no-repeat;
    background-size: cover;
    margin: 0 0.5rem 0 1.5rem;
    vertical-align: middle;
    position: relative;
    top: -0.06rem;
}

.fixedBottom .right {
    height: 2.8rem;
    line-height: 2.8rem;
}
.fixedBottom .right span {
    font-size: 0.9rem;
    color: #333;
}
.fixedBottom .right span em {
    font-style: normal;
    color: #ca141d;
    margin-left: 0.5rem;
    vertical-align: middle;
    font-weight: bold;
    position: relative;
    top: -0.01rem;
}
.fixedBottom .right button {
    border: none;
    background: linear-gradient(90deg, #e43e2d, #ca141d);
    padding: 0rem 1.2rem;
    height: 2.2rem;
    color: #fff;
    font-size: 0.93rem;
    border-radius: 5rem;
    vertical-align: middle;
    line-height: 2.2rem;
    margin: 0 0.6rem;
    box-sizing: border-box;
    outline: none;
}
.btnDel {
    color: #333 !important;
    background: transparent !important;
    border: 0.08rem solid rgba(153, 153, 153, 0.377) !important;
}
</style>
