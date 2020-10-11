<template>
  <div class="my-order">
    <div class="order-header">
      <ul class="header-ul">
        <li
          class="header-item"
          :class="{ active: active == 0 }"
          @click="itemClick(0)"
        >
          <span>所有订单</span>
        </li>
        <li
          class="header-item"
          :class="{ active: active == 1 }"
          @click="itemClick(1)"
        >
          <span>未收货</span>
        </li>
        <li
          class="header-item"
          :class="{ active: active == 2 }"
          @click="itemClick(2)"
        >
          <span>结算中</span>
        </li>
        <li
          class="header-item"
          :class="{ active: active == 3 }"
          @click="itemClick(3)"
        >
          <span>已结算</span>
        </li>
      </ul>
      <div class="tips-text">
        <p>
          <img src="../../assets/image/tips-1.png" alt="" />
          订单在购物平台上确认收货3天后，奖金才会结算喔
        </p>
        <p>
          <img src="../../assets/image/tips-1.png" alt="" />
          订单已收货但此处显示未收货，请点击刷新按钮更新
        </p>
      </div>
    </div>
    <div class="order-flex">
      <div class="no-data">
        <img src="../../assets/image/no-data.png" alt="" />
        <p>空空如也~</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class MyOrder extends Vue {
  private active = 0;
  public itemClick(index: number) {
    this.active = index;
  }
}
</script>
<style lang="less">
.my-order {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .order-header {
    width: 100vw;

    color: #666;
    .header-ul {
      background: #fff;
      height: 12vw;
      padding: 0 5%;
      display: flex;
      justify-content: space-between;
      .header-item {
        background: #fff;
        margin-bottom: 2vw;
        height: 100%;
        padding: 0;
        width: 18vw;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          position: absolute;
          display: inline-block;
          height: 6vw;
          line-height: 6vw;
          text-align: center;
          font-size: 4vw;
        }
      }
      .header-item.active {
        color: #000 !important;
        border-bottom: 2px solid #f52724;
      }
    }
    .tips-text {
      height: 14vw;
      line-height: 7vw;
      background: #fff7eb;
      color: #ed9d3a;
      font-size: 3.5vw;
      img {
        width: 3.5vw;
        height: 3.5vw;
        margin-right: 2vw;
        margin-left: 4vw;
      }
    }
  }
  .order-flex {
    flex: 1;
    position: relative;
    .no-data {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 47.02vw;
        height: 32.28vw;
        margin-left: 4.5vw;
        margin-top: -30vw;
      }
      p {
        margin-top: -2vw;
        color: #999;
      }
    }
  }
}
</style>
