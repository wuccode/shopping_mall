<template>
    <div>
        <div v-if="show">
            <Search></Search>
            <Swiper :slideshow_list="slideshow_list"></Swiper>
            <MySwiper :sprite_item="sprite_item" :sprite_img="sprite_img"></MySwiper>
            <div class="headline">
                <img src="./../../images/logo_wapHeadNews.png" alt />
                <div class="wrap">
                    <ul ref="list" @transitionend="transitionEnd">
                        <li>快来领取！这份通行证颜值超高，还能免费吃喝玩乐</li>
                        <li>一张图读懂华为 MatePad丨未来自定义</li>
                        <li>2999元起丨华为nova7系列新品发布</li>
                        <li>新机试用 华为nova 7试用申请中，等你来</li>
                        <li>快来领取！这份通行证颜值超高，还能免费吃喝玩乐</li>
                        <li>一张图读懂华为 MatePad丨未来自定义</li>
                    </ul>
                </div>
                <span>更多</span>
            </div>
            <Seckill :seckill_list="seckill_list"></Seckill>
            <Channel :channel_list="channel_list"></Channel>
            <div class="recommendation">
                <h2>精品推荐</h2>
                <List>
                    <ul class="listWidth">
                        <li class="top" v-for="list in recommendation_list" :key="list._id">
                            <img class="img" v-lazy="'http://localhost:5000' + list.Img" alt />
                            <div class="promotion">
                                <span>{{ list.promotion }}</span>
                            </div>
                            <p>{{ list.title }}</p>
                            <p class="price">
                                <em>{{ list.price | money }}</em>
                                <del v-if="list.discount_price != ''">{{ list.discount_price | money }}</del>
                            </p>
                        </li>
                    </ul>
                </List>
            </div>
            <div class="hrBorder"></div>
            <Phone :phone_list="phone_list"></Phone>
            <div class="hrBorder"></div>
            <note-book :noteBook_list="noteBook_list"></note-book>
            <div class="hrBorder"></div>
            <Tablet :tablet_list="tablet_list"></Tablet>
            <div class="hrBorder"></div>
            <Accessories :accessories_list="accessories_list"></Accessories>
            <div class="hrBorder"></div>
            <Footer></Footer>
            <ButtonTop v-show="buttonTop" @BackTop="BackTop"></ButtonTop>
        </div>
        <van-loading v-if="!show" class="loading" type="circular" color="#ca141d" />
    </div>
</template>

<script>
import Swiper from './children/Swiper'
import Seckill from './children/Seckill'
import Channel from './children/Channel'
import List from './children/List'
import noteBook from './children/NoteBook'
import Tablet from './children/Tablet'
import Footer from './../../components/Footer'
import Accessories from './children/Accessories'
// import MaxList from "./children/MaxList";
import Phone from './children/phone'
import MySwiper from './../../components/MySwiper/MySwiper'
import Search from './../../components/Search'
import ButtonTop from './../../components/ButtonTop'
import { getDataHome } from './../../server/index'
import {scroll} from './../../config/scroll'
export default {
    name: 'Home',
    data() {
        return {
            value: '',
            show: false,
            index: 0,
            timer: null,
            buttonTop:false,
            slideshow_list: [],
            sprite_img: '',
            sprite_item: [],
            seckill_list: [],
            channel_list: [],
            recommendation_list: [],
            phone_list: [],
            noteBook_list: [],
            tablet_list: [],
            accessories_list: [],
        }
    },
    created() {
        this.init()
        this.list()
        this.transitionEnd()
        this.$nextTick(()=>{
            scroll(()=>{
                let scroll = document.body.scrollTop || document.documentElement.scrollTop                
                if(parseInt(scroll) > 500){
                    this.buttonTop = true       
                }else{
                    this.buttonTop = false
                }
            },document)
        })
    },
    mounted() {},
    methods: {
        BackTop(){
            if(document.documentElement){
                document.documentElement.scrollTop = 0;
            }else{
                document.body.scrollTop.scrollTop = 0;
            }   
        },
        async init() {
            let result = await getDataHome()
            if (result.status == 200) {
                this.slideshow_list = result.data.data.slideshow
                this.sprite_item = result.data.data.sprite.item
                this.sprite_img = result.data.data.sprite.Img
                this.seckill_list = result.data.data.seckill
                this.channel_list = result.data.data.channel
                this.recommendation_list = result.data.data.recommendation
                this.phone_list = result.data.data.phone
                this.noteBook_list = result.data.data.notebook
                this.tablet_list = result.data.data.tablet
                this.accessories_list = result.data.data.accessories
                this.show = true
            }
           
        },
        list() {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                if (this.index >= 4) this.index = 0
                this.index++
                this.$refs.list.style.transition = 'top .3s ease-out'
                this.$refs.list.style.top = -2 * (this.index + 1) + 'rem'
            }, 3000)
        },
        transitionEnd() {
            if (this.index >= 4) {
                this.index = 0
                this.$refs.list.style.transition = 'none'
                this.$refs.list.style.top = -2 + 'rem'
            }
        },
    },
    activated() {
        this.list()
    },
    deactivated() {
        clearInterval(this.timer)
    },
    components: {
        Swiper,
        MySwiper,
        Seckill,
        Channel,
        Phone,
        List,
        noteBook,
        Tablet,
        Accessories,
        Footer,
        Search,
        ButtonTop
    },
}
</script>
<style scoped>
.headline {
    width: 94%;
    height: 2rem;
    padding: 1rem 0;
    margin: 0 3%;
    border-top: 0.1rem solid #f8f8f8;
    display: flex;
    align-items: center;
}
.headline img {
    width: auto;
    height: 0.8rem;
}
.headline .wrap {
    font-size: 0;
    padding-left: 1rem;
    height: 2rem;
    width: 64%;
    overflow: hidden;
}
.headline .wrap ul {
    position: relative;
    top: -2rem;
}
.loading {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
}
.headline .wrap ul li {
    font-size: 0.7rem;
    line-height: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #4d4d4d;
}
.headline span {
    margin-left: 1rem;
    font-size: 0.6rem;
    color: #999;
}
.hrBorder {
    margin-top: 4rem;
    border-bottom: 0.7rem solid #f9f9f9;
}
.recommendation h2,
.phone h2 {
    text-align: center;
    padding: 1rem 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 500;
    color: #444;
}
</style>
