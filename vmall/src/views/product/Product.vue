<template>
    <div :class="{ product: true }" ref="product">
        <div v-if="flag" class="productCon">
            <transition name="nav">
                <div class="navFixed" v-show="navFixed">
                    <div class="left" @click="$router.go(-1)"></div>
                    <span :class="{select:pos===0}" @click="moveLeft(0)">商品</span>
                    <span :class="{select:pos===1}" @click="moveLeft(1)">评价</span>
                    <span :class="{select:pos===2}" @click="moveLeft(2)">参数</span>
                    <span :class="{select:pos===3}" @click="moveLeft(3)">详情</span>
                    <div class="right"></div>
                    <i :style="{left:left}"></i>
                </div>
            </transition>
            <Swiper :swiperImg="Particular_data.swiper[colorIndex].Img"> </Swiper>
            <h1><small>¥</small>{{ Particular_data.size[typeIndex].price }}</h1>
            <p>{{ title }}</p>
            <div class="hrBorder"></div>
            <div class="items">
                <div class="side">颜色</div>
                <ul class="main">
                    <li @click="switchColor(index)" :class="{ active: colorIndex == index }" v-for="(list, index) in Particular_data.swiper" :key="list._id">
                        {{ list.meta }}
                    </li>
                </ul>
            </div>
            <div class="items">
                <div class="side">版本</div>
                <ul class="main">
                    <li @click="switchType(index)" :class="{ active: typeIndex == index }" v-for="(list, index) in Particular_data.size" :key="list._id">
                        {{ list.describe }}
                    </li>
                </ul>
            </div>
            <div class="items">
                <div class="side">类型</div>
                <ul class="main">
                    <li :class="{active:genreIndex === index}" v-for="(list, index) in Particular_data.type" :key="list" @click="switchGenre(index)">{{list}}</li>
                </ul>
            </div>
            <van-cell @click="showPopup" class="popup items">
                <div class="side">服务</div>
                <div class="main">
                    <span>已满48元包邮</span>
                    <span>由华为终端提供商品、发货开票及售后服务</span>
                </div>
                <div class="more"></div>
            </van-cell>
            <vanPopup v-model="show" closeable position="bottom" class="bottom" :lock-scroll="true" :lazy-render="true" :style="{ height: '60%' }">
                <h2>服务</h2>
                <div class="items isbottom">
                    <div class="side"></div>
                    <div class="main">
                        <span>已满48元包邮</span>
                        <span>满48元即免运费</span>
                    </div>
                    <div class="side n"></div>
                    <div class="main">
                        <span>由华为终端提供商品、发货开票及售后服务</span>
                        <span>由 华为终端 提供商品、发货开票及售后服务</span>
                    </div>
                </div>
            </vanPopup>
            <div class="hrBorder hrBottom"></div>
            <Comment @completeShow="completeShow" @childrenCon="childrenCon" :comment="comment" :commentData="comment.data" :commentReputation="comment.reputation" :commentCount="comment.count"></Comment>
            <div class="line">
                <i></i>
            </div>
            <div class="specify" ref="specify">
                <h3>规格参数</h3>
                <div class="items">
                    <div class="side">参数名</div>
                    <div class="main">
                        <div>{{ Particular_data.title }}</div>
                    </div>
                </div>
                <div class="items">
                    <div class="side">相机参数</div>
                    <div class="main">
                        <div class="itemsNormal">
                            后置三摄：4000万像素超感光摄像头（广角，f/1.8光圈，AF）+1600万像素超广角摄像头（f/2.2光圈）+800万像素长焦摄像头（f/3.4光圈，AF，OIS光学防抖），支持自动对焦（激光对焦/相位对焦/反差对焦）（备注）不同模式的照片和视频的像素可能有差异，请以实际为准。
                        </div>
                    </div>
                </div>
                <div class="mask"></div>
                <van-cell @click="showSpecifyBtn" class="specifyBtn">
                    查看全部参数
                </van-cell>
                <vanPopup v-model="showSpecify" closeable position="bottom" duration="0.2" :lock-scroll="true" :lazy-render="true" :style="{ height: '100%' }">
                    <h3 class="specifyTitle">包装清单</h3>
                    <div class="packing">
                        <div v-for="content in Particular_data.parameter.content" :key="content">{{ content }}</div>
                    </div>
                    <h3 class="specifyTitle">规格参数</h3>
                    <div class="items">
                        <div class="side">参数名</div>
                        <div class="main">
                            <div>{{ Particular_data.title }}</div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="side">相机参数</div>
                        <div class="main max">
                            <div class="itemsNormal">
                                后置三摄：4000万像素超感光摄像头（广角，f/1.8光圈，AF）+1600万像素超广角摄像头（f/2.2光圈）+800万像素长焦摄像头（f/3.4光圈，AF，OIS光学防抖），支持自动对焦（激光对焦/相位对焦/反差对焦）（备注）不同模式的照片和视频的像素可能有差异，请以实际为准。
                            </div>
                        </div>
                    </div>
                </vanPopup>
            </div>
            <div class="hrBorder"></div>
            <div class="imgMax" ref="imgMax">
                <img src="./../../images/1.jpg" alt="" />
                <img src="./../../images/2.jpg" alt="" />
                <img src="./../../images/3.jpg" alt="" />
                <img src="./../../images/4.jpg" alt="" />
                <img src="./../../images/5.jpg" alt="" />
                <img src="./../../images/6.jpg" alt="" />
                <img src="./../../images/7.jpg" alt="" />
                <img src="./../../images/8.jpg" alt="" />
                <img src="./../../images/9.jpg" alt="" />
            </div>
        </div>
        <CompleteCom v-show="complete" @completeClose="completeClose" :id="Particular_data._id" @commentPush="commentPush" :comment="comment.data" @completeShow="completeShow"></CompleteCom>
        <Detailed
            v-show="isdetailed"
            @detailedClose="detailedClose"
            :detailedImg="detailedImg"
            :detailedContent="detailedContent"
            :detailedStar="detailedStar"
            :detailedIndex="detailedIndex"
        ></Detailed>
        <van-loading v-if="!flag" class="loading" type="circular" color="#ca141d" />
        <ButtonTop  v-show="buttonTop" @BackTop="BackTop"></ButtonTop>
    </div>
</template>
<script>
import { getDataParticular, getDataComment } from './../../server/index'
import Swiper from './children/Swiper'
import CompleteCom from './children/CompleteCom'
import Detailed from './children/Detailed'
import Comment from './children/Comment'
import ButtonTop from './../../components/ButtonTop'
import { scroll } from './../../config/scroll'

import { mapMutations } from 'vuex'
export default {
    name: 'Product',
    components: {
        Swiper,
        Comment,
        CompleteCom,
        Detailed,
        ButtonTop
    },
    data() {
        return {
            Particular_data: {},
            colorIndex: 0,
            show: false,
            genreIndex:0,
            typeIndex: 0,
            flag: false,
            skip: 0,
            limit: 10,
            complete: false,
            isdetailed: false,
            detailedImg: [],
            scrTop: 0,
            detailedContent: '',
            detailedStar: 0,
            detailedIndex: 0,
            showSpecify: false,
            navFixed:false,
            buttonTop:false,
            lastTouchEnd: 0,
            pos:0,
            commentTop:0,
            doc: document.documentElement || document.body,
            comment: {
                data: [],
                reputation: '',
                count: 0,
            },
        }
    },
    computed:{
        left(){
            return 4.48 + 3.46 * + this.pos +'rem';
        },
        title() {
            return this.Particular_data.title + this.Particular_data.size[this.typeIndex].describe + ' (' + this.Particular_data.swiper[this.colorIndex].meta + ')'
        },
    },
    created() {
        this.getData()
        this.$nextTick(()=>{    
            scroll(()=>{                  
                if(parseInt(this.$refs.product.scrollTop) < this.commentTop - 50){
                    this.pos = 0
                }else if(parseInt(this.$refs.product.scrollTop) < this.$refs.specify.offsetTop - 50){                    
                    this.pos = 1
                }else if(parseInt(this.$refs.product.scrollTop) < this.$refs.imgMax.offsetTop - 50){
                    this.pos = 2
                }else{
                    this.pos = 3
                }
                if(parseInt(this.$refs.product.scrollTop) > 50){
                    this.navFixed = true
                }else{
                    this.navFixed = false
                }          
                if(parseInt(this.$refs.product.scrollTop) > 500){
                    this.buttonTop = true
                }else{
                    this.buttonTop = false
                }
            },this.$refs.product)
        })
    },
    mounted(){
        // console.log(this.$refs.s);

    },
    methods: {
        ...mapMutations(['ADD_CARTGOODS']),
        async getData() {
            let result = await getDataParticular(this.$route.query.id)
            this.Particular_data = result.data.data
            if (result.status == 200) {
                this.ADD_CARTGOODS({
                    id: result.data.data._id,
                    title: this.title,
                    color: this.Particular_data.swiper[this.colorIndex].meta,
                    size: this.Particular_data.size[this.typeIndex].describe,
                    img: this.Particular_data.swiper[this.colorIndex].Img[0],
                    price: this.Particular_data.size[this.typeIndex].price,
                    type:this.Particular_data.type[this.genreIndex],
                })
                let commentData = await getDataComment({
                    skip: this.skip,
                    limit: this.limit,
                    id: this.Particular_data._id,
                })
                this.comment.reputation = commentData.data.reputation
                this.comment.count = commentData.data.length
                this.comment.data = commentData.data.data
                this.flag = true
            }
        },
        switchGenre(index){
            this.genreIndex = index
            this.ADD_CARTGOODS({
                type:this.Particular_data.type[this.genreIndex],
            })
        },
        switchColor(index) {
            this.colorIndex = index
            this.ADD_CARTGOODS({
                color: this.Particular_data.swiper[index].meta,
                title: this.title,
                img: this.Particular_data.swiper[index].Img[0],
            })
        },
        switchType(index) {
            this.typeIndex = index
            this.ADD_CARTGOODS({
                size: this.Particular_data.size[index].describe,
                title: this.title,
                price: this.Particular_data.size[index].price,
            })
        },
        showPopup() {
            this.show = true
        },
        showSpecifyBtn() {
            this.showSpecify = true
        },
        detailedClose() {
            this.isdetailed = false
            this.$store.state.tabShow = true
            this.$refs.product.style.overflowY = ''
        },
        commentPush(arr) {
            this.comment.data.push(...arr)
        },
        completeShow(img = [], content, star, index = 0) {
            if ((img.length === 0 && event.target.className === 'right') || event.target.className === 'o') return
            if (event.target.className === 'right' || event.target.className === 'o' || event.target.className === 'bgimg bgimgMax' || event.target.className === 'bgimg') {
                this.$store.state.tabShow = false
                this.isdetailed = true
                this.detailedImg = img
                this.detailedContent = content
                this.detailedStar = star
                this.detailedIndex = index
                this.$refs.product.style.overflowY = 'hidden'
            } else {
                this.complete = true
                this.$refs.product.style.overflowY = 'hidden'
            }
                this.buttonTop = false
        },
        completeClose() {
            this.complete = false
            this.$refs.product.style.overflowY = ''
            this.buttonTop = true
        },
        BackTop(){
            this.$refs.product.scrollTop = 0;
        },
        childrenCon(top){
            this.commentTop = top
        },
        moveLeft(index){
            this.pos = index
            if(index == 0){
                this.$refs.product.scrollTop = 0;
            }else if(index == 1){
                this.$refs.product.scrollTop = this.commentTop - 40;
            }else if(index == 2){
                this.$refs.product.scrollTop = this.$refs.specify.offsetTop - 40;
            }else if(index == 3){
                this.$refs.product.scrollTop = this.$refs.imgMax.offsetTop - 40;
            }
        }
    },
    beforeDestroy() {
        this.isdetailed = false
        this.$store.state.tabShow = true
        this.$refs.product.style.overflowY = ''
    },
}
</script>
<style scoped>
h1 {
    font-size: 1.2rem;
    color: #ca141d;
    line-height: 2.2rem;
    padding-left: 0.8rem;
}
small {
    font-size: 0.8rem;
}
p {
    color: #333;
    font-size: 0.9rem;
    padding: 0 0.8rem;
    font-weight: 600;
}
.navFixed{
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 2.4rem;
    z-index: 999;
    background: #fff;
    box-shadow: 0 -0.2rem 0.33rem rgba(98, 55, 55, 0.5)

}
.navFixed .left{
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    /* top: 0.6rem; */
    left: 0.8rem;
    background: url('./../../images/icon_black_1.png') no-repeat;
    background-size: cover;
}
.navFixed .right{
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    right: 0.8rem;
    background: url('./../../images/icon_header_nav.png') no-repeat;
    background-size: cover;
}
.navFixed i{
    position: absolute;
    bottom: 0.3rem;
    width: 2rem;
    height: 0.1rem;
    background: #ca141d;
    transition: left 0.2s ease-out;
}
.navFixed span{
    font-size: 0.93rem;
    padding: 0 0.8rem;
}
.select{
    color: #ca141d !important;
}
.nav-enter-active, .nav-leave-active {
  transition: opacity .4s;
}
.nav-enter, .nav-leave-to{
  opacity: 0;
}
.loading {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
}
.product {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
}
.productCon {
    margin-bottom: 2.8rem;
}
.hrBorder {
    margin-top: 1rem;
    border-bottom: 0.7rem solid #f9f9f9;
}
.hrBottom {
    margin-top: 0.4rem;
}
.popup {
    position: relative;
    display: flex;
    width: 100vw;
    border-top: 0.05rem solid #f5f5f5;
    padding: 0.22rem 0.2rem;
    margin: 0 !important;
}
.bottom h2 {
    font-size: 1.2rem;
    padding: 1rem 1rem 0rem 1rem;
}
.isbottom .side {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    top: 0.4rem !important;
    margin-right: 0.3rem;
    background: url('./../../images/icon_discount.png') no-repeat;
    background-size: cover;
}
.isbottom .n {
    top: 4.1rem !important;
}
.isbottom .main {
    margin-bottom: 0.5rem;
}
.isbottom .main span {
    display: block;
    font-size: 0.75rem;
    line-height: 1.6rem;
    color: #666;
}
.popup .more {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 0rem;
    right: 1rem;
    background: url('./../../images/icon_header_nav.png') no-repeat;
    background-size: cover;
    opacity: 0.5;
}
.popup span {
    display: block;
    font-size: 0.7rem;
    line-height: 1.4rem;
}
.productCon >>> .van-overlay{
    background-color: rgba(0,0,0,.3) !important;
}
.bottom {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}
.popup span::before {
    content: '';
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.3rem;
    background: url('./../../images/icon_discount.png') no-repeat;
    background-size: cover;
    vertical-align: middle;
}
.items {
    position: relative;
    margin: 1rem 0;
}
.items .main {
    padding-left: 3rem;
    padding-right: 0.6rem;
    max-height: 6rem;
}
.items .main li {
    border: 0.07rem solid #ccc;
    display: inline-block;
    white-space: normal;
    padding: 0.2rem 0.7rem;
    font-size: 0.7rem;
    border-radius: 3rem;
    margin: 0.3rem 0.3rem;
    color: #333;
}
.items .main div {
    /* margin: 0.3rem 1.3rem; */
    font-size: 0.7rem;
    display: inline-block;
    width: 14rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 1.6rem;
    color: #333;
}
.itemsNormal {
    white-space: normal !important;
    width: 15.6rem !important;
}
.items .side {
    position: absolute;
    font-size: 0.65em;
    color: #888;
    top: 0.5rem;
    left: 1rem;
}
.active {
    border: 0.07rem solid #ca151e !important;
    color: #ca151e !important;
}
.specify h3 {
    font-size: 0.8rem;
    padding: 0.7rem 0 0 1rem;
    color: #333;
}
.specifyTitle {
    font-size: 1rem !important;
}
.specify .items .side {
    font-size: 0.7rem;
    top: 0 !important;
}
.specify .items {
    margin: 1rem 0 0.2rem 0;
}
.specify .items .main {
    max-height: 4.6rem;
    overflow: hidden;
}
.specify {
    position: relative;
    padding-bottom: 2.6rem;
}
.packing {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 50% 50%;
}
.packing div {
    margin-bottom: 0.6rem;
    font-size: 0.76rem;
    padding: 0 1rem;
    color: rgb(51, 51, 51);
}
.mask {
    width: 100%;
    height: 8rem;
    background: url('./../../images/icon_mask_specify.png') no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 0;
}
.max {
    height: auto !important;
    overflow: visible !important;
}
.specifyBtn {
    position: absolute;
    width: auto;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.3rem 2.6rem;
    margin: 0 0.3rem;
    border: 1px solid #e0e0e0;
    border-radius: 3.2rem;
    font-size: 0.76rem;
    color: #333;
}
.line {
    height: 2rem;
    background: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
}
.line i {
    display: block;
    width: 13rem;
    height: 0.2rem;
    background: url('./../../images/icon-line.png') no-repeat;
    background-size: cover;
    background-position: center;
}
.imgMax {
    font-size: 0;
}
.imgMax img {
    width: 100%;
    height: auto;
}

</style>
