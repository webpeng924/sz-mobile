<template>
  <div class="quickmoney">
    <van-nav-bar title="快速消费" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="top">
      <span>消费金额：</span>
      <van-field v-model="value" placeholder="0.00" @blur="fixed" type="number" />
    </div>
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
    <div class="bom">
      <div class="lf">
        收款
        <span class="mainRed">￥{{value?value:'0.00'}}</span>
      </div>
      <div class="rt bgRed" @click="submit">收款</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      value: '',
      paytype: '',
      storeid: sessionStorage.getItem('storeid'),
      title: '',
      paytypeDialog: false,
      paytypelist: [{ title: '支付宝', pay: 'zfb' }, { title: '微信', pay: 'wx' }, { title: '现金', pay: 'cash' }, { title: '其他', pay: 'other' }]
    }
  },
  methods: {
    paytypeConfirm (value) {
      this.paytype = value.pay
      this.title = value.title
      this.paytypeDialog = false
    },
    async submit () {
      if (!this.paytype) return this.$toast('请选择支付方式')
      const res = await this.$axios.get('/api?datatype=quick_pay', {
        params: {
          storeid: this.storeid,
          dis_total: this.value,
          pay_type: this.paytype
        }
      })
      if (res.data.code == 1) {
        this.$toast('收款成功')
        setTimeout(() => {
          this.$router.push({ name: 'payok', params: { money: this.value, paytype: this.title } })
        }, 1000);
      } else {
        this.$toast('收款失败')
      }
    },
    fixed () {
      this.value = Number(this.value).toFixed(2)
    }
  },
  created () { },
  mounted () { },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.quickmoney {
  height: 100%;
  background-color: #f9f9f9;
  .top {
    background-color: #fff;
    height: 1.2rem;
    line-height: 1.5rem;
    display: flex;
    padding: 0 1.5rem 0.2rem;
    border-bottom: 1px solid #eee;
    span {
      width: 2rem;
      font-size: 0.32rem;
      text-align: right;
    }
    .van-field {
      height: 1.2rem;
      line-height: 1.2rem;
      flex: 1;
      border-bottom: 1px solid #eee;
    }
  }
  .bom {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    background-color: #fff;
    height: 1rem;
    line-height: 1rem;
    .lf {
      flex: 1;
      padding-left: 0.2rem;
      font-size: 0.32rem;
    }
    .rt {
      width: 3rem;
      color: #fff;
      text-align: center;
      font-size: 0.36rem;
    }
  }
}
</style>
