<template>
  <div class="my-deposit">
    <div class="deposit-header">
      <ul class="header-ul">
        <li
          class="header-item"
          :class="{ active: active == 0 }"
          @click="itemClick(0)"
        >
          <span>奖金收入</span>
        </li>
        <li
          class="header-item"
          :class="{ active: active == 1 }"
          @click="itemClick(1)"
        >
          <span>团队收入</span>
        </li>
        <li
          class="header-item"
          :class="{ active: active == 2 }"
          @click="itemClick(2)"
        >
          <span>其他收入</span>
        </li>
      </ul>
    </div>
    <div class="deposit-flex">
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
export default class MyDeposit extends Vue {
  private active = 0;
  public itemClick(index: number) {
    this.active = index;
  }
}
</script>
<style lang="less">
.my-deposit {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .deposit-header {
    width: 100vw;
    height: 12vw;
    background: #fff;
    color: #666;
    .header-ul {
      width: 90%;
      height: 12vw;
      margin-left: 5%;
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
  }
  .deposit-flex {
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
