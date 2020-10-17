<template>
  <div class="my-deposit">
    <div class="no-data">暂无更多数据</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { withdrawLogs } from "@/api/index";
@Component
export default class MyDeposit extends Vue {
  public form: objAny = {
    page: 1,
    page_size: 10
  };
  public list: object[] = [];

  async incomeLogs() {
    const ret = await withdrawLogs(this.form);
    if (ret.code == 0) {
      this.list = this.list.concat(ret.data);
    }
  }
  mounted() {
    this.incomeLogs();
  }
}
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
