<template>
    <div>
        <div class="seckillMain" ref="listContent">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import PreventDefault from './../../../config/preventDefault'
export default {
    name: 'List',
    created() {
        this.$nextTick(() => {
            this.initScroll()
            PreventDefault(this.$refs.listContent)
        })
    },
    methods: {
        initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.listContent, {
                    click: true,
                    scrollX: true,
                    preventDefault: false,
                    swipeBounceTime: 1000,
                    momentumLimitTime:1000,
                    flickLimitDistance:0
                })
            } else {
                // 复用Bscroll
                this.scroll.refresh()
            }
        },
    },
}
</script>
<style scoped>
.seckillMain {
    width: 100%;
    padding: 0.5rem 0;
    white-space: nowrap;
}
.seckillMain ul {
    width: 59rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.seckillMain ul li {
    width: 5.5rem;
    position: relative;
    height: 5.5rem;
    margin: 0 0.2rem;
    padding: 0.5rem 0 0.3rem 0;
    background: #fff;
    border-radius: 0.3rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.05);
}
.seckillMain ul li::after {
    content: attr(data-promotion);
    position: absolute;
    bottom: -1rem;
    font-size: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    color: #ca141d;
}
.seckillMain ul li img {
    display: block;
    width: 80%;
    margin: 0 auto;
}
.seckillMain ul li span {
    position: absolute;
    bottom: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5rem;
    font-size: 0.6rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #9b9b9b;
}
.seckillMain ul li p {
    white-space: normal;
    font-size: 0.7rem;
    color: #333;
    /* height: 1.6rem; */
    padding: 0.3rem 0 0 0;
    text-align: center;
}
.seckillMain ul li p.price {
    height: 0.6rem;
    color: #999;
}
.seckillMain ul li p.price em {
    font-style: initial;
    color: #ca141d;
    padding: 0 0.2rem;
}
.promotion {
    height: 1rem;
    position: relative;
    /* bottom: -0.5rem; */
    padding: 0.2rem 0;
    background: rgba(155, 155, 155, 0.1);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}
.promotion span {
    color: #9b9b9b;
    font-size: 0.7rem !important;
}
.top {
    border-radius: 0.5rem !important;
    width: 7rem !important;
    height: 6rem !important;
    padding-bottom: 1rem !important;
}
img {
    width: 76% !important;
    padding-bottom: 0.3rem;
}

.listWidth {
    width: 74rem !important;
}
.liphone {
    border-radius: 0.5rem !important;
    width: 8rem !important;
    height: 5.7rem !important;
    padding-bottom: 1rem !important;
}
.liNote {
    border-radius: 0.5rem !important;
    width: 8rem !important;
    height: 6.2rem !important;
    padding-bottom: 1rem !important;
}
.liTablet {
    border-radius: 0.5rem !important;
    width: 8rem !important;
    height: 5.98rem !important;
    padding-bottom: 1rem !important;
}
.listTablet {
    width: 44rem !important;
}
.listPhone {
    width: 84rem !important;
}
.liAccessories {
    border-radius: 0.5rem !important;
    width: 8rem !important;
    height: 4.94rem !important;
    padding-bottom: 1rem !important;
}
.listAccessories {
    width: 24rem !important;
}
</style>
