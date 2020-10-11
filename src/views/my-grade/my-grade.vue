<template>
  <div class="my-grade">
    <img src="../../assets/image/aboutGrade.png" alt="" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class MyGrade extends Vue {}
</script>
<style lang="less">
.my-grade {
  img {
    width: 100%;
  }
}
</style>
