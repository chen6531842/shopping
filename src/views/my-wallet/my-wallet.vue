<template>
  <div class="my-wallet">
    <div class="wallet-info">
      <div class="wallet-title">已结算金额(元)</div>
      <div class="wallet-name">{{ walletInfo.money | money }}</div>
      <div class="wallet-btn">
        <div class="wallet-btn-flex">
          <button class="my-btn" @click="withdrawal">提现到支付宝</button>
        </div>
        <div class="wallet-btn-flex">
          <button class="my-btn wx" @click="cashSupermarket">提现到超市</button>
        </div>
      </div>
    </div>
    <div class="money-type center-box">
      <div class="money-type-item center-box" @click="goOrder">
        <div class="type-item-center">
          <p class="name">待结算奖金(元)</p>
          <p class="value">{{ walletInfo.unsettled | money }}</p>
        </div>
        <img
          src="../../assets/image/icon-right.png"
          class="icon-right"
          alt=""
        />
      </div>
      <div class="money-type-item  center-box">
        <div class="type-item-center">
          <p class="name">团队累计奖金(元)</p>
          <p class="value">{{ walletInfo.team_income | money }}</p>
        </div>
      </div>
    </div>
    <p class="tips">
      <img src="../../assets/image/tips.png" alt="" />
      订单在购物平台确认收货3天后，奖金才会结算喔
    </p>
    <div class="cell-box">
      <div class="cell-item">
        <router-link to="/deposit">
          <p>提现明细</p>
          <img src="../../assets/image/icon-right.png" alt="" />
        </router-link>
      </div>
      <div class="cell-item">
        <router-link to="/income-list">
          <p>收入明细</p>
          <img src="../../assets/image/icon-right.png" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { getWalletInfo, myAlipay } from "@/api/index";
import { Toast } from "vant";
@Component
export default class MyWallet extends Vue {
  private walletInfo: objAny = {};
  private wallet: objAny = {};
  public withdrawal() {
    //
    if (this.wallet.id) {
      if (this.walletInfo.money > this.$config.minCash) {
        this.$router.push("/withdrawal-sub");
      } else {
        Toast("金额不足" + this.$config.minCash + "元，暂不能提现");
      }
    } else {
      this.$router.push("/withdrawal");
    }
  }
  public goOrder() {
    this.$router.push("/my-order");
  }
  async getWalletInfo() {
    const ret = await getWalletInfo({});
    if (ret.code == 0) {
      this.walletInfo = ret.data;
    } else {
      Toast(ret.msg);
    }
  }
  async myAlipay() {
    const ret = await myAlipay({});
    if (ret.code == 0) {
      this.wallet = ret.data || {};
    } else {
      Toast(ret.msg);
    }
  }
  cashSupermarket() {
    if (this.walletInfo.money > this.$config.minCash) {
      this.$router.push("withdrawal-sub-supermarket");
    } else {
      Toast("金额不足" + this.$config.minCash + "元，暂不能提现");
    }
  }

  mounted() {
    this.getWalletInfo();
    this.myAlipay();
  }
}
</script>
<style lang="less">
.my-wallet {
  .wallet-info {
    width: 100vw;
    background: #fff;
    .wallet-title {
      padding-top: 8vw;
      padding-bottom: 5vw;
      text-align: center;
      font-family: PingFangSC-Regular;
      color: #000;
      font-size: 4.2vw;
    }
    .wallet-name {
      padding-bottom: 10.6vw;
      font-size: 8vw;
      text-align: center;
      font-family: PingFangSC-Semibold;
      color: #000;
    }
    .wallet-btn {
      padding-bottom: 9.3vw;
      text-align: center;
      display: flex;
      .wallet-btn-flex {
        flex: 1;
      }
      .my-btn {
        border: none;
        width: 37vw;
        height: 10.6vw;
        border-radius: 1.5vw;
        color: #fff;
        background: #00aaef;
        font-size: 4.2vw;
      }
      .my-btn.wx {
        background: rgba(92, 201, 58);
      }
    }
  }
  .center-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .money-type {
    width: 100vw;
    height: 20vw;
    background: #fff;
    margin-top: 2.5vw;
    .money-type-item {
      width: 50%;
      height: 100%;
      font-size: 3.5vw;
      color: #666;
      .type-item-center {
        text-align: center;
        .name {
          color: #666;
          font-size: 3.8vw;
          width: 100%;
        }
        .value {
          color: #000;
          font-size: 4.8vw;
          margin-top: 2vw;
          width: 100%;
        }
      }
      .icon-right {
        width: 1.8vw;
        height: 3.4vw;
        margin-left: 6vw;
      }
    }
  }
  .tips {
    width: 100vw;
    height: 9vw;
    justify-content: flex-start;
    font-size: 3.2vw;
    color: #999;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    img {
      width: 3.5vw;
      height: 3.5vw;
      margin-left: 4vw;
      margin-right: 2vw;
    }
  }
  .cell-box {
    background-color: #fff;
    margin-top: 2.5vw;
    .cell-item {
      width: 100%;
      height: 14.4vw;

      a {
        width: 91vw;
        padding: 0 3vw 0 5vw;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        display: flex;
      }
      p {
        font-size: 3.73vw;
        color: #333;
        font-family: PingFangSC-Regular;
      }
      img {
        width: 1.8vw;
        height: 3.4vw;
      }
    }
    .cell-item:first-child {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
