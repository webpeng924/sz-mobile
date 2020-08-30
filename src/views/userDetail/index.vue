<template>
  <div class="user_detail">
    <div class="user_detail_header">
      <div class="user_detail_info">
        <div class="user_left">
          <label class="avator">
            <img
              src=""
              alt=""
              :onerror="
                `this.src='https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg'`
              "
            />
          </label>
        </div>
        <div class="user_right">
          <div class="user_one">
            <span class="name">啊哈哈嘻嘻啊</span>
            <span class="call">先生</span>
          </div>
          <div class="user_two">
            <span class="tel">156****1211</span>
            <span class="num">消费:0次</span>
          </div>
        </div>
      </div>
      <div class="user_num">
        <div class="user_num_item">
          <span class="title">积分</span>
          <span class="price">0</span>
        </div>
        <div class="user_num_item">
          <span class="title">余额(￥)</span>
          <span class="price">0</span>
        </div>
        <div class="user_num_item">
          <span class="title">优惠券</span>
          <span class="price">0</span>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="user_detail_nav">
      <div class="nav-item">
        <van-icon name="coupon-o" />
        <span class="msg">品项信息</span>
      </div>
      <div class="nav-item">
        <van-icon name="balance-list-o" />
        <span class="msg">套餐信息</span>
      </div>
      <div class="nav-item">
        <van-icon name="vip-card-o" />
        <span class="msg">抵用券信息</span>
      </div>
      <div class="nav-item">
        <van-icon name="desktop-o" />
        <span class="msg">充值信息</span>
      </div>
      <div class="nav-item">
        <van-icon name="balance-pay" />
        <span class="msg">消费信息</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="user_cell">
      <div class="user_cell_item">
        <div class="cell_item_left">卡号</div>
        <div class="cell_right">大大大大</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">姓名</div>
        <div class="cell_right">大叔大婶</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">手机</div>
        <div class="cell_right">大叔大婶</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">性别</div>
        <div class="cell_right">
          <label
            ><input type="radio" name="sex" v-model="sex" value="1" />男</label
          >
          <label
            ><input type="radio" name="sex" v-model="sex" value="2" />女</label
          >
        </div>
      </div>
      <div class="line"></div>
      <div class="user_cell_item">
        <div class="cell_item_left">账户余额</div>
        <div class="cell_right">1231231</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">消费次数</div>
        <div class="cell_right">3</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">最后消费日期</div>
        <div class="cell_right">2020年08月08</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">开卡日期</div>
        <div class="cell_right">2020年06月06</div>
      </div>
      <div class="line"></div>
      <div class="user_cell_item">
        <div class="cell_item_left">生日</div>
        <div class="cell_right">2020年06月06</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">身份证号</div>
        <div class="cell_right">2302288888888888888</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default: {},
      sex: "男"
    };
  }
};
</script>
<style lang="scss" scoped>
.user_detail {
  .line::after {
    content: "";
    display: block;
    height: 10px;
    width: 100%;
    background-color: #ddd;
  }
  .user_detail_header {
    padding: 0.1rem /* 5/50 */;
    .user_detail_info {
      padding: 0.2rem /* 10/50 */;
      background-color: #f99;
      height: 100px;
      border-radius: 8px;
      display: flex;
      .user_left {
        margin-right: 0.2rem /* 10/50 */;
        .avator {
          width: 1.2rem /* 60/50 */;
          height: 1.2rem /* 60/50 */;
          overflow: hidden;
          display: inline-block;
          border-radius: 10px;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
      .user_right {
        flex: 1;
        color: #fff;

        .user_one {
          margin-bottom: 8px;
          .name {
            font-size: 16px;
          }
          .call {
            font-size: 14px;
          }
        }

        .user_two {
          display: flex;
          justify-content: space-between;
          .num {
            font-size: 14px;
          }
        }
      }
    }
    .user_num {
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      .user_num_item {
        width: 33.33%;
        border-right: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          font-size: 16px;
        }
        .price {
          padding-top: 5px;
          color: red;
          font-size: 14px;
        }
      }
      .user_num_item:nth-of-type(3) {
        border: none;
      }
    }
  }
  .user_detail_nav {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .nav-item {
      /deep/.van-icon {
        font-size: 20px;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .user_cell {
    font-size: 12px;
    .user_cell_item {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .cell_right {
        label {
          margin-right: 10px;
          input {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
