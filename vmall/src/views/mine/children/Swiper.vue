<template>
    <div>
        <Swiper :options="swiperOption">
            <SwiperSlide>
                <img class="img" src="./../../../images/QFkUGol4sTfSZIqkYcVs.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img class="img" src="./../../../images/DGmI5cAset7ctyOS39Np.jpg" alt="" />
            </SwiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name:'MineSwiper',
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                // 分页
                initialSlide: 0,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // 循环
                loop: true,
                speed: 300,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
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
.swiper-slide >>> {
    text-align: center;
}
.img {
    width: 94%;
    margin: 0 auto;
    border-radius: 0.3rem;
}
.swiper-pagination >>> {
    position: absolute;
    width: 3rem;
    left: 17.5rem;
    display: flex;
}
.swiper-pagination >>> span {
    background: transparent;
    opacity: 1;
    border: 0.06rem solid #fff;
    width: 0.3rem;
    height: 0.3rem;
}
.swiper-pagination >>> span.swiper-pagination-bullet {
    margin: 0 0.1rem;
}
.swiper-pagination >>> span.swiper-pagination-bullet-active {
    width: 0.4rem;
    height: 0.4rem;
    background: #fff;
    position: relative;
    top: -0.05rem;
}
</style>
