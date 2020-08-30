<template>
  <div class="payok">
    <van-nav-bar title="收款成功" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="top">
      <van-icon name="checked" size="100" color="#07c160" />
      <p class="mainRed">￥{{money}}</p>
      <p>{{paytype}} &nbsp;支付成功</p>
    </div>
    <div class="btn">
      <van-button type="info" block size="large" @click="$router.go(-1)">继续销售</van-button>
    </div>
    <div class="btn">
      <van-button type="info" block size="large">打印小票</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      money: this.$route.params.money,
      paytype: this.$route.params.paytype
    }
  },
  methods: {},
  created () { },
  mounted () { },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.payok {
  .top {
    padding-top: 0.2rem;
    text-align: center;
    border-bottom: 1px solid #eee;
    p {
      line-height: 0.64rem;
      font-size: 0.3rem;
    }
  }
  .btn {
    padding: 0.2rem 1rem 0;
    .van-button {
      border-radius: 0.1rem;
    }
  }
}
</style>
