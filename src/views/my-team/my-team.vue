<template>
  <div class="my-team">
    <div class="my-team-flex">
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
export default class MyTeam extends Vue {
  private active = 0;
  public itemClick(index: number) {
    this.active = index;
  }
}
</script>
<style lang="less">
.my-team {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .my-team-flex {
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
