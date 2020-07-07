<template>
  <div id="app" v-if="$route.meta.isShowAside">
    <div class="sidebar">
      <mycard></mycard>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
  <div id="app" v-else>
    <router-view></router-view>
  </div>
</template>

<script>
import mycard from "./components/mycard/mycard";
import { mapActions } from "vuex";
export default {
  components: {
    mycard
  },
  created() {
    this.$store.dispatch("initData");
  }
};
</script>

<style lang="stylus" scoped>
#app {
  display: flex;
  border-radius: 10px;
  margin: 150px auto;
  width: $width;
  height: $height;
  // background-color: #fff;

  .sidebar {
    width: 60px;
    height: 600px;
    background: #2b2c2f;
  }

  .main {
    flex: 1;
    height: 600px;
    background: #f2f2f2;
  }
}
</style>
