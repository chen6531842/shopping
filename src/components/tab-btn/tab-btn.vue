<template>
  <div class="tab-btn">
    <div class="tab-btn-box">
      <div
        class="tab-btn-flex"
        @click="tabClick('tb')"
        :class="{ active: active == 'tb' }"
      >
        淘宝
      </div>
      <div
        class="tab-btn-flex"
        @click="tabClick('pdd')"
        :class="{ active: active == 'pdd' }"
      >
        拼多多
      </div>
      <div
        class="tab-btn-flex"
        @click="tabClick('jd')"
        :class="{ active: active == 'jd' }"
      >
        京东
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// import { objAny } from "../../common/common-interface";
@Component({
  components: {}
})
export default class TabBtn extends Vue {
  @Prop({ default: "" }) private active!: string;

  public tabClick(key: string) {
    this.$emit("click", key);
  }
}
</script>
<style lang="less">
.tab-btn {
  padding: 0.15rem;
  text-align: center;
  height: 0.44rem;
  background-color: #fff;
  .tab-btn-box {
    font-size: 0;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(233, 51, 37);
    border-radius: 0.1rem;
  }
  .tab-btn-flex {
    display: inline-block;
    width: 1rem;
    vertical-align: top;
    color: rgba(233, 51, 37);
    border-right: 1px solid rgba(233, 51, 37);
    font-size: 0.28rem;
    line-height: 0.4rem;
  }
  .tab-btn-flex:last-child {
    border: none;
  }
  .tab-btn-flex.active {
    background: rgba(233, 51, 37);
    color: #fff;
  }
}
</style>
