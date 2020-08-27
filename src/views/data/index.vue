<template>
  <div class="data">
    <div class="data_top">数据</div>
    <!-- <van-dropdown-menu>
      <van-dropdown-item v-model="value" :options="option" title="mm门店" />
    </van-dropdown-menu>-->
    <div class="data_cell_case p10">
      <div class="data_title">
        <div class="title_left">
          <span>收入</span>
          <i class="iconfont iconguanyuwomen"></i>
        </div>
        <div class="title_right">
          <div class="title_number">
            <span class="money">0</span>笔
          </div>
          <div class="title_price">
            <span class="money">0.00</span>元
          </div>
        </div>
      </div>
      <div class="data_time">
        <div class="time_around">
          <div class="start date" @click="open('start')">
            <span>{{ startDate | time("y-m-d") }}</span>
            <van-icon name="arrow-down" />
          </div>
          <span class="point">至</span>
          <div class="end date" @click="open('end')">
            <span>{{ endDate | time("y-m-d") }}</span>
            <van-icon name="arrow-down" />
          </div>
        </div>
        <div class="time_now date">看今天</div>
      </div>
      <vue-cell v-for="(item, index) in payList" :key="index">
        <template #cellLeft>
          <div class="cell_left">
            <div class="cell_select"></div>
            {{ item.title }}
          </div>
        </template>
        <template #cellMiddle>{{ item.number }}笔</template>
        <template #cellRight>
          {{ item.price }}
          <i class="iconfont iconfanhui-right"></i>
        </template>
      </vue-cell>
    </div>
    <div class="line"></div>
    <div class="data_cell_case">
      <div class="data_title p10">
        <span class="title_left">营业明细</span>
      </div>
      <div class="data_time_select m20">
        <div class="select select_left" @click="timeUp" :class="{ active: downTime }">
          <i class="iconfont iconfanhui-left"></i>
        </div>
        <div class="select" @click="open('select')">
          <span>{{ selectTime | time("y-m-d") }}</span>
          <i class="iconfont iconxiangxia"></i>
        </div>
        <div class="select select_right" @click="timeDown" :class="{ active: upTime }">
          <i class="iconfont iconfanhui-right"></i>
        </div>
      </div>
      <vue-cell v-for="(item, index) in rankList" :key="index" class="rank_bgc">
        <template #cellLeft>
          <div class="cell_left">
            <div class="cell_num">{{ index + 1 }}</div>
            {{ item.name }}
          </div>
        </template>
        <template #cellMiddle>{{ item.number }}笔</template>
        <template #cellRight>
          {{ item.price }}
          <i class="iconfont iconfanhui-right"></i>
        </template>
      </vue-cell>
    </div>
    <van-popup v-model="show" position="bottom" round>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="show = false"
        @confirm="submit"
      />
    </van-popup>
  </div>
</template>

<script>
import pub from "common/js/public.js";
import vueCell from "components/cell.vue";
const MINDATE = new Date(new Date(new Date(2020, 7, 8)).getTime());
const MAXDATE = new Date(new Date(new Date().toLocaleDateString()).getTime());
const MILLISECOND = 86400000;

export default {
  components: {
    vueCell
  },
  props: {},
  data () {
    return {
      value: 0, //店铺选择
      option: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ], //店铺数据
      payList: [
        { title: "移动支付", number: 0, price: "0.00" },
        { title: "现金", number: 0, price: "0.00" },
        { title: "银行卡", number: 0, price: "100000.00" }
      ], //支付列表数据
      rankList: [
        {
          rank: 1,
          name: "小李",
          number: 0,
          price: "1200.00"
        },
        {
          rank: 2,
          name: "小彭",
          number: 0,
          price: "0.00"
        }
      ], //销售列表数据
      type: "", //选择日期类型
      currentDate: "", //绑定选择日期
      show: false, //展开日历
      startDate: MINDATE, //开始时间
      endDate: MAXDATE, //结束时间
      selectTime: MAXDATE, //选择时间
      upTime: true, //增加时间按钮
      downTime: false, //减少时间按钮
      minDate: MINDATE, //最小时间区间
      maxDate: MAXDATE //最大时间区间
    };
  },
  methods: {
    // 点击展开日历
    open (type) {
      this.show = !this.show;
      this.type = type;
      switch (type) {
        case "start":
          this.minDate = MINDATE;
          break;
        case "end":
          this.maxDate = MAXDATE;
          break;
        case "select":
          this.minDate = MINDATE;
          this.maxDate = MAXDATE;
          break;
      }
    },
    // 日历确定按钮
    submit () {
      switch (this.type) {
        case "start":
          this.startDate = this.currentDate;
          this.minDate = this.currentDate;
          break;
        case "end":
          this.endDate = this.currentDate;
          this.maxDate = this.currentDate;
          break;
        case "select":
          this.selectTime = this.currentDate;
          break;
      }
      this.show = false;
    },
    // 筛选时间增加按钮
    timeUp () {
      if (this.downTime) return;
      this.selectTime = +this.selectTime - MILLISECOND;
    },
    //筛选时间减少按钮
    timeDown () {
      if (this.upTime) return;
      this.selectTime = +this.selectTime + MILLISECOND;
    }
  },
  watch: {
    selectTime () {
      let upLackTime = +MAXDATE - +this.selectTime;
      let downLackTime = +this.selectTime - +MINDATE;
      this.upTime = false;
      this.downTime = false;
      if (upLackTime === 0) {
        this.upTime = true;
      }
      if (downLackTime === 0) {
        this.downTime = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.css';
.data {
  .data_top {
    text-align: center;
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
  .data_cell_case {
    font-size: 0.28rem /* 14/50 */;
    .money {
      color: #e27554;
      margin: 2px;
    }
    .data_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title_left {
        font-size: 0.32rem /* 16/50 */;
        font-weight: 700;
      }
      .title_right {
        display: flex;
      }
    }
    .data_time {
      padding: 0.4rem 0 0.2rem 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #e0e3e7;
      margin-bottom: 3px;
      .time_around {
        display: flex;
        align-items: center;
        .point {
          margin: 0 3px;
        }
      }
      .date {
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 3px 8px;
        background-color: #eff0f2;
      }
    }
    .cell_left {
      display: flex;
      align-items: center;
      .cell_select {
        width: 0.2rem /* 10/50 */;
        height: 0.2rem;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin-right: 0.1rem /* 5/50 */;
      }
      .cell_num {
        margin-right: 0.1rem;
      }
    }
    .data_time_select {
      display: flex;
      align-items: center;
      justify-content: center;
      .select {
        background: #ccc;
        padding: 2px 5px;
      }
      .select_left {
        border-radius: 10px 0 0 10px;
        margin-right: 1px;
      }
      .select_right {
        border-radius: 0px 10px 10px 0;
        margin-left: 1px;
      }
    }
  }
  .rank_bgc {
    padding: 10px;
    background-color: #fafafa;
  }
  .active {
    background-color: #f1f1f1 !important;
  }
}
</style>
