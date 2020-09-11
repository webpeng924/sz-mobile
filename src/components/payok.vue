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
      info: JSON.parse(this.$route.params.obj),
      workerlist: ''
    }
  },
  methods: {
    print () {
      let arr = [{ "name": JSON.parse(sessionStorage.getItem('shopInfo')).shop_name, "style": "1" }, { "name": "收银单", "style": "1" }, { "name": "---" }, { "name": "消费单号：" + this.info.order_no }]
      let time = moment.unix(this.info.dateline).format('YYYY-MM-DD HH:mm')
      arr.push({ "name": "消费日期：" + time }, { "name": "---" }, { "name": "消费明细", "value": "" }, { "name": "标准价", "value": "数量 #A# 折扣 #A# 金额" }, { "name": "---" })
      this.info.orderinfo.forEach(v => {
        let type = " 服务: "
        if (v.typeid == 2) {
          type = " "
        }
        let worker = this.workerlist.find(j => j.id == v.staff1)
        if (worker) {
          arr.push({ "name": v.itemname + type + worker.name })
        } else {
          arr.push({ "name": v.itemname + type + '' })
        }
        let discount = v.discount == 1 ? '原价' : v.discount + '折扣'
        let discount_price = v.discount == 1 ? '-' : v.discount_price
        arr.push({ name: v.price, value: v.num + "#A#" + discount + "#A# " + discount_price })
      })
      let remark = this.info.remark == null ? '' : this.info.remark
      arr.push({ "name": "---" }, { "name": "支付方式", "value": "合计" }, { name: this.paytype, value: this.money }, { "name": "---" }, { "name": "备注: " + remark }, { "name": "门店电话：" + JSON.parse(sessionStorage.getItem('shopInfo')).mobile }, { "name": "门店地址：" + JSON.parse(sessionStorage.getItem('shopInfo')).address }, { "name": "收银员：" + JSON.parse(sessionStorage.getItem('userInfo')).username }, { "name": "签字：" }, { "name": "感谢您的光临！" })
      var a = JSON.stringify(arr);
      console.log(a)
      javascript: jsSzb.smPrint(a);
      return false;
    },
    async getworkerlist () {
      const res = await this.$axios.get('/api?datatype=get_staff_list', {
        params: {
          storeid: sessionStorage.getItem('storeid'),
          is_li: 1,
          is_wei: 1
        }
      })
      if (res.data.code == 1 && res.data.data) {
        res.data.data.forEach(item => {
          if (!item.avatar) {
            item.avatar = '/upload/shop/moren.jpg'
          }
        })
        this.workerlist = res.data.data
        sessionStorage.setItem('workerlist', JSON.stringify(res.data.data))
      } else {
        this.workerlist = []
      }
    },
  },
  created () {
    if (!this.$route.params.money) return this.$router.go(-1)
    let workerlist = JSON.parse(sessionStorage.getItem('workerlist'))
    if (workerlist) {
      this.workerlist = workerlist
    } else {
      this.getworkerlist()
    }
  },
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
