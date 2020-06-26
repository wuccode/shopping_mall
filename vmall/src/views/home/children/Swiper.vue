<template>
    <div class="navSwiper">
        <swiper id="swiper" :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="slideshow in slideshow_list" :key="slideshow._id">
                <img class="swiper-img" :src="'http://192.168.3.6:5000' + slideshow.Img" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: 'SwiperM',
    props: {
        slideshow_list: Array,
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                initialSlide: 0,
                slidesPerView: 'auto',
                // 分页
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // 循环
                loop: true,
                // 切换时长
                autoplay: {
                    delay: 2000, //自动切换的时间间隔，单位ms
                    disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
                },
                // 速度
                speed: 600,
                // 滑动后回调函数
                on: {
                    slideChangeTransitionEnd() {
                        // console.log(this.activeIndex);
                    },
                },
            },
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
}
</script>
<style scoped>
.navSwiper{
    margin-top: 2.8rem;
}
.swiper-img {
    width: 96%;
    border-radius: 10px;
}
#swiper >>> .swiper-slide {
    text-align: center;
}
#swiper >>> .swiper-pagination-bullet {
    width: 0.3em;
    height: 0.3em;
    outline: none;
}
#swiper >>> .swiper-pagination-bullet-active {
    --swiper-theme-color: #fff;
}
#swiper >>> .swiper-pagination {
    width: auto !important;
    left: auto !important;
    right: 2rem !important;
}
</style>
