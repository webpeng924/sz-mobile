<template>
  <div class="user_detail">
    <div class="user_detail_header">
      <div class="user_detail_info">
        <div class="user_left">
          <label class="avator">
            <img src=""
                 alt=""
                 :onerror="`this.src='https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg'`">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default: {},
    }
  },
}
</script>
<style lang='scss' scoped>
.user_detail {
  .user_detail_header {
    padding: 0.1rem /* 5/50 */;
    .user_detail_info {
      padding: .1rem /* 5/50 */;
      background-color: #f99;
      height: 100px;
      border-radius: 8px;
      .user_left {
        .avator{
          width: 1.2rem /* 60/50 */;
          height: 1.2rem /* 60/50 */;
          overflow: hidden;
          display: inline-block;
          border-radius: 10px;
          img{
           width: 100%;
           height: auto;
          }
        }
      }
    }
  }
}
</style>