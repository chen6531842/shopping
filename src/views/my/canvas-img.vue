<template>
  <div class="invite-friends" v-if="inviteFriends">
    <div class="invite-friends-centent">
      <!-- -->
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { Toast } from "vant";
import { getUserQrcode } from "@/api/index";
import axios from "axios";
import store from "@/store/index";
@Component
export default class CanvasImg extends Vue {
  private inviteFriends = false;
  private qrcode_url = "";
  private userInfo: objAny = {};
  private imgUrl = "";
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
      console.log(res);
      // 处理返回的文件流
      const imageUrl =
        "data:image/png;base64," +
        btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
      console.log(imageUrl);
      this.qrcode_url = imageUrl;
      this.$nextTick(() => {
        this.canvasImg();
      });
      // 此处给图片url赋值 图片src = imageUrl
    });

    // const ret = await getUserQrcode({});
    // // console.log(ret);
    // const imageUrl =
    //   "data:image/png;base64," +
    //   btoa(
    //     new Uint8Array(ret).reduce(
    //       (data, byte) => data + String.fromCharCode(byte),
    //       ""
    //     )
    //   );
    // console.log(imageUrl);
    // this.imgUrl = imageUrl;
    // (window.URL || window.webkitURL).createObjectURL(blob)
    // if (ret.code == 0) {
    // this.qrcode_url = ret.data.qrcode_url;
    // this.$nextTick(() => {
    //   this.canvasImg();
    // });
    // } else {
    //   Toast(ret.msg);
    // }
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

    const bg = await this.loadImg("/common/test.png");
    if (bg) {
      myctx.drawImage(bg, 0, 0, canvas2.width, canvas2.height);
    }
    const myImg = await this.loadImg(this.userInfo.headimgurl);
    if (myImg) {
      myctx.drawImage(
        myImg,
        canvas2.width / 2 - 30 * t,
        30 * t,
        50 * t,
        50 * t
      );
    }
    const qrcode_url = await this.loadImg(this.qrcode_url);
    if (qrcode_url) {
      myctx.drawImage(
        qrcode_url,
        canvas2.width / 2 - 65 * t,
        canvas2.height * 0.7,
        // 100 * t,
        // 28 * t
        130 * t,
        130 * t
      );
    }
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
    .img-url {
      width: 42vw;
      height: 75vw;
    }
    .load-img {
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
