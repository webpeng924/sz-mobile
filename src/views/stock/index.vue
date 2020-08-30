<template>
  <div class="stock">
    <van-nav-bar
      title="库存"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-search
      v-model="keyword"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      @input="getList"
    />
    <div class="content_case">
      <div class="content_item">
        <div class="content_left">
          <img
            src="https://hb.rgoo.com/upload/shop/159574859714704.png"
            alt=""
          />
        </div>
        <div class="content_right">
          <div class="item_row">
            <span class="item_col">
              产品名称:产品004
            </span>
            <span class="item_col">
              产品规格:瓶
            </span>
          </div>
          <div class="item_row">
            <span class="item_col">
              产品类别:美容
            </span>
            <span class="item_col">
              数量:5
            </span>
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
  data() {
    return {
      keyword: "",
      memberlist: [{}]
    };
  },
  methods: {
    getList() {
      console.log(1);
    }
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.stock {
  background-color: #fbfbfb;
  .content_case {
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
