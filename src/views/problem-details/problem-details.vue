<template>
  <div class="problem-list-details">
    <p class="qu">
      <img
        src="../../assets/img/help3_qu.png"
        style="margin-right: 2vw;margin-top: 1vw;width: 4vw;height: 4vw;vertical-align: text-bottom;"
      />{{ dataDetails.qu }}
    </p>
    <div class="an">
      <img
        src="../../assets/img/help3_an.png"
        style="margin-right: 2vw;margin-top: 1vw;width: 4vw;height: 4vw;vertical-align: text-bottom;"
      />
      <span v-html="dataDetails.an"></span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class ProblemList extends Vue {
  private dataDetails: objAny = {};
  public getDetails() {
    this.dataDetails = this.$common.get("problem-list-details") || {};
  }
  mounted() {
    this.getDetails();
  }
}
</script>
<style lang="less">
.problem-list-details {
  background-color: #fff;
  padding: 30px 20px;
  .an {
    margin-top: 8vw;
  }
}
</style>
