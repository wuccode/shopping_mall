<template>
    <div class="buttonTop" @click="$emit('BackTop')"></div>
</template>
<script>
export default {
    name:"ButtonTop",
    data() {
        return {}
    },
    methods: {

    },
}
</script>
<style scoped>
.buttonTop{
    position: fixed;
    z-index: 9999;
    width: 3.4rem;
    height: 3.4rem;
    bottom: 3rem;
    right: 0.5rem;
    border-radius: 50%;
    background: url('./../images/button-top.png') no-repeat;
    background-size:cover ;
}
</style>
