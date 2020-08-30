<template>
  <div class="opennew">
    <van-nav-bar title="开单" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs v-model="active" @click="onClick">
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
      <van-tab title="选择会员" name="3">
        <div class="content1">
          <member :from="'open'" @add="addmember"></member>
        </div>
      </van-tab>
      <van-tab title="选择次卡" name="4">
        <div class="content"></div>
      </van-tab>
    </van-tabs>
    <van-submit-bar :price="3050" button-text="结算" @submit="onSubmit" v-show="chooselist.length">
      <van-icon name="shopping-cart-o" size="30" :badge="chooselist.length" @click="show=!show" />
    </van-submit-bar>
    <van-submit-bar button-text="结算" v-show="!chooselist.length" disabled>
      <van-icon name="shopping-cart-o" size="30" @click="show=!show" />
      <p style="width:60%;padding:0.3rem;color:#ccc;font-size:0.32rem">请添加商品</p>
    </van-submit-bar>
    <!-- 购物车 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-action-sheet v-model="show" title="已选商品" :overlay="false">
          <div class="carlist">
            <div class="item" v-for="(v,k) in chooselist" :key="k">
              <div class="tit">
                {{v.itemname}}
                <span v-show="v.staff1">{{v.worker.name}}(No.{{v.worker.job_no}})</span>
              </div>
              <div class="bom">
                <span>
                  <span class="mainRed">￥{{v.subtotal}}</span>
                  <van-icon name="edit" />
                </span>
                <van-stepper :v-model="v.num" theme="round" button-size="22" disable-input />
              </div>
            </div>
          </div>
        </van-action-sheet>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import goods from '@/views/store/goods'
import items from '@/views/store/items'
import member from '@/views/member'
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
      chooselist: []
    }
  },
  methods: {
    onSubmit () {

    },
    // 切换标签
    onClick (name) {
      if (name == 4) {
        if (!this.member) {
          this.active = 3
          this.$toast('请先选择会员')
        } else {
          this.getcicardInfo()
        }
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
      }
    },
    additem (v) {
      console.log(v)
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
        discount: 1
      }
      this.chooselist.push(obj)
    },
    addgood () {

    },
    addmember (v) {
      console.log(v)
      this.member = v
    }
  },
  created () { },
  mounted () { },
  watch: {},
  computed: {}
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
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
