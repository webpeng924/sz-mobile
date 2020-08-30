<template>
  <div class="data">
    <div class="data_top">数据</div>
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
        <div class="time_now date" @click="getNow">看今天</div>
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
      <vue-cell style="color:#df2e48" v-show="signBill">
        <template #cellLeft>
          <div class="cell_left">
            <div class="cell_select"></div>
            {{ signBill.title }}
          </div>
        </template>
        <template #cellMiddle>{{ signBill.number }}笔</template>
        <template #cellRight>
          {{ signBill.price }}
          <i class="iconfont iconfanhui-right"></i>
        </template>
      </vue-cell>
    </div>
    <div class="line"></div>
    <div class="data_cell_case">
      <div class="data_title p10">
        <span class="title_left">营业明细</span>
      </div>
      <!-- <div class="data_time_select m20">
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
      </div>-->
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
    <van-calendar
      v-model="show"
      type="range"
      @confirm="onConfirm"
      :show-confirm="false"
      :allow-same-day="true"
      :default-date="[new Date(startDate),new Date(endDate)]"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
import pub from "common/js/public.js";
import vueCell from "components/cell.vue";
const MINDATE = new Date(new Date(2018, 1, 1).getTime());
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
        { title: "支付宝", number: 0, price: "0.00" }
      ], //支付列表数据
      signBill: '',
      storeid: sessionStorage.getItem('storeid'),
      totalL: '',
      rankList: [
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
  created () {
    this.getNow()
  },
  methods: {
    getNow () {
      // const a = this.formatDate(new Date())
      this.startDate = new Date()
      this.endDate = new Date()
      this.getData()
    },
    formatDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    },
    async getData () {
      let start = this.formatDate(this.startDate)
      let end = this.formatDate(this.endDate)
      const res = await this.$axios.get('/api?datatype=day_money_index', {
        params: {
          storeid: this.storeid,
          start: start,
          end: end
        }
      })
      if (res.data.code == 1) {
        this.total = 0
        this.list1 = []
        this.list2 = []
        this.list3 = []
        this.newcus = 0
        this.oldcus = 0
        this.nocard = 0
        this.card = 0
        this.chong = {
          ccount: 0,
          point: 0,
          total: 0
        }
        this.kaika = {
          ccount: 0,
          point: 0,
          total: 0
        }
        this.infolist = res.data.data
        if (res.data.data.arr1) {
          res.data.data.arr1.forEach(item => {
            this.total += Number(item.stotal)
            if (item.pay_type == 'card') {
              this.list2.push(item)
            } else if (item.pay_type == 'signbill') {
              this.list3.push(item)
            } else {
              this.list1.push(item)
            }
          })
          this.total = this.total.toFixed(2)
        }
        if (res.data.data.customer1) {
          res.data.data.customer1.forEach(item => {
            if (item.customer_type == 1) {
              this.nocard = item.ccount
            } else {
              this.card = item.ccount
            }
          })
          res.data.data.customer1.forEach(item => {
            if (item.customer_type == 1) {
              this.newcus = item.ccount
            } else {
              this.oldcus = item.ccount
            }
          })
        }
        if (res.data.data.member != null) {
          res.data.data.member.forEach(item => {
            if (item.type == '充值') {
              this.chong = item
            } else if (item.type == '卖卡') {
              this.kaika = item
            }
          })
        }
        this.$toast('加载完成')
      }
    },
    // 点击展开日历
    open () {
      this.show = !this.show;
    },
    onConfirm (date) {
      console.log(date)
      this.show = false;
      this.startDate = this.formatDate(date[0])
      this.endDate = this.formatDate(date[1])
    },
    // 筛选时间增加按钮
    timeUp () {
      if (this.downTime) return;
      this.selectTime = +this.selectTime - MILLISECOND;
    },
    //筛选时间减少按钮
    timeDown () {
      if (this.upTime) return this.$toast('已是最新日期');
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
    // .cell:last-child {
    //   color: #df2e48;
    // }
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
