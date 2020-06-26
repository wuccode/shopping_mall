<template>
    <div class="main">
        <div class="content" ref="content">
            <div>
                <ul>
                    <li v-for="(lists, index) in listOne" :key="lists._id">
                        <div class="img" :style="bg(index)"></div>
                        <span>{{ lists.text }}</span>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li v-for="(lists, index) in listTwo" :key="lists._id">
                        <div class="img" :style="bg(index + 5)"></div>
                        <span>{{ lists.text }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list">
            <ul ref="list">
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>
<script>
import touch from './../../config/touch'
export default {
    name: 'MySwiper',
    props: {
        sprite_item: Array,
        sprite_img: String,
    },
    mounted() {
        touch(this.$refs.content, this.$refs.list)
    },
    computed: {
        listOne() {
            return this.sprite_item.filter((arr, index) => index < 5)
        },
        listTwo() {
            return this.sprite_item.filter((arr, index) => index > 4)
        },
    },
    methods: {
        bg(index) {
            return {
                background: 'url(http://192.168.3.6:5000' + this.sprite_img + ') no-repeat',
                backgroundSize: '1000% 100%',
                backgroundPosition: '' + 11.1 * index + '% 0',
            }
        },
    },
    data() {
        return {}
    },
}
</script>
<style scoped>
.main {
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 3.8rem;
    padding: 0.5rem 0 1rem 0;
}
.content {
    width: 200%;
    position: absolute;
    left: 0;
    padding: 0.5rem 0 0.5rem 0;
}
.content div {
    display: inline-block;
    width: 50%;
}

.content div ul li {
    display: inline-block;
    width: 20%;
    text-align: center;
}
.content div ul li .img {
    display: block;
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    overflow: hidden;
}
.content div ul li span {
    font-size: 0.7rem;
    color: #333;
    white-space: nowrap;
}
.list {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0.5rem;
    width: 1.6rem;
    z-index: 99;
}
.list ul {
    display: flex;
    justify-content: space-around;
}
.list ul li {
    width: 0.3rem;
    height: 0.2rem;
    border-radius: 0.4rem;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}
.list ul li.active {
    width: 0.6rem;
    background: rgb(209, 52, 65);
}
</style>
