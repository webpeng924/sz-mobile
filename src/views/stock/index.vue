<template>
  <div class="stock">
    <van-nav-bar title="库存" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-search
      v-model="searchtxt"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      @input="getCPlist"
    />
    <div class="content_case">
      <div class="content_item" v-for="(v,k) in tableData" :key="k">
        <div class="content_left">
          <img :src="v.pic|imgUrl" alt />
        </div>
        <div class="content_right">
          <div class="item_row">
            <span class="item_col">产品名称:{{v.goods_name}}</span>
            <span class="item_col">产品规格:{{v.goods_unit}}</span>
          </div>
          <div class="item_row">
            <span class="item_col">产品类别:{{v.title}}</span>
            <span class="item_col">数量:{{v.number}}</span>
          </div>
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
      item: 1,
      tableData: [],
      add: false,
      dialogVisible: false,
      date: '',
      searchtxt: '',
      storeid: sessionStorage.getItem('storeid'),
    }
  },
  watch: {},
  computed: {},
  methods: {
    back () {
      this.$emit('close')
    },
    async getCPlist () {
      const res = await this.$axios.get('/api?datatype=get_skulist', {
        params: {
          storeid: this.storeid,
          search: this.searchtxt,
          type: 1
        }
      })
      console.log(res)
      if (res.data.code == 1 && res.data.data) {
        this.tableData = res.data.data
      } else {
        this.tableData = []
      }
    },
    formatDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '年' + m + '月' + d + '日'
    },
    openDate () {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.date.focus()
      })
    }
  },
  created () {
    // let a = this.formatDate(new Date())
    // this.date = a
    this.getCPlist()
  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.stock {
  height: 100%;
  background-color: #fbfbfb;
  .content_case {
    height: calc(100% - 2.18rem);
    overflow: auto;
    .content_item {
      background-color: #fff;
      padding: 10px;
      display: flex;
      .content_left {
        margin-right: 0.1rem /* 5/50 */;
        width: 1.4rem /* 70/50 */;
        height: 1.2rem /* 60/50 */;
        img {
          width: 100%;
          height: auto;
        }
      }
      .content_right {
        flex: 1;
        .item_row {
          display: flex;
          justify-content: space-between;

          .item_col {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
