<template>
  <div class="my-page">
    <my-header
      type="my"
      :walletInfo="walletInfo"
      :userInfo="userInfo"
    ></my-header>
    <van-notice-bar
      v-if="userInfo.first_query == 0"
      :text="'您还没有完成首次查询，完成后奖励' + userInfo.reg_award + '元'"
    />
    <div class="my-centent">
      <div class="my-money-centent">
        <div class="my-money-box">
          <div class="my-money-flex">
            <div class="money-name">账户余额</div>
            <div class="money">¥{{ walletInfo.money | money }}</div>
          </div>
          <div class="my-money-flex">
            <div class="money-name">待入账余额</div>
            <div class="money">¥{{ walletInfo.unsettled | money }}</div>
          </div>
        </div>
        <div class="a-box">
          <div class="a-flex" @click="goUrl('/income-list')">查看明细</div>
          <div class="a-flex" @click="goUrl('/my-wallet')">申请提现</div>
        </div>
      </div>

      <div class="nav-box">
        <div class="nav-flex">
          <router-link to="/my-order">
            <div class="nav-icon">
              <img src="../../assets/image/icon-order.png" alt="" />
            </div>
            <div class="nav-title">我的订单</div>
          </router-link>
        </div>
        <div class="nav-flex" @click="openQrcode">
          <div class="nav-icon">
            <img src="../../assets/image/icon-yao-f.png" alt="" />
          </div>
          <div class="nav-title">邀请好友</div>
        </div>
        <div class="nav-flex">
          <router-link to="/my-team-list">
            <div class="nav-icon">
              <img src="../../assets/image/icon-my-f.png" alt="" />
            </div>
            <div class="nav-title">我的粉丝</div>
          </router-link>
        </div>
        <div class="nav-flex">
          <router-link to="/my-other-order">
            <div class="nav-icon">
              <img src="../../assets/image/icon-other-order.png" alt="" />
            </div>
            <div class="nav-title">粉丝订单</div>
          </router-link>
        </div>
      </div>
    </div>

    <canvas-img ref="canvasImg"></canvas-img>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { State } from "vuex-class";
import { getUserInfo, getWalletInfo } from "@/api/index";
import canvasImg from "./canvas-img.vue";
import { Toast, NoticeBar } from "vant";
import myHeader from "./my-header.vue";
@Component({
  components: {
    "canvas-img": canvasImg,
    "my-header": myHeader,
    [NoticeBar.name]: NoticeBar
  }
})
export default class MyPage extends Vue {
  @State("app") app!: objAny;
  private inviteFriends = false;
  private userInfo: objAny = {};
  private walletInfo: objAny = {};
  async getUserInfo() {
    const ret = await getUserInfo({});
    if (ret.code == 0) {
      this.userInfo = ret.data;
    } else {
      Toast(ret.msg);
    }
  }
  goUrl(url: string) {
    this.$router.push(url);
  }
  openQrcode() {
    const canvasImg: objAny = this.$refs.canvasImg;
    canvasImg.open(this.userInfo);
  }
  async getWalletInfo() {
    const ret = await getWalletInfo({});
    if (ret.code == 0) {
      this.walletInfo = ret.data;
    } else {
      Toast(ret.msg);
    }
  }
  mounted() {
    this.getUserInfo();
    this.getWalletInfo();
  }
}
</script>
<style lang="less">
.my-page {
  .my-centent {
    padding: 0.15rem;
    .my-money-centent {
      background-color: #fff;
      border-radius: 0.1rem;
      font-size: 0.32rem;
      .my-money-box {
        display: flex;
        text-align: center;
        .my-money-flex {
          a {
            color: #333;
          }
          padding: 0.4rem 0;

          flex: 1;
          .money {
            margin-top: 0.2rem;
          }
        }
      }
      .a-box {
        font-size: 0.28rem;
        display: flex;
        line-height: 0.8rem;
        border: 1px solid #f5f5f5;
        text-align: center;
        .a-flex {
          flex: 1;
          border-right: 1px solid #f5f5f5;
        }
        .a-flex:last-child {
          border: none;
        }
      }
    }
    .nav-box {
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 0.1rem;
      display: flex;
      font-size: 0.32rem;
      .nav-flex {
        flex: 1;
        padding: 0.25rem 0;
        text-align: center;
        a {
          color: #333;
        }
        .nav-icon {
          width: 0.6rem;
          height: 0.6rem;
          margin: auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .nav-title {
          margin-top: 0.1rem;
        }
      }
    }
  }
  // .my-header {
  //   width: 100vw;
  //   height: 20vh;
  //   // background-image: linear-gradient(-30deg,#ff003b,#ff2c1d);
  //   background-image: url("../../assets/image/CenterBg.cfab5d1.png");
  //   background-size: 100% 100%;
  //   box-sizing: border-box;
  //   display: flex;
  //   color: #fff;
  //   padding-top: 6vh;
  //   padding-bottom: 9vw;
  //   .my-head-img {
  //     width: 25%;
  //     display: flex;
  //     // align-items: center;
  //     justify-content: center;
  //     .img-box {
  //       position: relative;
  //       width: 17vw;
  //       height: 17vw;
  //       img {
  //         width: 100%;
  //         height: 100%;
  //         border-radius: 50%;
  //       }
  //       .my-grade {
  //         position: absolute;
  //         width: 16.2vw;
  //         // padding: 0 1vw;
  //         height: 4.8vw;
  //         background: #fff;
  //         bottom: -2vw;
  //         left: 50%;
  //         margin-left: -8.1vw;
  //         border-radius: 2.4vw;
  //         font-size: 3.2vw;
  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //         color: #f9103d;
  //       }
  //     }
  //   }
  //   .my-flex {
  //     flex: 1;
  //     .my-name {
  //       font-size: 4vw;
  //       padding-top: 2vw;
  //     }
  //     .my-id {
  //       margin-top: 3vw;
  //       font-size: 3.5vw;
  //     }
  //   }
  //   .my-center {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     font-size: 3.6vw;
  //     padding-right: 2vw;
  //   }
  // }
  // .my-cell-box {
  //   background-color: #fff;
  //   margin-bottom: 1.5vw;
  //   .cell-item {
  //     width: 100%;
  //     height: 9vh;
  //     align-items: center;
  //     display: flex;
  //     position: relative;
  //     border-bottom: 1px solid #f6f6f6;
  //     .cell-icon {
  //       width: 3.52vh;
  //       height: 3.2vh;
  //       margin-left: 3vh;
  //       margin-right: 3vh;
  //     }
  //     .cell-flex {
  //       font-family: PingFangSC-Regular;
  //       font-size: 4vw;
  //       font-weight: 400;
  //       font-stretch: normal;
  //       letter-spacing: 0;
  //       color: #333;
  //     }
  //     .cell-right {
  //       position: absolute;
  //       width: 1.8vw;
  //       height: 3.4vw;
  //       right: 4vw;
  //     }
  //   }
  //   .cell-item:last-child {
  //     border: none;
  //   }
  // }
  // .invite-friends {
  //   left: 0;
  //   top: 0;
  //   position: fixed;
  //   width: 100%;
  //   height: 100%;
  //   background: rgba(0, 0, 0, 0.7);
  //   z-index: 19960627;
  //   display: flex;
  //   -ms-flex-direction: column;
  //   flex-direction: column;
  //   -ms-flex-pack: center;
  //   justify-content: center;
  //   -ms-flex-align: center;
  //   align-items: center;
  //   .close {
  //     width: 100vw;
  //     height: 100vh;
  //     position: absolute;
  //   }
  //   .invite-friends-centent {
  //     width: 85vw;
  //     height: 88vw;
  //     background: #fff;
  //     border-radius: 1vw;
  //     z-index: 998;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: center;
  //     img {
  //       width: 42vw;
  //       height: 75vw;
  //     }
  //     p {
  //       font-size: 4vw;
  //       color: #ff9000;
  //       width: 42vw;
  //       display: flex;
  //       justify-content: space-between;
  //       align-items: center;
  //       margin-top: 2vw;
  //       img {
  //         width: 3.3vw;
  //         height: 3.5vw;
  //       }
  //     }
  //   }
  // }
}
</style>
