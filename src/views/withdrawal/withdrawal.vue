<template>
  <div class="my-withdrawal">
    <div class="icon-box">
      <img src="../../assets/image/zfbHead.png" alt="" />
    </div>
    <div class="input-cell-box">
      <div class="input-cell-item">
        <div class="input-name">收款人</div>
        <div class="input-flex">
          <input type="text" placeholder="请输入你的真实姓名" />
        </div>
      </div>
      <div class="input-cell-item">
        <div class="input-name">支付宝账号</div>
        <div class="input-flex">
          <input type="text" placeholder="请填写支付宝帐号" />
        </div>
      </div>
      <div class="input-cell-item">
        <div class="input-name">手机号</div>
        <div class="input-flex">
          <input
            type="text"
            maxlength="11"
            onkeyup="this.value=this.value.replace(/\D/g,'')"
            placeholder="请输入手机号"
          />
        </div>
      </div>
      <div class="input-cell-item">
        <div class="input-name">验证码</div>
        <div class="input-flex">
          <input type="text" placeholder="请输入验证码" />
        </div>
        <div class="code-box">
          <button class="code-btn">获取验证码</button>
        </div>
      </div>
    </div>
    <button class="sub-btn disabled">确认提交</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class Withdrawal extends Vue {}
</script>
<style lang="less">
.my-withdrawal {
  .icon-box {
    img {
      width: 100%;
    }
  }
  .input-cell-box {
    background-color: #fff;
    margin-top: 2vw;
    .input-cell-item {
      display: flex;

      border-bottom: 1px solid #ddd;
      padding: 2.5vh 0;
      line-height: 3vh;
      .input-name {
        width: 30%;
        text-align: center;
        font-size: 2.5vh;
      }
      .input-flex {
        flex: 1;
        input {
          width: 100%;
          font-size: 2.5vh;
          border: none;
        }
      }
    }
  }
  .code-box {
    width: 26vw;
    position: relative;
    padding: 2vh;
  }
  .code-btn {
    width: 26vw;
    height: 8.5vw;
    background: #ccc;
    color: #fff;
    text-align: center;
    line-height: 8.5vw;
    font-size: 3.8vw;
    border-radius: 1vw;
    border: none;
    position: absolute;
    left: 0;
    top: -0.5vh;
  }
  .sub-btn {
    width: 92vw;
    height: 12vw;
    background: #00aaef;
    margin-top: 5vw;
    margin-left: 4vw;
    font-size: 4.9vw;
    color: #fff;
    border-radius: 2vw;
    border: none;
  }
  .sub-btn.disabled {
    background: #ccc;
  }
}
</style>
