<template>
    <div class="detailed" @click="$emit('detailedClose')">
        <Swiper :options="swiperOption" ref="mySwiper">
            <SwiperSlide v-for="img in detailedImg" :key="img">
                <img :src="'http://localhost:5000' + img" alt="" />
            </SwiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
        <div class="introduce">
            <div :class="{ good: true, star: detailedStar === 5 }"></div>
            <div class="content">{{ detailedContent }}</div>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: 'Detailed',
    props: {
        detailedImg: Array,
        detailedContent: String,
        detailedStar: Number,
        detailedIndex: {
            type: Number,
            default: 0,
        },
    },
    created() {
        this.$nextTick(() => {
            this.swiper.slideTo(this.detailedIndex, 0, false)           
        })
    },
    data() {
        return {
            swiperOption: {
                // notNextTick: true,
                // 分页
                initialSlide: 0,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    type: 'fraction',
                },
                paginationType: 'fraction',
                // 循环
                loop: true,
                speed: 300,
                // 滑动后回调函数
                on: {
                    slideChangeTransitionEnd() {},
                },
            },
        }
    },
    watch: {
        detailedIndex: {
            handler() {
                this.swiper.slideTo(this.detailedIndex, 0, false)
            },
            immediate: false,
        },
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper
        },
    },
    methods: {},
    components: {
        Swiper,
        SwiperSlide,
    },
}
</script>

<style scoped>
.detailed {
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 9999;
    top: 0;
    width: 100vw;
    height: 100%;
    background: #000;
}
.detailed img {
    width: 100%;
    height: auto;
}
.swiper-pagination {
    position: fixed;
    top: 1rem !important;
    color: #fff !important;
    font-size: 0.88rem;
}
.detailed .introduce {
    position: absolute;
    left: 4%;
    bottom: 1rem;
    width: 92%;
    max-height: 5rem;
    z-index: 99;
}
.detailed .good {
    color: #ccc;
    height: 0.64rem;
    width: 4.6rem;
    margin-bottom: 0.2rem;
    background: url('./../../../images/star6.png') no-repeat;
    background-size: 100% 200%;
}
.star {
    background-position: 0 -0.64rem !important;
}
.detailed .content {
    color: #fff;
    font-size: 0.7rem;
    max-height: 4.36rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
</style>
