<template>
  <div class="my-withdrawal">
    <div class="icon-box">
      <img src="../../assets/image/zfbHead.png" alt="" />
    </div>
    <div class="input-cell-box">
      <div class="input-cell-item">
        <div class="input-name">收款人</div>
        <div class="input-flex">
          <input
            type="text"
            @input="isBtn"
            v-model="formData.name"
            placeholder="请输入你的真实姓名"
          />
        </div>
      </div>
      <div class="input-cell-item">
        <div class="input-name">支付宝账号</div>
        <div class="input-flex">
          <input
            type="text"
            @input="isBtn"
            v-model="formData.account"
            placeholder="请填写支付宝帐号"
          />
        </div>
      </div>
      <div class="input-cell-item">
        <div class="input-name">手机号</div>
        <div class="input-flex">
          <input
            @input="isBtn"
            type="text"
            maxlength="11"
            onkeyup="this.value=this.value.replace(/\D/g,'')"
            placeholder="请输入手机号"
            v-model="formData.phone"
          />
        </div>
      </div>
      <div class="input-cell-item">
        <div class="input-name">验证码</div>
        <div class="input-flex">
          <input
            type="text"
            @input="isBtn"
            placeholder="请输入验证码"
            v-model="formData.vcode"
          />
        </div>
        <div class="code-box">
          <button
            class="code-btn"
            @click="getCode"
            :class="{ primary: isCodeBtn && !isCode }"
          >
            {{ codeText }}
          </button>
        </div>
      </div>
    </div>
    <button
      class="sub-btn "
      :class="subBtn ? '' : 'disabled'"
      @click="bindAlipaySubmit"
    >
      确认提交
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { bindAlipayApply, bindAlipaySubmit, myAlipay } from "@/api/index";
import { Toast } from "vant";
@Component
export default class Withdrawal extends Vue {
  private formData: objAny = {
    name: "",
    phone: "",
    account: "",
    vcode: ""
  };
  private time = 60;
  private isCode = false;
  private subBtn = false;
  private isCodeBtn = false;
  private codeText = "获取验证码";
  public getCode() {
    if (!this.isCode && this.isCodeBtn) {
      this.isCode = true;
      this.bindAlipayApply();
    }
  }
  public isBtn() {
    if (
      this.formData.name != "" &&
      this.formData.account != "" &&
      this.formData.phone.length == 11
    ) {
      this.isCodeBtn = true;
      if (this.formData.vcode != "") {
        this.subBtn = true;
      } else {
        this.subBtn = false;
      }
    } else {
      this.isCodeBtn = false;
      this.subBtn = false;
    }
  }
  public timeFn() {
    setTimeout(() => {
      if (this.time > 0) {
        this.time--;
        this.codeText = "(" + this.time + ")重新获取";
        this.timeFn();
      } else {
        this.isCode = false;
        this.codeText = "重新获取";
      }
    }, 1000);
  }
  async bindAlipayApply() {
    const ret = await bindAlipayApply(this.formData);
    if (ret.code == 0) {
      this.time = 60;
      this.timeFn();
      // this.walletInfo = ret.data;
    } else {
      Toast(ret.msg);
      this.isCode = false;
    }
  }
  async bindAlipaySubmit() {
    if (this.subBtn) {
      const ret = await bindAlipaySubmit(this.formData);
      if (ret.code == 0) {
        Toast("提交成功,请等待审核");
        this.$common.goBack();
      } else {
        Toast(ret.msg);
      }
    }
  }
  async myAlipay() {
    const ret = await myAlipay({});
    if (ret.code == 0) {
      if (ret.data.id) {
        const data = ret.data;
        this.formData.name = data.name;
        this.formData.phone = data.phone;
        this.formData.account = data.account;
        this.isBtn();
      }
    } else {
      Toast(ret.msg);
    }
  }
  mounted() {
    this.myAlipay();
  }
}
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
          vertical-align: top;
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
  .code-btn.primary {
    background-color: #00aaef;
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
