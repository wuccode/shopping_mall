<template>
    <div>
        <div class="comment" ref="comment">
            <div class="title">
                <h2>用户评价 ({{ commentCount }})</h2>
                <span
                @click="$emit('completeShow')"
                    ><em>{{ commentReputation }}</em> 好评</span
                >
            </div>
            <div class="main" ref="main">
                <ul>
                    <li v-for="list in commentc" :key="list._id" @click="$emit('completeShow', list.Img,list.content,list.star)">
                        <div class="left">
                            <div class="head">
                                <div class="headLeft">
                                    <img :src="'http://localhost:5000' + list.photo" alt="" />
                                </div>
                                <div class="headRight">
                                    <p>{{ list.userName }}</p>
                                    <div :class="{ negative: list.star == 5 }"></div>
                                </div>
                            </div>
                            <div class="content">
                                <p>
                                    {{ list.content }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="right"
                            v-lazy:background-image="'http://localhost:5000' + list.Img[0]"
                            :style="{
                                background: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                            }"
                        >
                            <div class="o">共{{ list.Img.length }}张</div>
                        </div>
                    </li>
                    <div class="side" @click="$emit('completeShow')">
                        <div>
                            <img src="./../../../images/icon_more_1.png" alt="" />
                        </div>
                        <p>查看更多</p>
                    </div>
                </ul>
            </div>
            <div class="consult">
                <div @click="$emit('completeShow')">
                    查看全部评论
                </div>
                <div>
                    购买咨询(56)
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import PreventDefault from './../../../config/preventDefault'
export default {
    name: 'Comment',
    props: {
        commentData: Array,
        commentCount: Number,
        commentReputation: String,
    },
    components: {},
    data() {
        return {
            scroll: null,
            // complete: false,
        }
    },
    created() {
        this.$nextTick(() => {            
            this.initScroll()
            PreventDefault(this.$refs.main)
            this.$emit('childrenCon',this.$refs.comment.offsetTop)
        })
    },
    computed: {
        commentc() {
            return this.commentData.filter((arr, index) => index < 5)
        },
    },
    methods: {
        initScroll() {
            this.scroll = new BScroll(this.$refs.main, {
                // click: true,
                scrollX: true,
                scrollY: false,
                preventDefault: false,
                swipeBounceTime: 100,
            })
        },
    },
}
</script>
<style scoped>
.comment{
    padding-bottom:0.5rem ;
}
.comment .title {
    padding: 1rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-size:contain ; */
}
.comment h2 {
    font-size: 0.86rem;
    font-weight: 600;
    color: #333;
}
.comment span {
    font-size: 0.7rem;
    color: #666;
}
.comment span em {
    color: #ca141d;
    font-weight: bold;
    font-style: normal;
}
.comment span::after{
    content: '';
    display: inline-block;
    background: url('./../../../images/icon-more-arrow-1.png') no-repeat;
    width: .6rem;
    height: 1.4rem;
    margin-left: 0.2rem;
    background-size: cover;
    vertical-align:middle;
}
.comment .main {
    display: flex;
    width: 100vw;
}
.comment .main ul {
    white-space: nowrap;
    padding: 0.4rem;
}
.comment .main ul li {
    position: relative;
    display: inline-block;
    padding: 0.5rem 7.2rem 0.5rem 0.5rem;
    margin: 0 0.4rem;
    height: 6.2rem;
    box-shadow: 0rem 0rem 0.25rem rgba(0, 0, 0, 0.1);
}

.comment .main ul li div.left {
    width: 10.5rem;
}
.comment .main ul div.side {
    display: inline-block;
    padding: 2.202rem 2.202rem;
    margin: 0 0.4rem;
    vertical-align: top;
    box-shadow: 0rem 0rem 0.25rem rgba(0, 0, 0, 0.1);
    background-color: #f7f7f7;
}
.comment .main ul div.side div {
    width: 1.3rem;
    height: 1.3rem;
    margin: 0 auto;
}
.comment .main ul div.side div img {
    width: 100%;
}
.comment .main ul div.side p {
    margin-top: 0.5rem;
    font-size: 0.76rem;
    color: #333;
}
.head {
    display: flex;
}
.headLeft {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    overflow: hidden;
}

.headLeft img {
    width: 100%;
    height: 100%;
}
.headRight {
    padding: 0 0.5rem;
}
.headRight p {
    font-size: 0.6rem;
    color: #666;
}
.headRight div {
    height: 0.64rem;
    width: 4.6rem;
    background: url('./../../../images/star6.png') no-repeat;
    background-size: 100% 200%;
}
.negative {
    background-position: 0 -0.64rem !important;
}
.content {
    margin-top: 0.4rem;
    font-size: 0.72rem;
    color: #333;
}
.content p {
    white-space: normal;
    height: 4rem;
    line-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
.right {
    width: 6rem;
    height: 6rem;
    position: absolute;
    top: 50%;
    right: 0.6rem;
    transform: translateY(-50%);
}
.right div {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: #000;
    opacity: 0.3;
    padding: 0.1rem 0;
    font-size: 0.7rem;
    color: #fff;
}
.consult{
    padding: 0.5rem;
    display: flex;
    justify-content: center;
}
.consult div{
    padding: 0.4rem 1.4rem;
    margin: 0 0.3rem;
    border: 1px solid #e0e0e0;
    border-radius: 3.2rem;
    font-size: 0.76rem;
    color: #333;

}
.consult div:nth-child(2){
    background: #f8f8f8;
    color:#999;
}
</style>
