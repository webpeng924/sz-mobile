<template>
  <div class="user_detail">
    <van-nav-bar title="会员详情" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="user_detail_header">
      <div class="user_detail_info">
        <van-button type="danger" plain size="small" @click="showEdit=true">充值</van-button>
        <div class="user_left">
          <label class="avator">
            <img
              :src="userinfo.avatar"
              alt
              :onerror="
                `this.src='https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg'`
              "
            />
          </label>
        </div>
        <div class="user_right">
          <div class="user_one">
            <span class="name">{{userinfo.name}}</span>
            <!-- <span class="call">先生</span> -->
          </div>
          <div class="user_two">
            <span class="tel">{{userinfo.mobile}}</span>
            <span class="num">消费:{{userinfo.instore_count}}次</span>
          </div>
        </div>
      </div>
      <div class="user_num">
        <div class="user_num_item">
          <span class="title">储值账户</span>
          <span class="price">{{ userinfo.balance-userinfo.gift_money }}</span>
        </div>
        <div class="user_num_item">
          <span class="title">赠送账户</span>
          <span
            class="price"
          >{{ userinfo.balance-userinfo.gift_money>0?userinfo.gift_money?userinfo.gift_money:0:userinfo.balance }}</span>
        </div>
        <div class="user_num_item">
          <span class="title">欠款账户</span>
          <span class="price">{{ userinfo.signbill }}</span>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- <div class="user_detail_nav">
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
    <div class="line"></div>-->
    <div class="user_cell">
      <div class="user_cell_item">
        <div class="cell_item_left">卡号</div>
        <div class="cell_right">{{userinfo.account}}</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">姓名</div>
        <div class="cell_right">{{userinfo.name}}</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">手机</div>
        <div class="cell_right">{{userinfo.mobile}}</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">性别</div>
        <div class="cell_right">{{userinfo.sex==1?'男':'女'}}</div>
      </div>
      <div class="line"></div>
      <div class="user_cell_item">
        <div class="cell_item_left">账户余额</div>
        <div class="cell_right">{{ userinfo.balance-userinfo.gift_money }}</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">消费次数</div>
        <div class="cell_right">{{userinfo.instore_count}}</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">最后消费日期</div>
        <div class="cell_right">{{userinfo.last_time}}</div>
      </div>
      <!-- <div class="user_cell_item">
        <div class="cell_item_left">开卡日期</div>
        <div class="cell_right">2020年06月06</div>
      </div>-->
      <div class="line"></div>
      <div class="user_cell_item">
        <div class="cell_item_left">生日</div>
        <div class="cell_right">{{userinfo.birthday}}</div>
      </div>
      <div class="user_cell_item">
        <div class="cell_item_left">身份证号</div>
        <div class="cell_right">{{userinfo.IDcard}}</div>
      </div>
    </div>
    <van-dialog show-cancel-button v-model="showEdit" title="会员充值" @confirm="addmoney">
      <van-field v-model="money" label="充值金额" placeholder="请输入" />
      <van-field v-model="gift_money" label="赠送金额" placeholder="请输入" />
      <van-field v-model="total" label="合计" readonly />
    </van-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      userinfo: '',
      showEdit: false,
      storeid: sessionStorage.getItem('storeid'),
      money: '',
      gift_money: '',
    };
  },
  methods: {
    async getInfo (id) {
      const res = await this.$axios.get("/api?datatype=get_one_member", {
        params: {
          storeid: this.storeid,
          member_id: id
        }
      });
      if (res.data.code == 1) {
        this.userinfo = res.data.data;
        if (this.userinfo.last_time != null) {
          this.userinfo.last_time = moment
            .unix(this.userinfo.last_time)
            .format("YYYY-MM-DD");
        }
        if (Number(this.userinfo.signbill) > 0) {
          this.$dialog.alert({
            message: '该会员欠款：' + this.userinfo.signbill + ' 元',
          })
        }
      }
    },
    async addmoney () {
      if (this.money == '') return this.$toast('请输入充值金额')
      if (Number(this.money) <= 0) return this.$toast('请输入正确充值金额')
      const res = await this.$axios.get('/api?datatype=recharge', {
        params: {
          storeid: this.storeid,
          member_id: this.member_id,
          money: Number(this.money),
          gift_money: Number(this.gift_money)
        }
      })
      if (res.data.code == 1) {
        this.$toast('充值成功')
        this.showaddMoney = false
        this.getInfo(this.member_id)
      } else {
        this.$toast('充值失败')
      }
    },
  },
  created () {
    let id = this.$route.params.id
    if (id) {
      this.member_id = id
      this.getInfo(id)
    } else {
      this.$router.go(-1)
    }

  },
  computed: {
    total () {
      return Number(this.money) + Number(this.gift_money)
    }
  }
};
</script>
<style lang="scss" scoped>
.user_detail {
  height: 100%;
  .line::after {
    content: '';
    display: block;
    height: 10px;
    width: 100%;
    background-color: #f1f1f1;
  }
  .user_detail_header {
    padding: 0.1rem /* 5/50 */;
    .user_detail_info {
      padding: 0.2rem /* 10/50 */;
      background-color: #f99;
      height: 100px;
      border-radius: 8px;
      display: flex;
      position: relative;
      .van-button {
        position: absolute;
        bottom: 0.2rem;
        left: 50%;
        transform: translateX(-50%);
        width: 2rem;
      }
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
        border-right: 1px solid #eee;
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
      border-bottom: 1px solid #eee;
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
