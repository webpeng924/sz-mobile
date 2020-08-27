<template>
  <div class="shopInfo">
    <van-nav-bar title="门店信息" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="edit" size="18" @click="edit=true" />
      </template>
    </van-nav-bar>
    <div class="top" v-show="!edit">
      <van-image width="1rem" height="1rem" fit="cover" :src="shopInfo.avatar|imgUrl" />
      <van-cell
        :title="shopInfo.shop_name"
        :label="'门店编号：'+shopInfo.shop_code"
        title-class="one-txt-cut"
      />
    </div>
    <div class="group" v-show="!edit">
      <van-cell title="门店简称" :value="shopInfo.short_name" />
      <van-cell title="门店级别" :value="shopInfo.typename" />
      <van-cell title="连锁代码" :value="shopInfo.chain_code" />
    </div>
    <div class="group" v-show="!edit">
      <van-cell title="门店电话" :value="shopInfo.tel" />
      <van-cell title="详细地址" :value="shopInfo.address" />
      <van-cell title="经营范围" :value="shopInfo.scope" />
    </div>
    <div class="group" v-show="!edit">
      <van-cell title="微信公众号" :value="shopInfo.gzh" />
      <van-cell title="公司网址" :value="shopInfo.email" />
    </div>
    <div class="group" v-show="edit">
      <van-field v-model="shopInfo.shop_name" label="门店全称" placeholder="请输入" required />
      <van-field v-model="shopInfo.short_name" label="门店简称" placeholder="请输入" required />
      <van-field v-model="shopInfo.tel" label="门店电话" placeholder="请输入" required type="tel" />
      <van-field v-model="shopInfo.scope" label="经营范围" placeholder="请输入" required />
      <van-field v-model="shopInfo.gzh" label="微信公众号" placeholder="请输入" />
      <van-field v-model="shopInfo.email" label="公司网址" placeholder="请输入" />
      <van-button
        color="#fe0043"
        block
        @click="submit"
        size="20"
        style="position: fixed;bottom:0"
      >保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      shopInfo: JSON.parse(sessionStorage.getItem('shopInfo')),
      edit: false
    }
  },
  methods: {
    async submit () {
      if (!this.shopInfo.shop_name || !this.shopInfo.short_name || !this.shopInfo.tel || !this.shopInfo.scope) return this.$toast('缺少必填信息')
      const res = await this.$axios.get('/api?datatype=edit_shop', {
        params: {
          storeid: sessionStorage.getItem('storeid'),
          shop_name: this.shopInfo.shop_name,
          short_name: this.shopInfo.short_name,
          tel: this.shopInfo.tel,
          gzh: this.shopInfo.gzh,
          url: this.shopInfo.url,
          scope: this.shopInfo.scope
        }
      })
      if (res.data.code == 1) {
        this.edit = false
        let data = JSON.stringify(this.shopInfo)
        sessionStorage.setItem('shopInfo', data)
        this.$toast.success(res.data.msg)
      }
    }
  },
  created () { },
  mounted () { },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.shopInfo {
  background-color: #f1f1f1;
  .top {
    background-color: #fff;
    text-align: center;
    padding-top: 0.3rem;
    margin-bottom: 0.2rem;
  }
}
</style>
