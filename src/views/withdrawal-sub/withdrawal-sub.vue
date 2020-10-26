<template>
  <div class="withdrawal-sub">
    <header class="withdrawal-header" @click="goUpdata">
      <div class="info">
        <img src="../../assets/image/pay.png" alt="" />
        <p class="user">
          <span class="name">收款人:{{ wallet.name }}</span>
          <span class="acc">收款人账号:{{ wallet.account }}</span>
        </p>
      </div>
      <p class="change">修改></p>
    </header>
    <div class="money">
      <p class="title">提现金额</p>
      <p class="number">￥{{ walletInfo.money }}</p>
    </div>
    <div class="submitPu" @click="withdrawApply">
      预计24小时内到账，确认提现
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { withdrawApply, myAlipay, getWalletInfo } from "@/api/index";
import { Toast } from "vant";
@Component
export default class WithdrawalSub extends Vue {
  private wallet: objAny = {};
  private walletInfo: objAny = {};

  async withdrawApply() {
    if (this.walletInfo.money > 0) {
      const ret = await withdrawApply({
        card_id: this.walletInfo.id,
        money: this.walletInfo.money
      });
      if (ret.code == 0) {
        Toast("提交成功");
      } else {
        Toast(ret.msg);
      }
    } else {
      Toast("提现金额不足");
    }
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
  public goUpdata() {
    this.$router.push("/withdrawal");
  }
  mounted() {
    this.getWalletInfo();
    this.myAlipay();
  }
}
</script>
<style lang="less">
.withdrawal-sub {
  .withdrawal-header {
    width: 100vw;
    height: 15.7vw;
    margin-top: 3vw;
    justify-content: space-between;
    background: #fff;
    display: flex;
    align-items: center;
    .info {
      display: flex;
      justify-content: center;
      img {
        width: 10vw;
        height: 10vw;
        margin-left: 4vw;
      }
      .user {
        flex-direction: column;
        align-items: flex-start;
        margin-left: 4vw;
        display: flex;
        justify-content: center;
        .name {
          font-size: 4.2vw;
          color: #000;
        }
        .acc {
          font-size: 3.8vw;
          color: #666;
        }
      }
    }
    .change {
      font-size: 3.6vw;
      color: #666;
      margin-right: 4vw;
    }
  }
  .money {
    width: 100vw;
    height: 30vw;
    background: #fff;
    margin-top: 3.8vw;
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      height: 14vw;
      align-items: center;
      font-size: 4vw;
      color: #666;
      margin-left: 4vw;
    }
    .number {
      height: 16vw;
      align-items: flex-start;
      margin-left: 2vw;
      font-size: 9vw;
      color: #000;
    }
  }
  .submitPu {
    width: 92vw;
    height: 12vw;
    background: #f52724;
    margin-top: 5vw;
    margin-left: 4vw;
    font-size: 4.9vw;
    color: #fff;
    border-radius: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
