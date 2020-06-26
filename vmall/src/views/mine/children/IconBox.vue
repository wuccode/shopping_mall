<template>
    <div class="iconBox">
        <div :class="{serve:s}">
            <div class="title">
                <span>{{s ? '我的服务':'我的VMAL'}}</span>
                <span v-if="s">联系客服</span>
            </div>
            <ul>
                <li>
                    <i></i>
                    <span>会员频道</span>
                </li>
                <li>
                    <i></i>
                    <span>邀请有礼</span>
                </li>
                <li>
                    <i></i>
                    <span>优享购</span>
                </li>

                <li>
                    <i></i>
                    <span>优购码</span>
                </li>
                <li>
                    <i></i>
                    <span>我的拼团</span>
                </li>
                <li>
                    <i></i>
                    <span>收货地址</span>
                </li>
                <li>
                    <i></i>
                    <span>预约记录</span>
                </li>
                <li>
                    <i></i>
                    <span>企业购</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        s: Boolean,
    },
    name: 'IconBox',
    data() {
        return {}
    },
    methods: {},
}
</script>
<style scoped>
.iconBox {
    position: relative;
    width: 94%;
    padding: 0.3rem 0;
    background: #fff;
    margin: 0.6rem auto 0.4rem auto;
    border-radius: 0.6rem;
    box-shadow: 0px 0.3rem 0.6rem 0 rgba(0, 0, 0, 0.04);
    overflow: hidden;
}
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.5rem 0.5rem 0.5rem;
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
ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    grid-row-gap: 1rem;
}
ul li {
    justify-self: center;
    padding-bottom: 1rem;
}
ul li span {
    font-size: 0.68rem;
    color: #666;
}
ul li i {
    display: block;
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    background: url('./../../../images/11.png') no-repeat;
    background-size: cover;
}
ul li:nth-child(2) i {
    background: url('./../../../images/12.png') no-repeat;
    background-size: cover;
}
ul li:nth-child(3) i {
    background: url('./../../../images/13.png') no-repeat;
    background-size: cover;
}
ul li:nth-child(4) i {
    background: url('./../../../images/14.png') no-repeat;
    background-size: cover;
}
ul li:nth-child(5) i {
    background: url('./../../../images/15.png') no-repeat;
    background-size: cover;
}
ul li:nth-child(6) i {
    background: url('./../../../images/16.png') no-repeat;
    background-size: cover;
}
ul li:nth-child(7) i {
    background: url('./../../../images/17.png') no-repeat;
    background-size: cover;
}
ul li:nth-child(8) i {
    background: url('./../../../images/18.png') no-repeat;
    background-size: cover;
}
.serve ul li:nth-child(1) i {
    background: url('./../../../images/21.png') no-repeat;
    background-size: cover;
}
.serve ul li:nth-child(2) i {
    background: url('./../../../images/22.png') no-repeat;
    background-size: cover;
}
.serve ul li:nth-child(3) i {
    background: url('./../../../images/23.png') no-repeat;
    background-size: cover;
}
.serve ul li:nth-child(4) i {
    background: url('./../../../images/24.png') no-repeat;
    background-size: cover;
}
.serve ul li:nth-child(5) i {
    background: url('./../../../images/25.png') no-repeat;
    background-size: cover;
}
.serve ul li:nth-child(6) i {
    background: url('./../../../images/26.png') no-repeat;
    background-size: cover;
}
.serve ul li:nth-child(7) i {
    background: url('./../../../images/27.png') no-repeat;
    background-size: cover;
}
.serve ul li:nth-child(8) i {
    background: url('./../../../images/28.png') no-repeat;
    background-size: cover;
}
</style>
