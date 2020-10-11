<template>
  <div class="my-page">
    <div class="my-header">
      <div class="my-head-img">
        <div class="img-box">
          <img src="../../assets/img/help3_an.png" alt="" />
          <router-link to="/my-grade">
            <div class="my-grade">
              青铜
            </div>
          </router-link>
        </div>
      </div>
      <div class="my-flex">
        <div class="my-name">贤哥</div>
        <div class="my-id">ID:15454</div>
      </div>
      <div class="my-center">已累计为您省0.00元</div>
    </div>
    <div class="my-cell-box">
      <router-link to="/my-wallet">
        <div class="cell-item">
          <img src="../../assets/image/icon-1.png" class="cell-icon" alt="" />
          <span class="cell-flex">我的钱包</span>
          <img
            class="cell-right"
            src="../../assets/image/icon-right.png"
            alt=""
          />
        </div>
      </router-link>
      <router-link to="/my-order">
        <div class="cell-item">
          <img src="../../assets/image/icon-2.png" class="cell-icon" alt="" />
          <span class="cell-flex">我的订单</span>
          <img
            class="cell-right"
            src="../../assets/image/icon-right.png"
            alt=""
          />
        </div>
      </router-link>
    </div>
    <div class="my-cell-box">
      <div class="cell-item" @click="inviteFriends = true">
        <img src="../../assets/image/icon-3.png" class="cell-icon" alt="" />
        <span class="cell-flex">邀请好友</span>
        <img
          class="cell-right"
          src="../../assets/image/icon-right.png"
          alt=""
        />
      </div>
      <router-link to="/my-team">
        <div class="cell-item">
          <img src="../../assets/image/icon-4.png" class="cell-icon" alt="" />
          <span class="cell-flex">我的团队</span>
          <img
            class="cell-right"
            src="../../assets/image/icon-right.png"
            alt=""
          />
        </div>
      </router-link>
    </div>
    <div class="my-cell-box">
      <router-link to="/help-center">
        <div class="cell-item">
          <img src="../../assets/image/icon-5.png" class="cell-icon" alt="" />
          <span class="cell-flex">帮助中心</span>
          <img
            class="cell-right"
            src="../../assets/image/icon-right.png"
            alt=""
          />
        </div>
      </router-link>
      <router-link to="/my-about">
        <div class="cell-item">
          <img src="../../assets/image/icon-6.png" class="cell-icon" alt="" />
          <span class="cell-flex">关于我们</span>
          <img
            class="cell-right"
            src="../../assets/image/icon-right.png"
            alt=""
          />
        </div>
      </router-link>
    </div>
    <div class="invite-friends" v-if="inviteFriends">
      <div class="invite-friends-centent">
        <img src="../../assets/image/test.jpg" alt="" />
        <p>
          <img src="../../assets/image/down.png" alt="" /> 长按图片保存到手机
        </p>
      </div>
      <div class="close" @click="inviteFriends = false"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class MyPage extends Vue {
  private inviteFriends = false;
}
</script>
<style lang="less">
.my-page {
  .my-header {
    width: 100vw;
    height: 20vh;
    // background-image: linear-gradient(-30deg,#ff003b,#ff2c1d);
    background-image: url("../../assets/image/CenterBg.cfab5d1.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    display: flex;
    color: #fff;
    padding-top: 6vh;
    padding-bottom: 9vw;
    .my-head-img {
      width: 25%;
      display: flex;
      // align-items: center;
      justify-content: center;
      .img-box {
        position: relative;
        width: 17vw;
        height: 17vw;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .my-grade {
          position: absolute;
          width: 12.2vw;
          height: 4.8vw;
          background: #fff;
          bottom: -2vw;
          left: 50%;
          margin-left: -6.1vw;
          border-radius: 2.4vw;
          font-size: 3.2vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f9103d;
        }
      }
    }
    .my-flex {
      flex: 1;
      .my-name {
        font-size: 4vw;
        padding-top: 2vw;
      }
      .my-id {
        margin-top: 3vw;
        font-size: 3.5vw;
      }
    }
    .my-center {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3.6vw;
      padding-right: 2vw;
    }
  }
  .my-cell-box {
    background-color: #fff;
    margin-bottom: 1.5vw;
    .cell-item {
      width: 100%;
      height: 9vh;
      align-items: center;
      display: flex;
      position: relative;
      border-bottom: 1px solid #f6f6f6;
      .cell-icon {
        width: 3.52vh;
        height: 3.2vh;
        margin-left: 3vh;
        margin-right: 3vh;
      }
      .cell-flex {
        font-family: PingFangSC-Regular;
        font-size: 4vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: 0;
        color: #333;
      }
      .cell-right {
        position: absolute;
        width: 1.8vw;
        height: 3.4vw;
        right: 4vw;
      }
    }
    .cell-item:last-child {
      border: none;
    }
  }
  .invite-friends {
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 19960627;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    .close {
      width: 100vw;
      height: 100vh;
      position: absolute;
    }
    .invite-friends-centent {
      width: 85vw;
      height: 88vw;
      background: #fff;
      border-radius: 1vw;
      z-index: 998;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 42vw;
        height: 75vw;
      }
      p {
        font-size: 4vw;
        color: #ff9000;
        width: 42vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2vw;
        img {
          width: 3.3vw;
          height: 3.5vw;
        }
      }
    }
  }
}
</style>
