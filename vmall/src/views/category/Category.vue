<template>
    <div class="wrap">
        <Search></Search>
        <div class="mainCategory">
            <div class="leftList" ref="leftList" @touchmove.prevent>
                <ul>
                    <li @click="switchIndex(index)" v-for="(list, index) in leftList" :key="list" ref="List">
                        <span :class="{ active: index === leftIndex }">{{ list }}</span>
                    </li>
                    <i ref="icon"></i>
                </ul>
            </div>
            <div class="rightList">
                <div class="rightMain" v-for="series in seriesList" :key="series">
                    <div>{{ series }}</div>

                    <div v-for="goods in list(series)" :key="goods._id">
                        <router-link :to="'/product?id=' + goods.particular">
                            <div
                                class="img"
                                v-lazy:background-image="'http://localhost:5000' + goods.img"
                                :style="{
                                    background: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                }"
                            ></div>
                            <span>{{ goods.name }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getDataGoods } from './../../server/index';
import Search from './../../components/Search'
import BScroll from 'better-scroll'
export default {
    naem: 'Category',
    data() {
        return {
            value: '',
            scroll: null,
            leftIndex: 0,
            leftList: ['华为手机', '荣耀手机', '笔记本', '平板', '智能穿戴', '耳机音箱', '配件', '智慧屏', '生态产品', '增值服务', '智能计算'],
            seriesList: [],
            goodsList: [],
        }
    },
    created() {
        this.initData()
        this.$nextTick(() => {
            this.initScroll()
        })
    },
    components:{
        Search
    },
    computed: {},
    methods: {
        list(s) {
            return this.goodsList.filter((arr) => arr.series == s)
        },
        async initData() {
            let result = await getDataGoods(1)
            if (result.status === 200) {
                this.seriesList = result.data.series
                this.goodsList = result.data.data
            }
        },
        initScroll() {
            this.scroll = new BScroll(this.$refs.leftList, {
                // click: true,
                scrollX: false,
                scrollY: true,
                preventDefault: false,
                swipeBounceTime: 100,
                bounce: {
                    top: false,
                },
            })
        },
        async switchIndex(index) {
            this.leftIndex = index
            this.$refs.icon.style.top = 1 + 3.4 * index + 'rem'
            this.scroll.scrollToElement(this.$refs.List[index], 600, false, true)
            let result = await getDataGoods(index + 1)
            if (result.status === 200) {
                this.seriesList = result.data.series
                this.goodsList = result.data.data
            }
        },
    },
}
</script>
<style scoped>
.mainCategory {
    position: fixed;
    width: 100vw;
    /* height: 100vh; */
    /* calc(100vh - 2.8rem - 2.8rem); */
    top: 2.8rem;
    bottom: 2.8rem;
}
.leftList {
    position: fixed;
    width: 6rem;
    top: 2.8rem;
    bottom: 2.8rem;
    overflow: hidden;
    background: #fff;
}
.leftList ul li {
    /* width: 100%; */
    height: 1.4rem;
    line-height: 1.4rem;
    padding: 1rem 0;
    margin-left: 1rem;
    font-size: 0.76rem;
    color: #333;
}
.leftList ul {
    position: relative;
}
.leftList ul i {
    position: absolute;
    right: 0.5rem;
    background: #e01d20;
    width: 0.1rem;
    height: 1.3rem;
    top: 1rem;
    transition: all 0.2s ease;
}
/* 1  4.4 7.8*/
.leftList ul li span {
    display: inline-block;
    height: 1.3rem;
    line-height: 1.3rem;
    width: 100%;
    white-space: nowrap;
}
.active {
    color: #e01d20;
}
.rightList {
    padding-left: 6.4rem;
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.rightList .rightMain {
    display: grid;
    width: 68%;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0;
}
.rightList .rightMain div:nth-child(1) {
    grid-column: 1/4;
    font-size: 0.76rem;
    color: #333;
}
.rightList .rightMain .img {
    width: 56%;
    height: 2.8rem;
    margin: 0 auto;
    margin-bottom: 0.8rem;
}
.rightList .rightMain span {
    display: block;
    width: 80%;
    margin: 0 auto;
    height: 2.8em;
    overflow: hidden;
    font-size: 0.6rem;
    line-height: 1.4em;
    color: #666;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
