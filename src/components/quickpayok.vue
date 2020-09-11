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
      <van-button type="info" block size="large" @click="print">打印小票</van-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {},
  props: {},
  data () {
    return {
      money: this.$route.params.money,
      paytype: this.$route.params.paytype,
    }
  },
  methods: {
    print () {
      let arr = [{ "name": JSON.parse(sessionStorage.getItem('shopInfo')).shop_name, "style": "1" }, { "name": "收银单", "style": "1" }, { "name": "---" }]
      let time = moment(new Date()).format('YYYY-MM-DD HH:mm')
      arr.push({ "name": "消费日期：" + time }, { "name": "---" }, { "name": "快速收款", "value": this.money })
      arr.push({ "name": "---" }, { "name": "支付方式", "value": "合计" }, { name: this.paytype, value: this.money }, { "name": "---" }, { "name": "门店电话：" + JSON.parse(sessionStorage.getItem('shopInfo')).mobile }, { "name": "门店地址：" + JSON.parse(sessionStorage.getItem('shopInfo')).address }, { "name": "收银员：" + JSON.parse(sessionStorage.getItem('userInfo')).username }, { "name": "签字：" }, { "name": "感谢您的光临！" })
      var a = JSON.stringify(arr);
      console.log(a)
      javascript: jsSzb.smPrint(a);
      return false;
    },
  },
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
