<template>
    <div class="tab-item" @click="itemActive">
        <div :style="isColor">
            <slot :active="flag"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TabItem',
    props: {
        to: {
            type: String,
            default: '',
        },

        color: {
            type: String,
            default: '#666',
        },
    },
    data() {
        return {}
    },
    computed: {
        flag() {
            return this.$route.path.includes(this.to)
        },
        isColor() {
            return this.flag ? { color: this.color } : {}
        },
    },
    methods: {
        itemActive() {
            if (this.$route.path.includes(this.to)) return
            this.$router.replace(this.to)
        },
    },
}
</script>

<style scoped>
.tab .tab-item {
    position: relative;
    flex: 1;
    text-align: center;
    font-size: 0.66rem;
    align-self: center;
    color: #666;
}
.tab .tab-item span{
    position: absolute;
    background: #df212d;
    width: 0.7rem;
    height: 0.7rem;
    color: #fff;
    line-height: 0.7rem;
    text-align: center;
    font-size: 0.56rem;
    border-radius: 50%;
    top: -0.1rem;
    left: 2.8rem;
    border:0.04rem solid #fff ;

}
.con{
    left: 1.6rem !important;
}
.tab .tab-item img {
    width: 1.4rem;
    height: 1.4rem;
    vertical-align: middle;
}
.iconMax {
    flex: 1 0 46% !important;
    text-align: left !important;
}
.iconMax div {
    display: inline-block;
    font-size: 0.93rem;
    color: #fff;
}
.iconMax div.left {
    background-image: linear-gradient(90deg, #ff814a 0, #f45333 100%);
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    padding: 0.46rem 0.7rem;
}
.iconMax div.right {
    border-left: 0.0172rem solid #fff;
    background-image: linear-gradient(90deg, #e43e2d 0, #ca141d 100%);
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    padding: 0.46rem 1.16rem;
}
.min {
    font-size: 0.58rem;
    color: #333;
}
</style>
