<template>
    <div class="seckill">
        <div class="seckillHeader">
            <span>限时购</span>
            <img src="./../../../images/seckill_title.png" alt />
            <span ref="time">00:00:00</span>
            <span>后结束</span>
        </div>
        <List>
            <ul>
                <li :data-promotion="list.promotion" v-for="list in seckill_list" :key="list._id" @click="$router.push('/product?id=' + list.particular)">
                        <img v-lazy="'http://localhost:5000' + list.Img" alt />
                        <span>{{ list.text }}</span>
                </li>
            </ul>
        </List>
    </div>
</template>
<script>
import List from './List'
import { current, time } from './../../../config/countDown'
export default {
    name: 'Seckill',
    props: {
        seckill_list: Array,
    },
    data() {
        return {
            scroll: null,
            setTime: localStorage.getItem('time') || '',
        }
    },
    created() {
        if (this.setTime === '') {
            this.setTime = time(1440)
            localStorage.setItem('time', time(1440))
        }
        this.$nextTick(() => {
            current(this.$refs.time, this.setTime, '', () => {
                this.setTime === time(1440)
                localStorage.setItem('time', time(1440))
            })
        })
    },
    components: {
        List,
    },
}
</script>
<style scoped>
.seckill {
    padding: 0 0 1rem 0;
    background-image: linear-gradient(-180deg, #f8f8f8 0, #fff 100%);
}
.seckillHeader {
    width: 100%;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.seckillHeader img {
    width: 1rem;
    vertical-align: bottom;
}
.seckillHeader span {
    display: inline-block;
    margin: 0 0.2rem;
    font-size: 1rem;
    vertical-align: top;
}
.seckillHeader span:nth-child(1) {
    padding-bottom: 0.2rem;
}
.seckillHeader span:nth-child(4) {
    font-size: 0.6rem;
    margin-left: 0;
    color: #9b9b9b;
}
</style>
