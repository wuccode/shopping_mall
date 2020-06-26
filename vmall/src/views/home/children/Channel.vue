<template>
    <div>
        <div class="grid">
            <div v-for="channel in channelList" :key="channel._id">
                <router-link :to="'/product?id=' + channel.particular">
                    <img v-lazy="'http://192.168.3.6:5000' + channel.Img" alt />
                </router-link>
            </div>
        </div>
        <div class="channelBottom">
            <div v-for="channel in channelBottom" :key="channel._id">
                <img v-lazy="'http://192.168.3.6:5000' + channel.Img" alt />
                <h5>{{ channel.title }}</h5>
                <p>{{ channel.promotion }}</p>
                <p class="pos">
                    <span>{{ channel.price | money }}</span>
                    <del v-if="channel.discount_price != ''">{{ channel.discount_price | money }}</del>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Channel',
    props: {
        channel_list: Array,
    },
    computed: {
        channelList() {
            return this.channel_list.filter((arr, index) => index < 7)
        },
        channelBottom() {
            return this.channel_list.filter((arr, index) => index >= 7)
        },
    },
}
</script>
<style scoped>
.grid {
    width: 96%;
    display: grid;
    margin: 0 auto;
    font-size: 0;
    grid-template-rows: repeat(auto);
    grid-template-columns: 50% 50%;
    grid-row-gap: 0.1rem;
    grid-column-gap: 0.1rem;
}
.grid div img {
    width: 100%;
}
.grid div:nth-child(1) {
    grid-row: 1/3;
    grid-column: 1/2;
}
.grid div:nth-child(1) img {
    border-top-left-radius: 0.5rem;
}
.grid div:nth-child(2) img {
    border-top-right-radius: 0.5rem;
}
.channelBottom {
    display: grid;
    width: 96%;
    margin: 0.1rem auto;
    grid-template-rows: repeat(auto);
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 0.1rem;
}
.channelBottom div {
    padding: 0.5rem 0.5rem;
    text-align: center;
}
.channelBottom div:nth-child(1) {
    border-bottom-left-radius: 0.5rem;
}
.channelBottom div:nth-child(3) {
    border-bottom-right-radius: 0.5rem;
}
.channelBottom div img {
    width: 90%;
    margin: 0 auto;
}
.channelBottom div {
    background: #f9f9f9;
    line-height: 1rem;
}
.channelBottom div h5 {
    font-style: normal;
    font-weight: 400;
    font-size: 0.7rem;
    color: #444;
    height: 2rem;
    text-align: center;
}
.channelBottom div p {
    font-size: 0.65rem;
    color: #9b9b9b;
}
.channelBottom div p.pos {
    display: flex;
    justify-content: center;
    justify-self: center;
}
.channelBottom div p span {
    padding: 0 0.1rem;
    color: #ca141d;
}
</style>
