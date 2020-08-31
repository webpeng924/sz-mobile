<template>
  <div class="member">
    <div class="member_search">
      <van-search
        v-model="keyword"
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
        @input="getList"
      />
      <!-- <i class="iconfont iconsaomiao saomiao"></i> -->
    </div>
    <div class="member_total">共{{memberlist.length}}位会员，总余额：{{totalmoney}}元</div>
    <div class="member_list_case">
      <div class="member_list p10" v-for="(v,k) in memberlist" :key="k" @click="getOneMember(v)">
        <div class="list_left">
          <img :src="v.img|imgUrl" alt />
        </div>
        <div class="list_middle">
          <div class="list_middle_item">
            <div class="list_name">姓名：{{v.name}}</div>
            <div class="list_time">{{v.cardtype}}</div>
          </div>
          <div class="list_middle_item">
            <div class="list_integral">
              手机号:
              <span>{{v.mobile}}</span>
            </div>
            <div class="list_balance">
              <span>¥ {{v.balance}}</span>
            </div>
          </div>
        </div>
        <div class="list_right">
          <i class="iconfont iconfanhui-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['from'],
  data () {
    return {
      keyword: '',
      storeid: sessionStorage.getItem('storeid'),
      keyword: '',
      totalmoney: '',
      memberlist: []
    }
  },
  methods: {
    async getList () {
      const res = await this.$axios.get('/api?datatype=get_memberlist', {
        params: {
          storeid: this.storeid,
          search: this.keyword
        }
      })
      console.log(res)
      if (res.data.code == 1 && res.data.data != null) {
        this.memberlist = res.data.data
        let num = 0
        this.memberlist.forEach(item => {
          num += Number(item.balance)
        })
        this.totalmoney = num.toFixed(2)
      } else {
        this.memberlist = []
      }
    },
    getOneMember (v) {
      if (this.from == 'open') {
        this.$emit('add', v)
      } else {
        this.$router.push({ name: 'memberinfo', params: { id: v.member_id } })
      }
    }
  },
  created () {
    this.getList()
  },
  mounted () { },
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.css';
.member {
  height: 100%;
  font-size: 0.28rem /* 14/50 */;
  .member_search {
    position: relative;
    .saomiao {
      color: #8ba8e7;
      font-size: 0.4rem /* 20/50 */;
      position: absolute;
      top: 12px;
      right: 25px;
    }
  }
  .member_total {
    background-color: #f5f6fa;
    font-size: 0.28rem /* 14/50 */;
    height: 0.82rem;
    line-height: 0.82rem;
    padding-left: 0.3rem;
  }
  .member_list_case {
    height: calc(100% - 1.9rem);
    overflow: auto;
    .member_list {
      display: flex;
      height: 60px;
      align-items: center;
      border-bottom: 1px solid #eee;
      .list_left {
        width: 70px;
        height: 60px;
        text-align: center;
        margin-right: 0.1rem /* 5/50 */;
        img {
          max-width: 100%;
          height: 100%;
        }
      }
      .list_middle {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list_middle_item {
          display: flex;
          justify-content: space-between;
          .list_name {
            font-weight: 700;
          }
        }
      }
      .list_right {
        margin-left: 0.1rem /* 5/50 */;
        i {
          font-size: 0.34rem;
          padding-left: 0.1rem;
          color: #ccc;
        }
      }
    }
  }
}
</style>
