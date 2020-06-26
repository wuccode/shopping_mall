<template>
    <div class="tab">
        <slot> </slot>
    </div>
</template>
<script>
export default {
    name: 'Tab',
    props: {
        color: {
            type: String,
            default: 'red',
        },
    },
    data() {
        return {}
    },
}
</script>

<style scoped>
.tab {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 2.8rem;
    background: #f8f8f8;
    box-shadow: 0 0.2rem 0.33rem rgba(98, 55, 55, 0.5);
    z-index: 999;
}
</style>
