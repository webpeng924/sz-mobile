<template>
  <div class="opennew">
    <van-nav-bar title="开单" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs v-model="active" :before-change="beforeChange">
      <van-tab title="选择项目" name="1">
        <div class="content">
          <items :from="'open'" @add="additem"></items>
        </div>
      </van-tab>
      <van-tab title="选择产品" name="2">
        <div class="content">
          <goods :from="'open'" @add="addgood"></goods>
        </div>
      </van-tab>
      <van-tab :title="member?member.name:'选择会员'" name="3">
        <div class="content1">
          <member :from="'open'" @add="addmember"></member>
        </div>
      </van-tab>
      <van-tab title="选择次卡" name="4">
        <div class="content1">
          <div class="list">
            <van-cell :title="v.itemname" v-for="(v,k) in cikalist" :key="k" @click="setcika(v)">
              <div>{{v.typeid|type}}</div>
              <template #label>
                <div>剩余次数：{{v.typeid==1?v.rest_count:'不限'}}</div>
              </template>
            </van-cell>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-submit-bar :price="sumprice" button-text="结算" @submit="submit" v-show="chooslist.length">
      <van-icon name="shopping-cart-o" size="30" :badge="chooslist.length" @click="show=!show" />
    </van-submit-bar>
    <van-submit-bar button-text="结算" v-show="!chooslist.length" disabled>
      <van-icon name="shopping-cart-o" size="30" />
      <p style="width:60%;padding:0.3rem;color:#ccc;font-size:0.32rem">请添加商品</p>
    </van-submit-bar>
    <!-- 购物车 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-action-sheet v-model="show" title="已选商品" :overlay="false">
          <div class="carlist">
            <div class="item" v-for="(v,k) in chooslist" :key="k">
              <div class="tit">
                {{v.itemname}}
                <span
                  v-show="v.staff1"
                  @click="chooseItem=v;showstaff=true"
                >服务人员：{{v.worker.name}}(No.{{v.worker.job_no}})</span>
                <span
                  v-show="!v.staff1&&v.typeid!=2"
                  @click="chooseItem=v;chooseIndex=k;showstaff=true"
                >未设置服务人员</span>
              </div>
              <div class="bom">
                <span>
                  <span class="mainRed">￥{{(Number(v.price)*v.num*v.discount).toFixed(2)}}</span>
                  <van-icon
                    v-show="v.is_usecard!=1"
                    name="edit"
                    @click="chooseItem=v;chooseIndex=k;discount=v.discount;showEdit=true"
                  />
                  <van-tag
                    color="#ffe1e1"
                    text-color="#ad0000"
                    v-show="v.discount!=1&&v.is_usecard!=1"
                  >折扣&nbsp;{{v.discount}}</van-tag>
                </span>
                <van-stepper
                  v-model="v.num"
                  theme="round"
                  button-size="22"
                  :max="v.maxNum"
                  min="0"
                  disable-input
                  @minus="del(v,k)"
                />
              </div>
            </div>
          </div>
        </van-action-sheet>
      </div>
    </van-overlay>
    <van-action-sheet v-model="showstaff" title="选择服务人员">
      <div class="list">
        <van-cell
          title="单元格"
          :label="v.mobile"
          v-for="(v,k) in workerlist"
          :key="k"
          @click="setSatff(v)"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <van-image width="40" height="40" fit="cover" :src="v.avatar|imgUrl" />
          </template>
          <template #title>
            <span class="ss s1">{{v.name}}</span>
            <span class="ss">{{v.job_no}}</span>
          </template>
          <template #right-icon>
            <div>
              <span class="arrow" style="color:#1989fa;font-size:0.3rem">{{v.job}}</span>
              <p style="text-align:right" v-show="v.id==chooseItem.stff1">
                <van-icon name="checked" size="24" color="#07c160" />
              </p>
            </div>
          </template>
        </van-cell>
      </div>
    </van-action-sheet>
    <van-dialog show-cancel-button v-model="showEdit" title="修改价格" @confirm="editPrice">
      <van-field v-model="chooseItem.price" label="原价" placeholder="请输入" readonly />
      <van-field v-model="discount" label="折扣" placeholder="请输入0~1" />
      <van-field
        v-model="newPrice"
        label="折后价格"
        placeholder="请输入"
        type="number"
        @change="changeNew"
      />
    </van-dialog>
  </div>
</template>

<script>
import goods from '@/views/store/goods'
import items from '@/views/store/items'
import member from '@/views/member'
import qs from 'qs'
export default {
  components: { goods, items, member },
  props: {},
  data () {
    return {
      active: '',
      member: '',
      storeid: sessionStorage.getItem('storeid'),
      show: false,
      number: '',
      discount: 1,
      newPrice: '',
      chooslist: [],
      workerlist: [],
      cikalist: [],
      chooseItem: '',
      chooseIndex: '',
      showEdit: false,
      showstaff: false
    }
  },
  filters: {
    type (val) {
      switch (val) {
        case '1':
          return '次卡';
        case '2':
          return '月卡';
        case '3':
          return '季卡';
        case '4':
          return '年卡';
      }
    }
  },
  methods: {
    // 切换标签
    beforeChange (name) {
      if (name == 4) {
        if (!this.member) {
          this.$toast('请先选择会员')
          this.active = '3'
        } else {
          this.active = name
          this.getcicardInfo()
        }
      } else if (name == 3) {
        if (this.member) {
          this.$dialog.confirm({
            message: '取消当前会员选择吗？',
          })
            .then(() => {
              this.member = ''
            })
            .catch(() => {
              // on cancel
            });
        } else {
          this.active = name
        }
      } else {
        this.active = name
      }
    },
    async getcicardInfo () {
      const res = await this.$axios.get('/api?datatype=get_card_memberitem', {
        params: {
          storeid: this.storeid,
          member_id: this.member.member_id,
          sign: 1
        }
      })
      if (res.data.code == 1) {
        this.cikalist = res.data.data
      } else {
        this.cikalist = []
      }
    },
    additem (v) {
      console.log(v)
      let discount = 1
      if (this.member) {
        discount = Number(this.member.item_discount) / 10
      }
      let obj = {
        worker: '',
        typeid: 1,
        itemid: v.id,
        num: 1,
        itemname: v.name,
        staff1: 0,
        price: Number(v.price),
        subtotal: Number(v.price),
        is_usecard: 0,
        discount: discount
      }
      this.chooslist.push(obj)
      this.$toast('添加成功')
    },
    addgood (v) {
      console.log(v)
      let discount = 1
      if (this.member) {
        discount = Number(this.member.goods_discount) / 10
      }
      let obj = {
        worker: '',
        typeid: 2,
        itemid: v.goods_id,
        num: 1,
        itemname: v.goods_name,
        staff1: 0,
        price: Number(v.price),
        subtotal: Number(v.price),
        is_usecard: 0,
        discount: discount
      }
      this.chooslist.push(obj)
      this.$toast('添加成功')
    },
    addmember (v) {
      console.log(v)
      this.member = v
    },
    del (v, k) {
      if (v.num == 1) {
        this.chooslist.splice(k, 1)
        if (!this.chooslist.length) {
          this.show = false
        }
      }
    },
    setSatff (v) {
      this.chooslist.forEach((item, index) => {
        if (index == this.chooseIndex) {
          item.staff1 = v.id
          item.worker = v
        }
      })
      this.showstaff = false
    },
    editPrice () {
      this.chooslist.forEach((item, index) => {
        if (index == this.chooseIndex) {
          item.discount = this.discount
          item.subtotal = item.price * item.discount * item.num
        }
      })
      this.showEdit = false
    },
    changeNew () {
      this.discount = (this.newPrice / this.chooseItem.price).toFixed(2)
    },
    // 获取会员欠款
    async getInfo (id) {
      const res = await this.$axios.get("/api?datatype=get_one_member", {
        params: {
          storeid: this.storeid,
          member_id: id
        }
      });
      if (res.data.code == 1) {
        if (Number(res.data.data.signbill) > 0) {
          this.$dialog.alert({
            message: '该会员欠款：' + res.data.data.signbill + ' 元',
          }).then(() => {
            // on close
          });
        }
      }
    },
    async getmembercount () {
      const res = await this.$axios.get('/api?datatype=get_member_discount', {
        params: {
          storeid: this.storeid,
          member_id: this.member.member_id
        }
      })
      if (res.data.code == 1) {
        this.member = Object.assign(this.member, res.data.data)
        if (this.chooslist.length) {
          this.chooslist.forEach(item => {
            if (item.discount == 1) {
              if (item.typeid == 2) {
                item.discount = Number(this.member.goods_discount) / 10
              } else {
                item.discount = Number(this.member.item_discount) / 10
              }
            }
          })
        }
      }
    },
    // 选择次卡
    setcika (v) {
      console.log(v)
      let discount = 1
      if (this.member) {
        discount = Number(this.member.goods_discount) / 10
      }
      let obj = {
        worker: '',
        is_usecard: 1,
        typeid: 1,
        itemid: v.id,
        num: 1,
        itemname: v.itemname,
        price: 0,
        cikaid: v.id,
        subtotal: 0,
        discount: discount,
      }
      if (v.typeid == 1) {
        obj['maxNum'] = v.rest_count
      }
      this.chooslist = this.chooslist.filter(item => !item.cikaid || item.cikaid != v.id)
      this.chooslist.push(obj)
      this.$toast('添加成功')
    },
    async getworkerlist () {
      const res = await this.$axios.get('/api?datatype=get_staff_list', {
        params: {
          storeid: this.storeid,
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
      }
    },
    async submit () {
      if (!this.chooslist.length) return this.$toast('请至少选择一个项目或产品')
      let type = 1
      let id = 0
      this.chooslist.forEach(item => {
        item['discount_price'] = Number(item.price) * item.discount * item.num
        item['subtotal'] = Number(item.price) * item.discount * item.num
      })
      let obj = {
        storeid: this.storeid,
        customer_type: this.member ? '2' : '1',
        status: 1,
        total: this.sumprice / 100,
        remark: this.memo,
        member_id: this.member ? this.member.member_id : 0,
        orderinfo: this.chooslist,
        type: type,
        id: id,
        dis_total: this.sumprice / 100
      }
      let data = qs.stringify(obj)
      console.log(obj)
      const res = await this.$axios.post('/api?datatype=insert_order', data)
      this.$toast(res.data.msg)
      if (res.data.code == 1) {
        this.$set(res.data.data, 'orderinfo', this.chooslist)
        this.$router.push({ name: 'closeBook', params: { obj: JSON.stringify(res.data.data) } })
      }
    },
  },
  created () {
    let staff = sessionStorage.getItem('workerlist')
    if (!staff) {
      this.getworkerlist()
    } else {
      this.workerlist = JSON.parse(staff)
    }
  },
  mounted () { },
  watch: {
    member (val) {
      if (val) {
        this.getInfo(val.member_id)
        this.getcicardInfo()
        this.getmembercount()
      } else {
        this.chooslist = []
      }
    },
    discount (val) {
      this.newPrice = (this.chooseItem.price * val).toFixed(2)
    }
  },
  computed: {
    sumprice () {
      let sum = 0
      this.chooslist.forEach(item => {
        sum += Number(item.price) * Number(item.num) * item.discount
      })
      sum = sum.toFixed(2)
      return Number(sum) * 100
    }
  }
}
</script>

<style lang="scss" scoped>
.opennew {
  height: 100%;
  overflow: hidden;
  .van-tabs {
    height: calc(100% - 1.1rem);
    /deep/.van-tabs__content {
      height: calc(100% - 0.88rem);
    }
    /deep/.van-tabs__nav {
      z-index: 2;
    }
    .van-tab__pane,
    .content {
      height: 100%;
    }
    .content {
      margin-top: -1.1rem;
    }
    .content1 {
      height: calc(100% - 1.08rem);
      .list {
        height: 100%;
        overflow: auto;
      }
    }
  }
  .van-overlay {
    z-index: 3;
  }
  .carlist {
    margin-bottom: 1rem;
    padding: 0 0.3rem;
    .item {
      border-bottom: 1px solid #eee;
      padding-bottom: 0.2rem;
      .tit {
        font-weight: 600;
        line-height: 0.6rem;
        font-size: 0.28rem;
        span {
          font-weight: normal;
          margin-left: 0.2rem;
          font-size: 0.24rem;
          color: #999;
        }
      }
      .bom {
        display: flex;
        > span {
          flex: 1;
          font-size: 0.32rem;
          .van-icon {
            margin: 0 0.3rem;
          }
        }
      }
    }
  }
  .van-image {
    margin: 0.1rem;
  }
}
</style>
