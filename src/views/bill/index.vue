<template>
  <div class="bill">
    <div class="top">
      <div class="nameView">{{shopInfo.shop_name}}</div>
      <!-- <div class="erweima">
        <i class="iconfont iconsaomiao"></i>
        <span>扫一扫</span>
      </div>-->
    </div>
    <div class="openBill">
      <div class="quickSale">
        <router-link :to="{ name: 'quickmoney' }">
          <div class="quickSale">
            <i class="iconfont iconxiao-fei"></i>
            快速消费
          </div>
        </router-link>
      </div>
      <div class="sale">
        <router-link :to="{ name: 'opennew' }">
          <div class="sale">
            <i class="iconfont iconkaidan"></i>
            开单收银
          </div>
        </router-link>
      </div>
    </div>
    <div class="menu">
      <div class="item" @click="showadd=true">
        <i class="iconfont icontianjiahuiyuan" style="color:#ff8917"></i>
        <p>会员登记</p>
      </div>
      <div class="item">
        <router-link :to="{ name: 'member' }">
          <i class="iconfont iconhuiyuanchongzhi" style="color:#3dec91"></i>
          <p>会员充值</p>
        </router-link>
      </div>
      <div class="item" @click="$toast('开发中')">
        <i class="iconfont iconchongzhijiluicon" style="color:#ff8917"></i>
        <p>购买次卡</p>
      </div>
      <div class="item">
        <router-link :to="{ name: 'items' }">
          <i class="iconfont iconxiangmuguanli1" style="color:#ff1933"></i>
          <p>项目管理</p>
        </router-link>
      </div>
      <div class="item">
        <router-link :to="{ name: 'goods' }">
          <i class="iconfont iconhuazhuangpin" style="color:#646566"></i>
          <p>商品管理</p>
        </router-link>
      </div>
      <div class="item">
        <router-link :to="{ name: 'stock' }">
          <i class="iconfont iconkucunchaxun-" style="color:#ffd01e"></i>
          <p>库存</p>
        </router-link>
      </div>
      <div class="item" @click="showding=true">
        <i class="iconfont icondinghuo" style="color:#809fe0"></i>
        <p>订货</p>
      </div>
      <div class="item" @click="$toast('敬请期待')">
        <i class="iconfont icongengduo" style="color:#ccc"></i>
        <p>更多功能</p>
      </div>
    </div>
    <div class="market">
      <p>营销工具</p>
      <div class="box">
        <div class="lt">营销发券</div>
        <div class="rt">短信营销</div>
      </div>
    </div>

    <van-overlay :show="showding" @click="showding = false">
      <div class="wrapper" @click.stop>
        <p>扫描下方二维码进入订货商城</p>
        <img src="../../assets/images/dinghuoPic.png" alt />
      </div>
    </van-overlay>
    <van-overlay :show="showadd" @click="showadd = false">
      <div class="wrapper" @click.stop>
        <p>请扫面下方二维码</p>
        <p>进入会员专用小程序注册会员</p>
        <img src="../../assets/images/zhuceewm.jpg" alt />
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      showding: false,
      showadd: false,
      shopInfo: JSON.parse(sessionStorage.getItem('shopInfo'))
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
.bill {
  text-align: center;
  .top {
    height: 1.2rem;
    background-color: red;
    line-height: 0.6rem;
    color: #fff;
    padding: 0.3rem;
    margin-bottom: 0.16rem;
    box-sizing: border-box;
    position: relative;
    .nameView {
      text-align: left;
      font-size: 0.36rem;
    }
    .erweima {
      position: absolute;
      right: 0.3rem;
      top: 0;
      display: flex;
      flex-direction: column;
      i {
        font-size: 0.6rem;
        margin-top: 0.16rem;
      }
      span {
        line-height: 0.3rem;
      }
    }
  }
  .openBill {
    height: 1.6rem;
    display: flex;
    justify-content: space-evenly;
    > div {
      width: 48%;
      color: #fff;
      font-size: 0.4rem;
      line-height: 1.5rem;
      i {
        font-size: 0.5rem;
      }
    }
    .quickSale {
      background-color: #fa6759;
      color: #fff;
    }
    .sale {
      background-color: #ff9700;
      color: #fff;
    }
  }
  .menu {
    display: flex;
    flex-wrap: wrap;
    margin: 0.2rem;
    .item {
      width: 25%;
      height: 1.8rem;
      margin-bottom: 0.1rem;
      i {
        font-size: 0.8rem;
      }
      p {
        font-size: 0.32rem;
        color: #333;
      }
    }
  }
  .market {
    font-size: 0.44rem;
    text-align: left;
    padding: 0.2rem;
    border-top: 1px solid #eee;
    p {
      line-height: 1rem;
    }
    .box {
      display: flex;
      font-size: 0.32rem;
      > div {
        flex: 1;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
      }
    }
  }
  .wrapper {
    margin: 2rem 1.2rem;
    padding: 0.5rem;
    background-color: #fff;
    p {
      margin-bottom: 0.2rem;
    }
    img {
      width: 3.5rem;
    }
  }
}
</style>
