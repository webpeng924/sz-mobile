<template>
  <div class="goodsInfo">
    <van-nav-bar title="项目详情" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="edit" size="18" @click="$router.push({name:'additems',query:{id:id}})" />
      </template>
    </van-nav-bar>
    <div class="topTit">
      <van-image
        width="1rem"
        height="1rem"
        fit="cover"
        :src="goodsinfo.img|imgUrl"
        style="position: absolute;left: 0.16rem;top: 0.16rem;"
      />
      <van-cell
        :title="goodsinfo.name"
        :value="'￥'+goodsinfo.price"
        :label="'编号：'+goodsinfo.item_no"
        title-class="one-txt-cut"
      />
    </div>
    <div class="group">
      <van-cell title="项目分类" :value="goodsinfo.title" />
      <van-cell title="归属部门" :value="goodsinfo.belong_job" />
      <van-cell title="是否停用">
        <van-switch v-model="is_stop" size="20" active-color="#fe0043" />
      </van-cell>
      <van-cell title="备注" :value="goodsinfo.remark" />
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
      is_stop: false
    }
  },
  methods: {
    async getInfo () {
      const res = await this.$axios.get('/api?datatype=get_item_byid', {
        params: {
          storeid: this.storeid,
          id: this.id
        }
      })
      console.log(res)
      if (res.data.code == 1 && res.data.data) {
        this.goodsinfo = res.data.data
        this.is_stop = res.data.data.is_stop == 1 ? true : false
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
  }
}
</style>
