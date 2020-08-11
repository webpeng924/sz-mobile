<template>
  <div class="home">
    <router-view class="home_content" />
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/one" replace name="one"
        >标签</van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/two" replace name="two"
        >标签</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" to="/three" replace name="three"
        >标签</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/four" replace name="four"
        >标签</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      active: "one"
    };
  },
  components: {}
};
</script>
<style lang="scss" scoped></style>
