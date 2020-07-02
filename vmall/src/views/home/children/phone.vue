<template>
    <div class="phone">
        <h2>手机</h2>
        <MaxList :phoneMax="phoneMax"></MaxList>
        <List>
            <ul class="listPhone">
                <li class="liphone" v-for="list in phoneMin" :key="list._id">
                    <img class="imgs" v-lazy="'http://localhost:5000' + list.Img" alt />
                    <div class="promotion">
                        <span>{{ list.promotion }}</span>
                    </div>
                    <p>{{ list.title }}</p>
                    <p class="price">
                        <em>{{ list.price | money }}</em>
                        <del v-if="list.discount_price != ''">{{ list.discount_price | money }}</del>
                    </p>
                </li>
            </ul>
        </List>
    </div>
</template>
<script>
import List from './List'
import MaxList from './MaxList'
export default {
    name: 'Phone',
    props: {
        phone_list: Array,
    },
    computed: {
        phoneMin() {
            return this.phone_list.filter((arr, index) => index > 3)
        },
        phoneMax() {
            return this.phone_list.filter((arr, index) => index <= 3)
        },
    },
    components: {
        List,
        MaxList,
    },
}
</script>
<style scoped>
.phone h2 {
    text-align: center;
    padding: 1rem 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 500;
    color: #444;
}
</style>
