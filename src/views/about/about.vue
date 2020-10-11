<template>
  <div class="my-about">
    <div class="logo-box">
      <img src="../../assets/image/icon-1.png" alt="" />
      <p>logo</p>
    </div>
    <div class="about-content">
      <p>
        券猫是一个无需APP的<span class="red">优惠券探测神器</span
        >，每次网购多花10秒必有收获.
      </p>
      <p>
        平台理念:
        安全、便捷、透明、拥抱变化。致力于为中国的网上购物用户带来全新的网购体验。
      </p>
      <p>平台愿景：愿再没有吃哑巴亏的消费者。</p>
      <p>本公众号已取得腾迅企业认证，安全、可靠、稳定，请放心使用。</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class MyAbout extends Vue {}
</script>
<style lang="less">
.my-about {
  height: 100vh;
  background-color: #fff;
  .logo-box {
    padding-top: 6vh;
    text-align: center;
    img {
      width: 30vw;
      height: 30vw;
    }
    p {
      margin-top: 3vw;
      font-size: 5vw;
    }
  }
  .about-content {
    border: 1px solid #ddd;
    border-radius: 2vw;
    padding: 4vw;
    font-size: 3.5vw;
    color: #999;
    margin: 5vh 4vw;
    p {
      margin-top: 3vh;
    }
    p:first-child {
      margin-top: 0;
    }
  }
  .red {
    color: red;
  }
}
</style>
