<template>
  <div class="help-center">
    <div class="banner">
      <img src="../../assets/img/help_banner.png" />
    </div>
    <div class="help_head" style="width: 96.5vw;padding-left: 3.5vw;">
      <span>热点问题</span>
    </div>
    <div class="help_body">
      <ul>
        <li @click="help_skip(1)">
          <img class="head_img" src="../../assets/img/tb-icon.png" />
          <p>
            <span>淘宝天猫购物如何领奖金？</span><br />
            <span
              style="display:inline-block;margin-top:1vw;font-size: 12px;color: #CCCCCC;"
              >一分钟掌握淘宝省钱技巧~</span
            ><br />
          </p>
          <img class="footer_img" src="../../assets/img/jc_jiantou.png" />
        </li>
        <li @click="help_skip(3)">
          <img class="head_img" src="../../assets/img/pdd-icon.png" />
          <p>
            <span>拼多多购物如何领奖金？</span><br />
            <span
              style="display:inline-block;margin-top:1vw;font-size: 12px;color: #CCCCCC;"
              >一分钟掌握拼多多省钱技巧~</span
            ><br />
          </p>
          <img class="footer_img" src="../../assets/img/jc_jiantou.png" />
        </li>
        <li @click="help_skip(2)">
          <img class="head_img" src="../../assets/img/jd-icon.png" />
          <p>
            <span>京东购物如何领奖金？</span><br />
            <span
              style="display:inline-block;margin-top:1vw;font-size: 12px;color: #CCCCCC;"
              >一分钟掌握京东省钱技巧~</span
            ><br />
          </p>
          <img class="footer_img" src="../../assets/img/jc_jiantou.png" />
        </li>
        <li @click="help_skip(4)">
          <img class="head_img" src="../../assets/img/ti-icon.png" />
          <p>
            <span>奖金如何申请提现？</span><br />
            <span
              style="display:inline-block;margin-top:1vw;font-size: 12px;color: #CCCCCC;"
              >10秒掌握奖金提现技巧~</span
            ><br />
          </p>
          <img class="footer_img" src="../../assets/img/jc_jiantou.png" />
        </li>
      </ul>
    </div>
    <div class="help_detail">
      <div class="head">
        <!--<img src="../../assets/img/help_question.png"/>--><span
          >常见问题</span
        >
      </div>
      <div class="body">
        <div class="body_tu">
          <div @click="helpTwo(0)">
            <img src="../../assets/img/help_jin.png" />
            <p>奖金相关</p>
          </div>
          <div @click="helpTwo(1)">
            <img src="../../assets/img/help_de.png" />
            <p>提现相关</p>
          </div>
          <div @click="helpTwo(3)">
            <img src="../../assets/img/help_huiyuan.png" />
            <p>会员相关</p>
          </div>
          <!--<div @click="helpTwo(2)">
						<img src="../../assets/img/help_daili.png"/>
						<p>代理问题</p>
					</div>-->
        </div>
        <div class="body_tu">
          <div @click="helpTwo(4)">
            <img src="../../assets/img/help_dingdan.png" />
            <p>订单问题</p>
          </div>
          <div @click="helpTwo(5)">
            <img src="../../assets/img/help_hui.png" />
            <p>优惠券问题</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="help_footer" style="display: none;">
      <img src="../../assets/img/help_contact.png" /><span>联系客服</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { objAny } from "../../common/common-interface";
@Component
export default class HelpCenter extends Vue {
  public helpTwo(index: number) {
    this.$router.push('/problem-list?type=' + index)
  }
}
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
body {
  font-size: 12px;
  background: #f4f4f4;
}
[v-cloak] {
  display: none;
}
.help_head {
  width: 96.5vw;
  padding-left: 3.5vw;
  height: 8vw;
  display: flex;
  align-items: center;
  background: #f4f4f4;
}
.help_head img {
  width: 4.13vw;
  height: 4.13vw;
}
.help_head span {
  font-family: AdobeHeitiStd-Regular;
  color: #999999;
  font-size: 3.73vw;
  padding-left: 2.13vw;
}
.help_body {
  width: 100vw;
  height: 71vw;
}
.help_body ul {
  width: 100%;
  height: 100%;
}
.help_body ul li {
  display: flex;
  justify-content: flex-start;
  padding-left: 3.5vw;
  border-bottom: 1px solid #d7d7d7;
  background: #ffffff;
  width: 96.5vw;
  height: 21.4vw;
  list-style: none;
}
.help_body ul li:first-child {
  margin-top: 0;
}
.head_img {
  padding: 4.3vw 0 4.3vw 5vw;
  width: 12vw;
  height: 12.8vw;
}
.footer_img {
  width: 2vw;
  height: 3vw;
  float: right;
  right: 4vw;
  position: absolute;
  margin-top: 9.5vw;
}
.help_body ul li p {
  padding: 5vw 0 6.2vw 6vw;
  font-size: 3.34vw;
  font-family: AdobeHeitiStd-Regular;
  display: inline-block;
  float: left;
  color: #999999;
}
.help_body ul li p span:first-child {
  font-size: 4vw;
  color: #333333;
}
.help_detail {
  width: 100vw;
  height: 60vw;
  margin-top: 18vw;
}
.help_detail .head {
  width: 96.5vw;
  height: 12vw;
  padding-left: 3.5vw;
  display: flex;
  align-items: center;
  background: #f4f4f4;
}
.help_detail .head img {
  width: 4.13vw;
  height: 4.13vw;
}
.help_detail .head span {
  font-family: AdobeHeitiStd-Regular;
  color: #999999;
  font-size: 3.73vw;
  padding-left: 2.13vw;
}
.help_detail .body {
  width: 100%;
  height: 41vw;
  border-bottom: 1px solid #f4f4f4;
  background: #ffffff;
}
.help_detail .body .body_tu {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.help_detail .body .body_tu div {
  width: 33.3%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.help_detail .body .body_tu div img {
  width: 7vw;
  height: 7vw;
  margin-bottom: 1vw;
}
.help_footer {
  width: 20%;
  margin-left: 40%;
  display: flex;
  justify-content: center;
  margin-top: 2vw;
}
.help_footer img {
  width: 4.5vw;
  height: 4.5vw;
  padding-right: 0.5vw;
}
.help_footer span {
  font-family: AdobeHeitiStd-Regular;
  color: #57c1fd;
}
.help_detailtwo {
  position: absolute;
  top: 0;
  width: 100%;
  background: #ffffff;
}
.help_detailtwo ul {
  width: 100%;
}
.help_detailtwo ul li {
  width: 90%;
  margin-left: 5%;
  font-size: 3.86vw;
  border-bottom: 1px solid #f4f4f4;
  height: 11.3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.help_detailtwo ul li img {
  width: 2.67vw;
  height: 4.26vw;
}
.help_detailthree {
  width: 80vw;
  padding-left: 10vw;
  padding-right: 10vw;
  padding-top: 10vw;
  padding-bottom: 4vh;
  background: #ffffff;
}
.help_detailthree .qu {
  width: 100%;
  display: flex;
  align-items: flex-start;
  color: gray;
  font-size: 4vw;
  margin-left: -6vw;
  height: 6vw;
  margin-bottom: 7vw;
}
.help_detailthree .an {
  width: 100%;
  margin-top: 2vh;
  font-size: 4vw;
}
.banner {
  width: 100vw;
  height: 26.6vw;
  background: #0062cc;
}
.banner img {
  width: 100%;
  height: 100%;
}
.body_tu p {
  color: #333333;
}
</style>
