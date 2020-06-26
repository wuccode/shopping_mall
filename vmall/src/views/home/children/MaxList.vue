<template>
    <div class="wrap">
        <div v-for="phone in phoneMax" :key="phone._id" class="list"  @click="$router.push('/product?id=' + phone.particular)">
            <div
                v-if="!flag"
                class="img"
                v-lazy:background-image="'http://192.168.3.6:5000' + phone.Img"
                :style="{ background: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }"
            >
                <p>{{ phone.promotion }}</p>
            </div>
            <div v-else class="img">
                <img :class="{ min: bottom }" :src="'http://192.168.3.6:5000' + phone.Img" alt="" />
                <p class="note">{{ phone.promotion }}</p>
            </div>
            <p>{{ phone.title }}</p>
            <p>
                <span>{{ phone.price | money }}</span
                ><del v-if="phone.discount_price != ''">{{ phone.discount_price | money }}</del>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MaxList',
    props: {
        phoneMax: Array,
        flag: Boolean,
        bottom: Boolean,
    },
}
</script>
<style scoped>
.wrap {
    width: 100%;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.wrap .list {
    display: inline-block;
    position: relative;
    flex: 0 0 47%;
    height: 9rem;
    margin: 0.5rem 0.2rem 3rem 0.2rem;
}
.wrap .list div.img {
    width: 100%;
    height: 9rem;
    overflow: hidden;
    border-radius: 0.6rem;
    background: #f9f9f9;
}
.wrap .list div.img img {
    width: 86%;
}
.wrap .list div.img p {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.66rem;
    padding: 0.1rem 0;
    border-bottom-left-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;
}
.wrap .list p {
    font-size: 0.7rem;
    margin-top: 0.4rem;
}
.min {
    width: 70% !important;
    padding: 0.5rem 0;
}
.wrap .list p span {
    color: #ca141d;
}
.wrap .list p del {
    color: #999;
}
.note {
    background: rgba(155, 155, 155, 0.1) !important;
    color: #9b9b9b !important;
    padding: 0.2rem 0 !important;
}
</style>
