<template>
  <div class="invite-friends" v-if="inviteFriends">
    <div
      class="invite-friends-centent"
      :class="{ 'page-show': type == 'page' }"
    >
      <!-- -->
      <div class="loading-tips" v-show="imgUrl == ''">图片加载中...</div>
      <canvas
        width="420"
        height="750"
        class="load-img"
        id="canvas-img"
        v-show="imgUrl == ''"
      ></canvas>
      <img :src="imgUrl" class="img-url" alt="" v-show="imgUrl != ''" />
      <p><img src="../../assets/image/down.png" alt="" /> 长按图片保存到手机</p>
    </div>
    <div class="close" @click="inviteFriends = false"></div>
    <canvas id="myImeCanvas" style="margin: 0 auto; display: block;"></canvas>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { Toast } from "vant";
// import { getUserQrcode } from "@/api/index";
import axios from "axios";
import store from "@/store/index";
@Component
export default class CanvasImg extends Vue {
  @Prop({ default: "" }) private type!: string;
  private inviteFriends = false;
  private qrcode_url = "";
  private userInfo: objAny = {};
  private imgUrl = "";
  private myImg = "";
  async open(userInfo: objAny) {
    this.userInfo = userInfo;
    this.inviteFriends = true;

    const state: any = store.state; // eslint-disable-line
    const appUserInfo = state.app.userInfo;
    const headers: objAny = {
      "Content-Type": "application/json"
    };
    if (userInfo) {
      headers["x-token"] = appUserInfo.token;
    }

    axios({
      method: "post",
      url: "/v1/user/qrcode",
      headers: headers,
      responseType: "arraybuffer",
      data: {}
    }).then(res => {
      // console.log(res);
      // 处理返回的文件流
      const imageUrl =
        "data:image/png;base64," +
        btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
      // console.log(imageUrl);
      this.qrcode_url = imageUrl;
      this.$nextTick(() => {
        this.getMyImgUrl();
      });
      // 此处给图片url赋值 图片src = imageUrl
    });
  }
  async getMyImgUrl() {
    const canvas: any = document.getElementById("myImeCanvas");

    const img = await this.loadImg(this.userInfo.headimgurl);
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    //获取图片宽高的最小值
    const min = Math.min(img.width, img.height);
    const r = min / 2;

    ctx.fillStyle = ctx.createPattern(img, "no-repeat");
    ctx.clearRect(0, 0, img.width, img.height);
    ctx.arc(img.width / 2, img.height / 2, r, 0, Math.PI * 2);
    ctx.fill();
    const url = canvas.toDataURL("image/png");
    // console.log(url);
    this.myImg = url;
    this.canvasImg();
    canvas.style.display = "none";
  }
  async canvasImg() {
    const win: objAny = window;

    const canvas2: any = win.document.getElementById("canvas-img");
    const myctx = canvas2.getContext("2d");
    const t = 2;
    const w = canvas2.width * t;
    const h = canvas2.height * t;
    canvas2.width = w;
    canvas2.height = h;

    const bg = await this.loadImg(this.$config.shareImgUrl);
    if (bg) {
      myctx.drawImage(bg, 0, 0, canvas2.width, canvas2.height);
    }
    const myImg = await this.loadImg(this.myImg);
    if (myImg != "") {
      myctx.drawImage(myImg, 45 * t, canvas2.height - 175 * t, 50 * t, 50 * t);
    }
    const qrcode_url = await this.loadImg(this.qrcode_url);
    if (qrcode_url) {
      myctx.drawImage(
        qrcode_url,
        canvas2.width - (105 + 50) * t,
        canvas2.height - (105 + 32) * t,
        105 * t,
        105 * t
      );
    }
    myctx.font = 14 * 2 + "px  bold 黑体";
    myctx.textAlign = "center";
    myctx.fillStyle = "#333";
    myctx.fillText(this.userInfo.name, 60 * t, canvas2.height - 105 * t);

    this.imgUrl = canvas2.toDataURL("image/png");
  }
  loadImg(src: string) {
    return new Promise<any>((resolve, reject) => {
      const beauty = new Image();
      // if (type) {
      beauty.crossOrigin = "anonymous"; //关键
      // }

      beauty.src = src;
      if (beauty.complete) {
        resolve(beauty);
      } else {
        beauty.onload = function() {
          resolve(beauty);
        };
        beauty.onerror = function() {
          resolve(null);
          Toast("图片加载失败");
        };
      }
    });
  }
  mounted() {
    this.$nextTick(() => {
      // this.canvasImg();
    });
  }
}
</script>
<style lang="less">
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
  .invite-friends-centent.page-show {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;
    .img-url {
      width: 67vw;
      height: 120vw;
    }
  }
  .invite-friends-centent {
    overflow: hidden;
    width: 85vw;
    height: 88vw;
    background: #fff;
    border-radius: 1vw;
    z-index: 998;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .loading-tips {
      font-size: 0.24rem;
      color: #999;
      text-align: center;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0.3rem;
      z-index: 10;
    }
    .img-url {
      width: 42vw;
      height: 75vw;
    }
    .load-img {
      opacity: 0;
      width: 420px;
      height: 750px;
      background-size: 100% 100%;
      position: relative;
      .headimgurl {
        width: 8vw;
        height: 8vw;
        position: absolute;
        top: 3vw;
        left: 50%;
        transform: translateX(-50%);
      }
      .qrcode {
        width: 15vw;
        height: 15vw;
        bottom: 5vw;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
      }
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
</style>
