<template>
    <div class="phone">
        <h2>配件</h2>
        <MaxList :phoneMax="accessoriesMax"></MaxList>
        <List>
            <ul class="listAccessories">
                <li class="liAccessories" v-for="list in accessoriesMin" :key="list._id">
                    <img class="imgs" v-lazy="'http://192.168.3.6:5000' + list.Img" alt />
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
    name: 'Accessories',
    props: {
        accessories_list: Array,
    },
    computed: {
        accessoriesMin() {
            return this.accessories_list.filter((arr, index) => index > 5)
        },
        accessoriesMax() {
            return this.accessories_list.filter((arr, index) => index <= 5)
        },
    },
    components: {
        List,
        MaxList,
    },
}
</script>
<style scoped>
.phone{
    margin-bottom:3rem ;
}
.phone h2 {
    text-align: center;
    padding: 1rem 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 500;
    color: #444;
}
</style>
