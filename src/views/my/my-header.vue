<template>
  <div class="my-header">
    <div class="my-info-box">
      <div class="my-img">
        <img :src="userInfo.avatar" alt="" />
      </div>
      <div class="my-info-flex">
        <div class="name">{{ userInfo.name }}</div>
        <div class="id">您当前的身份: {{ userInfo.level_text }}</div>
      </div>
    </div>
    <div class="fen-si-div">
      <div class="fen-si-box">
        <div class="fen-si-name">粉丝购物奖励:</div>
        <div class="fen-si-flex">
          <div class="tag">
            一级{{
              userInfo.first_child_rate > 0 ? userInfo.first_child_rate : 0
            }}%
          </div>
          <div class="tag">
            二级{{
              userInfo.second_child_rate > 0 ? userInfo.second_child_rate : 0
            }}%
          </div>
        </div>
      </div>
      <div class="fen-si-box">
        <div class="fen-si-name">自购返利加倍:</div>
        <div class="fen-si-flex">
          {{ userInfo.self_rate >= 0 ? userInfo.self_rate : 0 }}%
        </div>
      </div>
      <router-link
        class="go-tips-page"
        to="/grade-description"
        v-if="type == 'my'"
        >奖励规则></router-link
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";

@Component({
  components: {}
})
export default class MyHeader extends Vue {
  @Prop({
    default: () => {
      return {};
    }
  })
  private userInfo!: objAny;
  @Prop({
    default: () => {
      return {};
    }
  })
  private walletInfo!: objAny;
  @Prop({ default: "" }) private type!: string;
}
</script>
<style lang="less">
.my-header {
  padding: 0.3rem 0.4rem 0rem 0.4rem;
  background: #f48220;
  color: #fff;
  .my-info-box {
    display: flex;
    .my-img {
      width: 1.2rem;
      height: 1.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .my-info-flex {
      flex: 1;
      padding-left: 0.2rem;
      font-size: 0.32rem;
      padding-top: 0.1rem;
      .id {
        margin-top: 0.15rem;
      }
    }
  }
  .fen-si-div {
    background-color: rgba(51, 51, 73);
    border-radius: 0.2rem 0.2rem 0 0;
    padding: 0.2rem;
    margin-top: 0.5rem;
    position: relative;
    .fen-si-box {
      display: flex;
      font-size: 0.32rem;
      margin-top: 0.2rem;
      .fen-si-name {
        width: 2.3rem;
        color: rgba(238, 234, 137);
      }
      .fen-si-flex {
        flex: 1;
        padding-left: 0.2rem;
        color: #fff;
        .tag {
          padding: 0.02rem 0.15rem;
          font-size: 0.24rem;
          border: 1px solid #fff;
          border-radius: 0.18rem;
          display: inline-block;
          vertical-align: top;
          margin-left: 0.2rem;
        }
        .tag:first-child {
          margin-left: 0;
        }
      }
      .go-tips-page {
        font-size: 0.24rem;
        color: #fff;
      }
    }
    .fen-si-box:first-child {
      margin-top: 0;
    }
  }
  .go-tips-page {
    font-size: 0.24rem;
    color: #fff;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
  }
}
</style>
