<template>
    <div class="vipBox">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div ref="vipBox">
            <ul>
                <slot name="content"></slot>
            </ul>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import PreventDefault from './../../../config/preventDefault'
export default {
    name: 'VipBox',
    data() {
        return {}
    },
    created() {
        this.$nextTick(() => {
            this.initScroll()
            PreventDefault(this.$refs.vipBox)
        })
    },
    methods: {
        initScroll() {
            this.scroll = new BScroll(this.$refs.vipBox, {
                click: true,
                scrollX: true,
                scrollY: false,
                preventDefault: false,
                swipeBounceTime: 600,
            })
        },
    },
}
</script>
<style scoped>
.vipBox {
    position: relative;
    width: 94%;
    height: 8.4rem;
    padding: 0.3rem 0;
    background: #fff;
    margin: 0.6rem auto 0.4rem auto;
    border-radius: 0.6rem;
    box-shadow: 0px 0.3rem 0.6rem 0 rgba(0, 0, 0, 0.04);
    overflow: hidden;
}
ul {
    position: absolute;
    display: flex;
    padding: 0 0.4rem;
}
ul li {
    position: relative;
    flex: 0 0 10rem;
    width: 10rem;
    height: 6rem;
    background: url('./../../../images/vip_1.455bad2.png') no-repeat;
    background-size: cover;
    background-position: center center;
    align-self: center;
    /* padding-left: 1rem; */
}
ul li p {
    padding-left: 1rem;
}
ul li p:nth-child(1) {
    margin-top: 1.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #df212d;
}
ul li p:nth-child(2) {
    width: 6.2rem;
    font-size: 0.6rem;
    color: #999;
    height: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
ul li p small {
    font-size: 1rem;
}
ul li span {
    position: absolute;
    right: 0.6rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.8rem;
    color: #fff;
}
li img {
    width: 100%;
}
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.5rem 0.5rem 0.5rem;
}
.simg {
    margin: 0 0.3rem !important;
}
.title span:nth-child(1) {
    font-weight: 900;
    font-size: 0.8rem;
}
.title span:nth-child(2) {
    font-size: 0.7rem;
    color: #999;
}
.title span:nth-child(2)::after {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.9rem;
    background: url('./../../../images/icon-more-arrow-1.png') no-repeat;
    background-size: contain;
    vertical-align: bottom;
    margin-left: 0.1rem;
}
</style>
