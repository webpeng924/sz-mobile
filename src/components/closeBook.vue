<template>
  <div class="closeBook">
    <van-nav-bar title="结账" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="消费明细" name="1">
        <div class="list">
          <div class="item" v-for="(v,k) in info.orderinfo" :key="k">
            <span class="one-txt-cut">{{v.itemname}}X{{v.num}}</span>
            <span>原价:￥{{v.price*v.num}}</span>
            <span v-show="info.customer_type==2&&isuseCard">会员折后价:￥{{v.price*v.num*v.discount}}</span>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-field
      v-model="title"
      @click="paytypeDialog = true"
      label="支付方式"
      placeholder="请选择"
      is-link
      required
      readonly
    />
    <van-action-sheet v-model="paytypeDialog">
      <van-picker
        title="支付方式"
        @cancel="paytypeDialog=false"
        show-toolbar
        :columns="paytypelist"
        value-key="title"
        @confirm="paytypeConfirm"
        required
      />
    </van-action-sheet>
    <!-- 优惠券单元格 -->
    <!-- <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" /> -->
    <!-- 优惠券列表 -->
    <!-- <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>-->
    <van-field v-model="distotal" label="最终优惠价" placeholder="请输入" />
    <van-submit-bar :price="distotal?distotal*100:payPrice*100" button-text="收款" @submit="submit"></van-submit-bar>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      info: '',
      activeNames: ['1'],
      showList: false,
      title: '',
      storeid: sessionStorage.getItem('storeid'),
      paytypeDialog: false,
      paytypelist: [{ title: '支付宝', pay: 'zfb' }, { title: '微信', pay: 'wx' }, { title: '现金', pay: 'cash' }, { title: '其他', pay: 'other' }],
      distotal: '',
      isuseCard: true,
      haveDistotal: false,
      quanDialog: false,
      choosquan: '',
      quanlist: []
    }
  },
  methods: {
    paytypeConfirm (value) {
      this.paytype = value.pay
      this.title = value.title
      if (this.info.customer_type == 2) {
        if (value.title != '会员卡') {
          this.isuseCard = false
        } else {
          this.isuseCard = true
        }
      }
      this.paytypeDialog = false
    },
    async submit () {
      if (!this.paytype) return this.$toast('请选择支付方式')
      if (this.distotal) {
        const res = await this.$axios.get('/api?datatype=update_order_distotal', {
          params: {
            dis_total: this.distotal,
            storeid: this.storeid,
            id: this.info.id
          }
        })
        if (res.data.code == 1) {
          this.fukuanOK()
        }
      } else {
        this.fukuanOK()
      }
    },
    async  fukuanOK () {
      const res = await this.$axios.get('/api?datatype=pay_order', {
        params: {
          storeid: this.storeid,
          pay_type: this.paytype,
          order_no: this.info.order_no,
          order_id: this.info.id,
          full_price: this.haveDistotal ? null : this.isuseCard ? null : this.fullPrice,
          v_amount: this.choosquan ? this.choosquan.v_amount : 0,
          v_id: this.choosquan ? this.choosquan.id : null,
        }
      })
      if (res.data.code == 1) {
        this.$toast('完成')
        setTimeout(() => {
          this.$router.push({ name: 'payok', params: { money: this.distotal ? this.distotal : this.payPrice, paytype: this.title, obj: JSON.stringify(this.info) } })
        }, 1000);
      } else {
        this.$toast(res.data.msg)
      }
    },
  },
  computed: {
    fullPrice () {
      let sum = 0
      this.info.orderinfo.forEach(item => {
        sum += Number(item.num) * Number(item.price)
      })
      return sum
    },
    payPrice () {
      let sum = 0
      if (this.haveDistotal) {
        sum = this.info.dis_total
      } else {
        if (this.isuseCard) {
          sum = this.info.dis_total
        } else {
          sum = this.fullPrice
        }
      }
      if (this.choosquan) {
        sum = Number(sum) - Number(this.choosquan.v_amount)
      }
      if (sum < 0) {
        sum = 0
      }
      return sum
    }
  },
  created () {
    let obj = this.$route.params.obj
    if (obj) {
      this.info = JSON.parse(obj)
    } else {
      this.$router.go(-1)
    }
    if (this.info.customer_type == 2) {
      this.paytypelist.push({ title: '会员卡', pay: 'card' })
      this.paytypelist.push({ title: '会员签帐', pay: 'signBill' })
      this.title = "会员卡"
      this.paytype = 'card'
    }
  },
  mounted () { },
  watch: {}
}
</script>

<style lang="scss" scoped>
.closeBook {
  .list {
    .item {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
