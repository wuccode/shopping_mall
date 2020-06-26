<template>
  <div id="app">
    <!-- <transition mode="out-in"> -->
      <keep-alive include="Home">
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->

    <Tab />
  </div>
</template>
<script>
import Tab from "./components/Tab";
export default {
  name: "App",
  components: {
    Tab
  }
};
</script>
<style scoped>
@import "./config/index.css";
.v-enter-active, .v-leave-active {
  transition: opacity .2s;
}
/* .v-enter{
  opacity: 1;
} */
.v-enter,.v-leave-to{
  opacity: 0;
}
</style>
