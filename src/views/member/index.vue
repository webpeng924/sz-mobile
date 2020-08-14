<template>
  <div class="member">
    <div class="member_search">
      <van-search v-model="value"
                  shape="round"
                  background="#fff"
                  placeholder="请输入搜索关键词" />
      <i class="iconfont iconsaomiao saomiao"></i>
    </div>
    <div class="member_total p20">
      共278位会员，总余额：112121331.0元，总积分：12123123
    </div>
    <div class="member_list_case">
      <div class="member_list p10"
           v-for="item in 10"
           :key="item">
        <div class="list_left">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg"
               alt="">
        </div>
        <div class="list_middle">
          <div class="list_middle_item">
            <div class="list_name">李{{item}}</div>
            <div class="list_time">2020-08-14</div>
          </div>
          <div class="list_middle_item">
            <div class="list_balance">
              余额:<span>¥ 123123123</span>
            </div>
            <div class="list_integral">
              手机号:<span>13888888888</span>
            </div>
          </div>
        </div>
        <div class="list_right">
          <i class="iconfont iconfanhui-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      value: '',
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
.member {
  font-size: 0.28rem /* 14/50 */;
  .member_search {
    position: relative;
    .saomiao {
      color: #8ba8e7;
      font-size: 0.4rem /* 20/50 */;
      position: absolute;
      top: 12px;
      right: 25px;
    }
  }
  .member_total {
    background-color: #f5f6fa;
    font-size: 0.28rem /* 14/50 */;
  }
  .member_list_case {
    height: calc(100% - 136px);
    overflow: auto;
    .member_list {
      display: flex;
      height: 60px;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .list_left {
        width: 70px;
        height: 60px;
        text-align: center;
        margin-right: 0.1rem /* 5/50 */;
        img {
          max-width: 100%;
          height: 100%;
        }
      }
      .list_middle {
        flex: 1;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list_middle_item {
          display: flex;
          justify-content: space-between;
          .list_name {
            font-weight: 700;
          }
        }
      }
      .list_right {
        margin-left: .1rem /* 5/50 */;
        i {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
