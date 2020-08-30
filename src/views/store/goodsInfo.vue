<template>
  <div class="goodsInfo">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="edit" size="18" @click="$router.push({name:'addgoods',query:{id:id}})" />
      </template>
    </van-nav-bar>
    <div class="list">
      <div class="topTit">
        <van-image
          width="1rem"
          height="1rem"
          fit="cover"
          :src="goodsinfo.pic|imgUrl"
          style="position: absolute;left: 0.16rem;top: 0.16rem;"
        />
        <van-cell
          :title="goodsinfo.goods_name"
          :value="'￥'+goodsinfo.price"
          :label="'编号：'+goodsinfo.goods_no"
          title-class="one-txt-cut"
        />
      </div>
      <div class="group">
        <van-cell title="产品分类" :value="goodsinfo.title" />
        <van-cell title="当前库存" :value="goodsinfo.number" />
        <van-cell title="标准单位" :value="goodsinfo.goods_unit" />
        <van-cell title="采购价格" :value="goodsinfo.in_cost" />
        <van-cell title="规格描述" :value="goodsinfo.goods_spec_format" />
      </div>
      <div class="group">
        <van-cell title="供应商" :value="goodsinfo.supplier_id" />
        <van-cell title="是否停用">
          <van-switch v-model="is_stop" size="20" active-color="#fe0043" disabled />
        </van-cell>
        <van-cell title="停止销售">
          <van-switch v-model="state" size="20" active-color="#fe0043" disabled />
        </van-cell>
        <!-- <van-cell title="备注" :value="goodsinfo.remark" /> -->
        <van-field
          v-model="goodsinfo.remark"
          rows="1"
          autosize
          label="备注"
          type="textarea"
          readonly
        />
      </div>
      <div class="group btn">
        <div class="ite">
          <i class="iconfont iconruku"></i>
          <p>入库</p>
        </div>
        <div class="ite">
          <i class="iconfont iconchuku" style="background-color:#ff976a"></i>
          <p>出库</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      goodsinfo: '',
      storeid: sessionStorage.getItem('storeid'),
      id: this.$route.query.id,
      is_stop: false,
      state: false
    }
  },
  methods: {
    async getInfo () {
      const res = await this.$axios.get('/api?datatype=get_goodsinfo_byid', {
        params: {
          storeid: this.storeid,
          id: this.id
        }
      })
      console.log(res)
      if (res.data.code == 1 && res.data.data) {
        this.goodsinfo = res.data.data
        this.is_stop = res.data.data.is_stop == 1 ? true : false
        this.state = res.data.data.state == 1 ? true : false
      } else {
        this.goodsinfo = ''
      }
    }
  },
  created () {
    if (!this.id) return this.$router.go(-1)
    this.getInfo()
  },
  mounted () {
  },
  watch: {},
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.goodsInfo {
  background-color: #f1f1f1;
  height: 100%;
  .list {
    height: calc(100% - 1.1rem);
    overflow: auto;
  }
  .topTit {
    background-color: #fff;
    margin-bottom: 0.2rem;
    position: relative;
    height: 1.32rem;
    padding-left: 1.32rem;
  }
  .group {
    background-color: #fff;
    margin-bottom: 0.2rem;
  }
  .btn {
    display: flex;
    justify-content: space-around;
    .ite {
      width: 1rem;
      text-align: center;
      padding-top: 0.3rem;
    }
    i {
      font-size: 0.6rem;
      background-color: #07c160;
      color: #fff;
      padding: 0.15rem;
      border-radius: 0.2rem;
    }
    p {
      line-height: 0.6rem;
      font-size: 0.28rem;
    }
  }
}
</style>
