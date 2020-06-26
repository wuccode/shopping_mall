<template>
    <div class="completeCom">
        <div class="head">
            <div class="back" @click="back">
                <img src="./../../../images/icon_black_1.png" alt="" />
            </div>
            <span>评价</span>
            <div class="completeMore"></div>
        </div>
        <div class="content" ref="content" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <ul ref="scrollC">
                <li v-for="list in comment" :key="list._id">
                    <div class="heads">
                        <img class="headimg" :src="'http://192.168.3.6:5000' + list.photo" alt="" />
                        <div class="headtitle">
                            <span>{{ list.userName }}</span>
                            <div :class="{ negative: list.star == 5 }"></div>
                        </div>
                        <span class="time">{{ list.date }}</span>
                    </div>
                    <div class="mainCom">
                        {{ list.content }}
                    </div>
                    <div class="commentImg">
                        <div
                            v-for="(img, index) in list.Img"
                            :key="img"
                            :class="{
                                bgimg: true,
                                bgimgMax: list.Img.length < 2,
                            }"
                            v-lazy:background-image="'http://192.168.3.6:5000' + img"
                            :style="{
                                background: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                            }"
                            @click="$emit('completeShow', list.Img, list.content, list.star, index + 1)"
                        ></div>
                    </div>
                    <p>{{ list.modelNumber }}</p>
                </li>
                <div class="loading" v-show="show">
                    <van-loading class="load" type="circular" color="#ca141d" />
                </div>
            </ul>
        </div>
        <ButtonTop v-show="buttonTop" @BackTop="BackTop"></ButtonTop>
    </div>
</template>
<script>
import { getDataComment } from './../../../server/index'
import {scroll} from './../../../config/scroll'
import ButtonTop from './../../../components/ButtonTop'
export default {
    name: 'CompleteCom',
    props: {
        comment: Array,
        id: String,
    },
    data() {
        return {
            startY: 0,
            moveY: 0,
            disY: 0,
            flag: true,
            top: 0,
            show: false,
            skip: 10,
            limit: 20,
            buttonTop:false
        }
    },
    components:{
        ButtonTop
    },
    created(){
        this.$nextTick(()=>{
            scroll(()=>{
                if(parseInt(this.$refs.content.scrollTop) > 500){
                    this.buttonTop = true
                }else{
                    this.buttonTop = false
                } 
            },this.$refs.content)
        })
    },
    methods: {
        BackTop(){
            this.$refs.content.scrollTop = 0;
        },
        back(){
            this.buttonTop = false
            this.$emit('completeClose')
        },
        touchStart(e) {
            let top = parseInt(this.$refs.content.scrollTop) - (parseInt(this.$refs.scrollC.offsetHeight) - parseInt(this.$refs.content.offsetHeight))
            if ((this.flag && top === -1) || top === 0 || top === 1) {
                this.startY = e.changedTouches[0].clientY
                this.top = this.$refs.content.offsetTop
                this.disY = 0
            }
        },
        touchMove(e) {
            let top = parseInt(this.$refs.content.scrollTop) - (parseInt(this.$refs.scrollC.offsetHeight) - parseInt(this.$refs.content.offsetHeight))       
            if ((this.flag && top === -1) || top === 0 || top === 1) {
                this.moveY = e.changedTouches[0].clientY
                this.disY = this.moveY - this.startY

                if (this.disY < 0) {
                    this.$refs.scrollC.style.transition = 'none'
                    this.$refs.scrollC.style.transform =  'translate3d(0,'+ parseInt(this.disY * 0.4) +'px,0)'     
                    // this.$refs.scrollC.style.top =  +'';
                }
            }
        },
        async touchEnd() {
            this.$refs.scrollC.style.transition = 'all .3s ease-out'
            let top = parseInt(this.$refs.content.scrollTop) - (parseInt(this.$refs.scrollC.offsetHeight) - parseInt(this.$refs.content.offsetHeight))
            if ((this.flag && top === -1) || top === 0 || top === 1) {                
                if (Math.abs(this.disY) > 250) {
                    this.show = true
                    this.flag = false
                    this.$refs.scrollC.className = "action";
                    // this.$refs.scrollC.style.top = -3 + 'rem'
                    this.$refs.scrollC.style.transform =  'translate3d(0,'+ -3 +'rem,0)'     

                    setTimeout(async () => {
                        this.flag = true
                        // this.$refs.scrollC.style.top = 0;
                    this.$refs.scrollC.style.transform =  'translate3d(0,'+ -0 +'rem,0)'     
                        this.show = false
                        let result = await getDataComment({ skip: this.skip, limit: this.limit, id: this.id })
                        this.$refs.scrollC.className = "";
                        if ({}.toString.call(result.data.data) === '[object Array]') {
                            this.$emit('commentPush', result.data.data)
                            this.skip += 10
                            this.limit += 10
                        } else {
                            this.$toast(result.data.data)
                        }
                    }, 500)
                } else {
                    // this.$refs.scrollC.style.top = 0;
                    this.$refs.scrollC.style.transform =  'translate3d(0,'+ -0 +'rem,0)'     

                    this.$refs.scrollC.className = "";

                }
            }
        },
    },
}
</script>
<style scoped>
.completeCom {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
}
.completeCom .head {
    position: fixed;
    padding: 0.5rem 0;
    height: 1.5rem;
    width: 100%;
    background: #fff;
    text-align: center;
    z-index: 9999;
    
}
.negative {
    background-position: 0 -0.64rem !important;
}
.action {
    touch-action: none;
}
.loading {
    width: 100%;
    height: 2.6rem;
    text-align: center;
    line-height: 2.6rem;
}
.completeCom .head span {
    font-size: 1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.back {
    position: absolute;
    width: 1.4rem;
    top: 0.6rem;
    left: 0.8rem;
    z-index: 999;
}
.back img {
    width: 100%;
    height: 100%;
}
.completeMore {
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    top: 0.6rem;
    right: 1.5rem;
    background: url('./../../../images/icon_header_nav.png') no-repeat;
    background-size: cover;
}
.completeCom .content {
    position: fixed;
    z-index: 98;
    width: 100vw;
    top: 2.5rem;
    bottom: 2.8rem;
    overflow: scroll;
    background: #fff;
    /* transform-style:preserve-3d; */
    -webkit-transform: translate3d(0px,0px,0px);
    transform: translate3d(0px,0px,0px)

}
.completeCom .content ul li {
    border-top: 0.3rem solid #f8f8f8;
    padding: 0.7rem 1rem;
}
.heads {
    position: relative;
}
.heads .time {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.66rem;
    color: #999;
}
.heads .headimg {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
}
.heads .headtitle {
    display: inline-block;
    vertical-align: top;
    margin-left: 0.6rem;
    line-height: 1.2rem;
}
.heads .headtitle span {
    font-size: 0.66rem;
    vertical-align: top;
}
.heads .headtitle div {
    height: 0.64rem;
    width: 4.6rem;
    background: url('./../../../images/star6.png') no-repeat;
    background-size: 100% 200%;
}
.mainCom {
    padding: 1rem 0 0.5rem 0;
    font-size: 0.72rem;
}
.commentImg {
    /* font-size: 0; */
    display: flex;
    flex-wrap: wrap;
}
.commentImg .bgimg {
    width: 6rem;
    height: 6rem;
    margin: 0.16rem 0.16rem;
}
.bgimgMax {
    width: 11rem !important;
    height: 11rem !important;
}
.completeCom p {
    padding: 0.8rem 0 0.4rem 0.2rem;
    font-size: 0.6rem;
    color: #999;
}
</style>
