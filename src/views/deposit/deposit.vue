<template>
  <div class="my-deposit">
    <div class="no-data">暂无更多数据</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class MyDeposit extends Vue {}
</script>
<style lang="less">
.my-deposit {
  .no-data {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.2vw;
  }
}
</style>
