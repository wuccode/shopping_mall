<template>
  <div class="phone">
    <h2>平板</h2>
    <MaxList :phoneMax="tabletMax" :flag="true" :bottom="true"></MaxList>
    <List>
      <ul class="listTablet">
        <li class="liTablet" v-for="list in tabletMin" :key="list._id">
          <img class="" v-lazy="'http://localhost:5000'+list.Img" alt />
          <div class="promotion">
            <span>{{list.promotion}}</span>
          </div>
          <p>{{list.title}}</p>
          <p class="price">
            <em>{{list.price | money}}</em>
            <del v-if="list.discount_price != ''">{{list.discount_price | money}}</del>
          </p>
        </li>
      </ul>
    </List>
  </div>
</template>
<script>
import List from "./List";
import MaxList from "./MaxList";
export default {
    name:'Tablet',
    props:{
        tablet_list:Array
    },
     computed:{
     tabletMin(){
       return this.tablet_list.filter((arr,index) => index > 3)
     },
     tabletMax(){
       return this.tablet_list.filter((arr,index) => index <= 3)
     }
    },
    components:{
        List,
        MaxList
    }
};
</script>
<style scoped>
 .phone h2{
  text-align: center;
  padding: 1rem 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #444;
}
</style>