<template>
    <div>
        <tab v-show="(!isShow && tabShow && $route.path.includes('/home')) || $route.path.includes('/category') || $route.path.includes('/cart') || $route.path.includes('/mine')">
            <tabItem v-slot="tab" to="/home" color="#D13441">
                <img :src="tab.active ? icon.a : icon.b" />
                <div>首页</div>
            </tabItem>
            <tabItem v-slot="tab" to="/category" color="#D13441">
                <img :src="tab.active ? icon1.a : icon1.b" />
                <div>分类</div>
            </tabItem>
            <tabItem v-slot="tab" to="/cart" color="#D13441">
                <img :src="tab.active ? icon2.a : icon2.b" />
                <div>购物车</div>
                <span v-show="count">{{ count >= 99 ? '99+' : count }}</span>
            </tabItem>
            <tabItem v-slot="tab" to="/mine" color="#D13441">
                <img class="imgMax" :src="tab.active ? icon3.a : icon3.b" />
                <div>我的</div>
            </tabItem>
        </tab>

        <tab v-show="isShow && tabShow && !$route.path.includes('/login')">
            <tabItem to="/home" color="#D13441">
                <img :src="iconMax.a" />
                <div class="min">首页</div>
            </tabItem>
            <tabItem color="#D13441">
                <img :src="iconMax.b" />
                <div class="min">客服</div>
            </tabItem>
            <tabItem to="/cart" color="#D13441">
                <img :src="iconMax.c" />
                <div class="min">购物车</div>
                <span v-show="count" class="con">{{ count >= 99 ? '99+' : count }}</span>
            </tabItem>
            <tabItem class="iconMax">
                <div class="left" @click="addCart">加入购物车</div>
                <div class="right" @click="addSubmit">立即购买</div>
            </tabItem>
        </tab>
    </div>
</template>
<script>
import tab from './Tabbar/tab'
import tabItem from './Tabbar/tabItem'
import { addCart } from './../server/index'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'Tab',
    computed: {
        ...mapState(['tabShow', 'addCartGoods', 'count','token']),
        isShow() {
            return this.$route.path.includes('/product')
        },
    },
    methods: {
        ...mapMutations(['UPDATE_COUNT']),
        async addCart() {
            // console.log(this.cartGoods);
            let result = await addCart(this.addCartGoods)
            if (result.data.success_code === 200) {
                this.$toast('添加成功')
                this.UPDATE_COUNT(result.data.count)
            } else {
                this.$router.push('/login')
            }
        },
        addSubmit() {
            if (this.token) {
                this.$router.push('/submit?can=1')
            } else {
                this.$router.push('/login')
            }
           
        },
    },
    components: {
        tab,
        tabItem,
    },
    data() {
        return {
            iconMax: {
                a: require('./../images/icon-home-black.png'),
                b: require('./../images/icon-service-black.png'),
                c: require('./../images/icon-cart-black.png'),
            },
            icon: {
                a: require('./../images/home_active.png'),
                b: require('./../images/home.png'),
            },
            icon1: {
                a: require('./../images/category_active.png'),
                b: require('./../images/category.png'),
            },
            icon2: {
                a: require('./../images/cart_active.png'),
                b: require('./../images/cart.png'),
            },
            icon3: {
                a: require('./../images/mine_active.png'),
                b: require('./../images/mine.png'),
            },
        }
    },
}
</script>
<style scoped></style>
