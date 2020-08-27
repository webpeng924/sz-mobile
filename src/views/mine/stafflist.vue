<template>
  <div class="stafflist">
    <van-nav-bar title="员工列表" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <i class="iconfont icontianjia" @click="$router.push({name:'addstaff'})"></i>
      </template>
    </van-nav-bar>
    <div class="search">
      <van-search v-model="value" placeholder="搜索员工编号/姓名" background="#f0f0f0" show-action>
        <template #action>
          <div @click="getlist">搜索</div>
        </template>
      </van-search>
      <!-- <i class="iconfont iconsaomiao saomiao"></i> -->
    </div>
    <div class="list">
      <van-cell title="单元格" :label="v.mobile" v-for="(v,k) in workerlist" :key="k">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <van-icon name="manager-o" class="manager-o" size="30" />
        </template>
        <template #title>
          <span class="ss s1">{{v.name}}</span>
          <span class="ss">{{v.job_no}}</span>
        </template>
        <template #right-icon>
          <span class="arrow" style="color:#1989fa;font-size:0.3rem">{{v.job}}</span>
          <van-icon name="arrow" class="arrow" />
        </template>
      </van-cell>
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
      storeid: sessionStorage.getItem('storeid'),
      workerlist: []
    }
  },
  methods: {
    async getlist () {
      if (this.value) {
        this.search()
      } else {
        const res = await this.$axios.get('/api?datatype=get_staff_list', {
          params: {
            storeid: this.storeid,
            is_li: 0,
            is_wei: 1
          }
        })
        if (res.data.code == 1) {
          this.workerlist = res.data.data
        }
      }
    },
    async search () {
      const res = await this.$axios.get('/api?datatype=search_staff_list', {
        params: {
          storeid: this.storeid,
          search: this.value
        }
      })
      if (res.data.code == 1) {
        this.workerlist = res.data.data
      }
    }
  },
  created () {
    this.getlist()
  },
  mounted () { },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.stafflist {
  .search {
    position: relative;
    .saomiao {
      color: #8ba8e7;
      font-size: 0.4rem /* 20/50 */;
      position: absolute;
      top: 12px;
      right: 25px;
    }
  }
  .van-search__content {
    background-color: #fff;
  }
  .manager-o {
    width: 0.8rem;
    height: 0.8rem;
    margin: 0.1rem 0.2rem 0.1rem 0;
    color: #fff;
    text-align: center;
    line-height: 0.8rem;
    border-radius: 0.1rem;
    background-color: #b7caf3;
  }
  .arrow {
    line-height: 1rem;
    color: #999;
    margin-left: 0.2rem;
  }
  .ss {
    margin-right: 0.2rem;
    color: #999;
  }
  .s1 {
    color: #000;
    font-size: 0.32rem;
  }
}
</style>
