<template>
  <div class="login">
    <div class="logo">
      <van-image round
                 width="1.32rem"
                 height="1.32rem"
                 src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <div class="title">
      <p>善真科技收银系统</p>
      <p class>
        <span>会员</span>
        <span>收银</span>
        <span>库存</span>
        <span>营销</span>
      </p>
    </div>
    <div class="login_info">
      <div class="username">
        <i class="iconfont iconshouji"></i>
        <input type="text"
               placeholder="请输入用户名"
               v-model="name" />
      </div>
      <div class="password">
        <i class="iconfont iconsuo"></i>
        <input type="password"
               placeholder="请输入密码"
               v-model="password" />
      </div>
      <van-button round
                  type="info"
                  block
                  @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      password: '',
      name: '',
    }
  },
  methods: {
    async login() {
      if (!this.name) return this.$message.error('请输入账号')
      if (!this.password) return this.$message.error('请输入密码')
      let params = {
        username: this.name,
        password: this.password,
      }
      // try {
      const res = await this.$axios.get('/api?datatype=login', { params })
      console.log(res)
      if (res.data.code == 1) {
        this.$toast(res.data.msg)
        sessionStorage.setItem('storeid', res.data.data.storeid)
        this.$store.commit('setJson', res.data.data)
        sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
        this.$router.push({ name: 'Home' })
      } else {
        this.$toast(res.data.msg)
      }
      // }
      // catch (err) {
      //   alert('登录出错')
      // },
    },
    logout() {
      this.$axios.get('/api?datatype=logout&id=7')
    },
  },
  created() {
    // this.logout()
  },
  mounted() {},
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
.login {
  padding: 2rem 1.2rem 0;
  .title {
    font-size: 0.36rem;
    margin: 0.3rem 0 0.9rem;
    span {
      font-size: 0.28rem;
      padding: 0.15rem;
    }
  }
  .login_info {
    > div {
      width: 5rem;
      height: 0.86rem;
      border: 1px solid #bbb;
      border-radius: 0.43rem;
      margin: 0 auto 0.72rem;
      vertical-align: middle;
      position: relative;
      i {
        position: absolute;
        top: 0.12rem;
        left: 0.4rem;
        font-size: 0.45rem;
      }
      input {
        width: 80%;
        height: 100%;
        padding-left: 0.6rem;
      }
    }
    .van-button {
      font-size: 0.36rem;
    }
  }
}
</style>
