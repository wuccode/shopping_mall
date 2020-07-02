<template>
    <div class="wrap">
        <div class="back" @click="$router.go(-1)">
            <img src="./../../../images/icon_back_grey.png" alt="" />
        </div>
        <div class="more">
            <img src="./../../../images/icon_more_grey.png" alt="" />
        </div>
        <swiper id="swiper" :options="swiperOption" ref="mySwiper">
            <swiperSlide v-for="swiper in swiperImg" :key="swiper">
                <img
                    class="swiper-img"
                    :src="'http://localhost:5000' + swiper"
                />
            </swiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
    name: "ProductSwiper",
    props: {
        swiperImg: Array,
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                // 分页
                initialSlide: 0,
                slidesPerView: 'auto',
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    type: "fraction",
                },
                paginationType: "fraction",
                // 循环
                loop: true,
                speed: 300,
            },
        };
    },
    components: {
        Swiper,
        SwiperSlide,
    },
};
</script>
<style scoped>
.wrap {
    width: 100vw;
    min-height: 22rem;
    overflow: hidden;
    position: relative;
    background: rgba(204, 204, 204, 0.103);
}
.back {
    position: absolute;
    width: 1.4rem;
    top: 0.6rem;
    left: 0.8rem;
    z-index: 999;
}
.more{
    position: absolute;
    width: 1.4rem;
    top: 0.6rem;
    right: 0.8rem;
    z-index: 999;
}
.back img ,.more img{
    width: 100%;
    height: 100%;
}
img {
    width: 100vw;
}
.swiper {
    width: 100vm;
    position: relative;
}

#swiper >>> .swiper-pagination {
    width: auto !important;
    left: auto !important;
    right: 1.5rem !important;
    bottom: 1.5rem !important;
    color: #fff;
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
    border-radius: 3rem;
    background: rgba(0, 0, 0, 0.15);
}
</style>
