<template>
  <div class="goods">
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      background="#fe0043"
    >
      <i
        slot="left"
        class="van-icon van-icon-arrow-left van-nav-bar__arrow"
        @click="$router.go(-1)"
      ></i>
      <template #action>
        <i class="iconfont icontianjia" @click="$router.push({name:'addgoods'})"></i>
      </template>
    </van-search>

    <div class="List">
      <van-tree-select
        :items="items"
        height="100%"
        :main-active-index.sync="active"
        @click-nav="changeActive"
      >
        <template #content>
          <van-card
            :num="v.number"
            :price="v.price"
            :title="v.goods_name"
            :thumb="v.pic|imgUrl"
            v-for="(v,k) in XMlist"
            :key="k"
            @click="chooseItem(v)"
          >
            <template #tags>
              <!-- <van-tag plain type="danger">停用</van-tag> -->
            </template>
          </van-card>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['from'],
  data () {
    return {
      keyword: '',
      active: 0,
      storeid: sessionStorage.getItem('storeid'),
      items: [],
      XMlist: [],
      status: 0
    }
  },
  methods: {
    onSearch () { },
    changeActive () {
      this.items.forEach((v, k) => {
        if (k == this.active) {
          this.getXMlist(v.id)
        }
      })
    },
    chooseItem (data) {
      if (this.from == 'open') {
        this.$emit('add', data)
      } else {
        this.$router.push({ name: 'goodsInfo', query: { id: data.goods_id } })
      }
      // this.$store.commit('setGoods', data);
    },
    // 获取产品分类
    async getCPcate () {
      const res = await this.$axios.get(
        '/api?datatype=get_goodscate&storeid=' + this.storeid
      )
      console.log(res)
      res.data.data.forEach((item) => {
        this.$set(item, 'text', item.title)
      })
      this.items = res.data.data
      this.getXMlist(res.data.data[0].id)
    },
    // 获取XMlist
    async getXMlist (active) {
      const res = await this.$axios.get('/api?datatype=get_skulist', {
        params: {
          storeid: this.storeid,
          status: this.status,
          type: 1,
          cate: active,
          search: this.keyword,
        },
      })
      console.log(res)
      if (res.data.data) {
        this.XMlist = res.data.data
      } else {
        if (this.showSearch) {
          this.$message.error('未搜索到该分类下项目或产品')
          this.keyword = ''
        }
        this.XMlist = []
      }
    },
  },
  created () {
    if (this.from == 'open') {
      this.status = 1
    }
    this.getCPcate()
  },
  mounted () { },
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
.goods {
  height: 100%;
  .van-search {
    padding-left: 0;
    i {
      padding: 0 0.3rem;
      font-size: 0.36rem;
      color: #fff;
    }
  }
  .List {
    height: calc(100% - 1.1rem);
  }
  /deep/.van-search__action {
    background-color: #fe0043;
  }
}
</style>
