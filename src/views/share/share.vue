<template>
  <div class="share-page">
    <canvas-img ref="canvasImg" type="page"></canvas-img>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import canvasImg from "../my/canvas-img.vue";
import { getUserInfo } from "@/api/index";
import { Toast } from "vant";
@Component({
  components: {
    "canvas-img": canvasImg
  }
})
export default class SharePage extends Vue {
  private userInfo: objAny = {};
  async getUserInfo() {
    const ret = await getUserInfo({});
    if (ret.code == 0) {
      this.userInfo = ret.data;
      this.openQrcode();
    } else {
      Toast(ret.msg);
    }
  }
  openQrcode() {
    const canvasImg: objAny = this.$refs.canvasImg;
    canvasImg.open(this.userInfo);
  }

  mounted() {
    this.getUserInfo();
  }
}
</script>
<style lang="less"></style>
