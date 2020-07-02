<template>
    <div class="phone">
        <h2>笔记本</h2>
        <MaxList :phoneMax="noteBookMax" :flag="true"></MaxList>
        <List>
            <ul class="listPhone">
                <li class="liNote" v-for="list in noteBookMin" :key="list._id">
                    <img class="" v-lazy="'http://localhost:5000' + list.Img" alt />
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
    name: 'NoteBook',
    props: {
        noteBook_list: Array,
    },
    computed: {
        noteBookMin() {
            return this.noteBook_list.filter((arr, index) => index > 3)
        },
        noteBookMax() {
            return this.noteBook_list.filter((arr, index) => index <= 3)
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
