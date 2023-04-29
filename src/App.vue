<template>
  <HeaderMain></HeaderMain>
  <div class="">
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderMain from "./components/HeaderMain.vue";
export default {
  name: "App",
  components: { HeaderMain },
};
</script>

<style>
#app {
  direction: rtl;
}
</style>
