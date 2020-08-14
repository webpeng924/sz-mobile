<template>
  <div class="goodsInfo">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="edit" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  methods: {},
  created () {
    if (!this.info) return this.$router.go(-1)
  },
  mounted () { },
  watch: {},
  computed: {
    info () {
      return this.$store.state.nowGoods
    }
  }
}
</script>

<style lang="scss" scoped>
.goodsInfo {
}
</style>
