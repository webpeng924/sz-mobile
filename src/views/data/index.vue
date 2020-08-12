<template>
  <div class="data">
    <div class="data_top">数据</div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value"
                         :options="option" title="mm门店"/>
    </van-dropdown-menu>
    <div class="data_insome_case p10">
      <div class="data_insome">
        <div class="insome_left">
          <span>我的收入</span>
          <i class="iconfont iconguanyuwomen"></i>
        </div>
        <div class="insome_right">
          <div class="insome_number">
            <span class="money">0</span>笔
          </div>
          <div class="insome_price">
            <span class="money">0.00</span>元
          </div>
        </div>
      </div>
      <div class="data_time"></div>

    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      value: 0,
      option: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
    }
  },
  methods: {},
  created() {},
  mounted() {},
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.css';
.data {
  .data_top {
    height: 1rem /* 50/50 */;
    background-color: #df2e48;
    color: #fff;
    font-size: 0.32rem /* 16/50 */;
    line-height: 1rem /* 50/50 */;
  }
  /deep/.van-dropdown-menu__bar {
    box-shadow: none;
    border-bottom: 1px solid #f6f6f6;
  }
  .data_insome_case {
    font-size: .28rem /* 14/50 */;
    .money{
      color: #E27554;
      margin: 2px;
    }
    .data_insome {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .insome_right{
        display: flex;
      }
    }
    
  }
}
</style>
