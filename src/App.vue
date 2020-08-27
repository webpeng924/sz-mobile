<template>
  <div id="app">
    <loading v-show="LOADING"></loading>
    <router-view class="page" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from './components/loading'
export default {
  computed: {
    ...mapState([
      'LOADING'
    ])
  },
  name: 'App',
  components: {
    Loading,
  }
}
</script>

<style lang='css'>
@import '//at.alicdn.com/t/font_1999762_f0emnlummxl.css';
</style>
<style>
#app {
  font-family: '微软雅黑', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
  font-size: 0.24rem;
}
.page {
  height: 100%;
  box-sizing: border-box;
}
</style>
