<template>
  <div class="goods">
    <van-search v-model="keyword"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                background="#fe0043">
      <i slot="left"
         class="iconfont iconfanhui-left"></i>
      <template #action>
        <i class="iconfont icontianjia"></i>
      </template>
    </van-search>

    <div class="List">
      <van-tree-select :items="items"
                       height="100%"
                       :main-active-index.sync="active"
                       @click-nav="changeActive">
        <template #content>
          <van-card num="2"
                    price="2.00"
                    title="商品标题"
                    :thumb="v.img|imgUrl"
                    v-for="(v,k) in XMlist"
                    :key="k" />
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      keyword: '',
      active: 0,
      storeid: sessionStorage.getItem('storeid'),
      items: [{ text: '分组 1' }, { text: '分组 2' }],
      XMlist: [],
    }
  },
  methods: {
    onSearch() {},
    changeActive() {
      this.items.forEach((v, k) => {
        if (k == this.active) {
          this.getXMlist(v.id)
        }
      })
    },
    // 获取产品分类
    async getCPcate() {
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
    async getXMlist(active) {
      const res = await this.$axios.get('/api?datatype=get_skulist', {
        params: {
          storeid: this.storeid,
          status: 1,
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
  created() {
    this.getCPcate()
  },
  mounted() {},
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
.goods {
  .van-search {
    padding-left: 0;
    i {
      padding: 0 0.2rem;
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
