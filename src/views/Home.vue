<template>
  <div class="home">
    <router-view class="home_content" />
    <van-tabbar route>
      <van-tabbar-item to="/bill">
        <span>首页</span>
        <template #icon>
          <i class="iconfont iconhome"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/data">
        <span>数据</span>
        <template #icon>
          <i class="iconfont iconshuju"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/member">
        <span>会员</span>
        <template #icon>
          <i class="iconfont iconhuiyuan"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">
        <span>我的</span>
        <template #icon>
          <i class="iconfont iconwodexinxi"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data () {
    return {
    };
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.home {
  .home_content {
    height: calc(100% - 50px);
  }
}
</style>
