<template>
  <div class="member">
    <button @click="open">开始</button>
    <van-calendar v-model="show"
                  type="range"
                  confirm-text="完成"
                  confirm-disabled-text="请选择结束时间" />
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      show: false,
    }
  },
  methods: {
    open() {
      this.show = !this.show
    },
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
</style>
