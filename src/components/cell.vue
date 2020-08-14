<template>
  <div class="cell"
       :class="{active:open}"
       @touchstart='checkOn'
       @touchend='checkOff'>
    <div class="left">
      <slot name="cellLeft"></slot>
    </div>
    <div class="middle">
      <slot name="cellMiddle"></slot>
    </div>
    <div class="right">
      <slot name="cellRight"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    }
  },
  methods: {
    checkOn() {
      this.open = true
    },
    checkOff() {
      this.open = false
    },
  },
}
</script>
<style lang='scss' scoped>
.cell {
  display: flex;
  align-items: center;
  padding: 0.2rem /* 10/50 */ 0;
  border-top: 1px solid #f4f4f4;
  .left {
    width: 33.33%;
    text-align: left;
  }
  .middle {
    width: 33.33%;
    text-align: center;
  }
  .right {
    width: 33.33%;
    text-align: right;
  }
}
.active {
  background-color: #f3f3f3;
}
</style>