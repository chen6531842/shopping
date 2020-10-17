<template>
  <div class="wx-code">asdasd</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class WxCode extends Vue {
  public goWx() {
    const win: objAny = window;
    const url = win.location.href.replace(/#/g, "__");
    win.location.href =
      this.$config.getCodeUrl + "?url=" + url + "&appId=" + this.$config.appId;
  }
  beforeRouteEnter(to: objAny, from: objAny, next: Function) {
    console.log(to);
    console.log(from);
    next();
  }
  beforeRouteLeave(to: objAny, from: objAny, next: Function) {
    console.log(to);
    console.log(from);
    next();
  }
}
</script>
<style lang="less"></style>
