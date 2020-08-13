<template>
  <div class="mine">
    <div class="mine_header p10">
      <div class="mine_title">
        <span class="mine_title_name">mm门店</span>
        <i class="iconfont iconxiangxia"></i>
      </div>
      <div class="mine_tags p10">
        <div class="mine_tags_item">
          <div class="mine_tags_icon iconfont iconyuangong clerk"></div>
          <div class="mine_tags_name mtb10">店员管理</div>
        </div>
        <div class="mine_tags_item">
          <div class="mine_tags_icon iconfont iconmendianxinxi store"></div>
          <div class="mine_tags_name mtb10">门店信息</div>
        </div>
        <div class="mine_tags_item">
          <div class="mine_tags_icon iconfont iconfenzu await"></div>
          <div class="mine_tags_name mtb10 await_font">敬请期待</div>
        </div>
      </div>
      <div class="mine_info_case p10">
        <div class="iconfont icongerenxin mr5"></div>
        <div class="mine_info">
          <div class="info_name_case">
            <span class="info_name mr5">李易峰</span>
            <div class="info_office">
              <i class="iconfont iconhuangguan"></i>
              <span>店长</span>
            </div>
          </div>
          <div class="info-telephone">1566663333</div>
        </div>
        <div class="mine_info_avatar">李</div>
        <i class="right iconfont iconfanhui-right"></i>
      </div>
    </div>
    <div class="mine_content p10">
      <div :class="{active:checkIndex ===index}"
           class="mine_content_item "
           v-for="(item,index) in options"
           :key="index"
           @touchstart='checkOn(index)'
           @touchend='checkOut'
           @click="go">
        <div :class="item.iconClass"
             class="content_icon">
          <i :class="item.icon"
             class="iconfont"></i>
        </div>
        <div class="content_case p10">
          <div class="content_text">
            {{item.text}}
          </div>
          <div class="iconfont iconfanhui-right content_right"></div>
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
      checkIndex: '',
      options: [
        {
          text: '帮助文档',
          icon: 'iconbangzhuwendang',
          iconClass: 'help',
        },
        {
          text: '意见反馈',
          icon: 'iconyijianfankui',
          iconClass: 'opinion',
        },
        {
          text: '专属客服',
          icon: 'iconkefu',
          iconClass: 'contact',
        },
        {
          text: '设置',
          icon: 'iconshezhi',
          iconClass: 'set',
        },
        {
          text: '关于我们',
          icon: 'iconguanyuwomen',
          iconClass: 'about',
        },
        {
          text: '退出登录',
          icon: 'icontuichudenglu',
          iconClass: 'sign_out',
        },
      ],
    }
  },
  methods: {
    // hover效果
    checkOn(index) {
      this.checkIndex = index
    },
    checkOut() {
      this.checkIndex = ''
    },
    go(){
      console.log(1);
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.css';
.mine {
  font-size: .32rem /* 16/50 */;
  .mine_header {
    height: 4.66rem;
    border-bottom: 1px solid #f3f3f3;
    .mine_title {
      // text-align: left;
      .mine_title_name {
        font-weight: 700;
      }
      .iconxiangxia {
        color: #b5b5b7;
      }
    }
    .mine_tags {
      display: flex;
      justify-content: space-between;
      text-align: center;
      .mine_tags_item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .mine_tags_icon {
          width: 1rem /* 50/50 */;
          height: 1rem /* 50/50 */;
          line-height: 1rem;
          border-radius: 45%;
          color: #fff;
          font-size: 0.5rem /* 50/50 */;
        }
        .clerk {
          background-color: #fc6652;
        }
        .store {
          background-color: #976af6;
        }
        .await {
          background-color: #dcdddf;
        }
        .await_font {
          color: #dcdddf;
        }
      
      }
    }
    .mine_info_case {
      display: flex;
      align-items: center;
      .icongerenxin {
        font-size: 0.5rem;
        color: #c7c9d0;
      }
      .mine_info {
        flex: 1;
        .info_name_case {
          display: flex;
          align-items: center;
          .info_name {
            font-weight: 700;
          }
          .info_office {
            padding: 0.04rem 0.12rem;
            color: #fff;
            border-radius: 10px;
            background-color: #dfb270;
            .iconhuangguan1 {
              vertical-align: middle;
              margin-right: 0.1rem;
            }
          }
        }
        .info-telephone {
          // text-align: left;
          margin-top: 0.06rem;
          font-size: .28rem /* 14/50 */;
        }
      }
      .mine_info_avatar {
        color: #fff;
        line-height: 0.8rem;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: #f9be83;
        font-size: 0.5rem;
        text-align: center;
      }
      .right {
        margin-left: 0.1rem;
        color: #cfcfd2;
      }
    }
  }
  .mine_content {
    .mine_content_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .content_icon {
        width: 0.6rem /* 30/50 */;
        height: 0.6rem /* 30/50 */;
        line-height: 0.6rem;
        border-radius: 50%;
        margin-right: 0.1rem /* 5/50 */;
        text-align: center;
        .iconfont {
          font-size: 0.4rem /* 20/50 */;
        }
      }

      .content_case {
        flex: 1;
        display: flex;
        border-bottom: 1px solid #bbb;
        .content_text {
          flex: 1;
          // text-align: left;
        }
        .content_right {
          color: #cfcfd2;
        }
      }
    }
    .active {
      background-color: #f3f3f3;
      border-radius: 5px;
    }
    .help {
      color: #7393f2;
    }
    .opinion {
      color: #f79f41;
    }
    .contact {
      background-color: #d7f2ff;
      color: #2793ed;
    }
    .set {
      background-color: #fddaea;
      color: #e85881;
    }
    .about {
      color: #8da1f2;
    }
    .sign_out {
      color: #8baaf2;
    }
  }
}
</style>
