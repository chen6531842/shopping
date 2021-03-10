<template>
  <div class="my-header" :class="{ oem: $config.ISOEM }">
    <div class="my-info-box">
      <div class="my-img">
        <img :src="userInfo.avatar" alt="" />
      </div>
      <div class="my-info-flex">
        <div class="name">
          {{ userInfo.name }}
          <router-link to="/grade-description" v-if="!$config.ISOEM">
            <div class="tag-item">
              {{ userInfo.level_text }}
              <img src="../../assets/image/wen.png" alt="" />
            </div>
          </router-link>
        </div>
        <div class="id">
          <div class="tag-item">
            返利100% + {{ userInfo.self_rate >= 0 ? userInfo.self_rate : 0 }}%
          </div>
          <!-- 您当前的身份: {{ userInfo.level_text }} -->
        </div>
      </div>
    </div>
    <div class="header-info">
      <div class="header-info-flex">
        <div class="value">
          <div class="value-text">
            <div @click="goUrl('/income-list')">
              ¥{{ walletInfo.money | money }}
            </div>
            <div class="cash-btn" @click="goUrl('/my-wallet')">提现</div>
          </div>
        </div>
        <div class="name" @click="goUrl('/income-list')">账户余额</div>
      </div>
      <div class="header-info-flex" v-if="!$config.ISOEM">
        <div class="value">{{ walletInfo.egg || 0 }}枚</div>
        <div class="name">鸡蛋</div>
      </div>
      <div class="header-info-flex">
        <div class="value">¥{{ walletInfo.unsettled | money }}</div>
        <div class="name">我的待入账</div>
      </div>
      <div class="header-info-flex">
        <div class="value">¥{{ walletInfo.team_income | money }}</div>
        <div class="name">粉丝为我赚</div>
      </div>
    </div>
    <!-- <div class="fen-si-div" v-if="!$config.ISOEM">
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
        v-if="type == 'my' && !$config.ISOEM"
        >奖励规则></router-link
      >
    </div> -->
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

  goUrl(url: string) {
    this.$router.push(url);
  }
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
  .header-info {
    background-color: rgba(51, 51, 73);
    border-radius: 0.2rem 0.2rem 0 0;
    text-align: center;
    display: flex;
    margin-top: 0.5rem;
    position: relative;
    .header-info-flex {
      flex: 1;
      padding-top: 0.3rem;
      padding-bottom: 0.2rem;
      .value {
        color: #f48220;
        font-size: 0.24rem;
        .value-text {
          position: relative;
          display: inline-block;
          .cash-btn {
            position: absolute;
            padding: 0.05rem 0.1rem;
            top: -0.2rem;
            right: -0.4rem;
            font-size: 0.14rem;
            color: #fff;
            border-radius: 0.2rem;
            background: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .name {
        color: #fff;
        font-size: 0.24rem;
        margin-top: 0.1rem;
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
  .tag-item {
    padding: 0 0.1rem;
    background: rgba(0, 0, 0, 0.3);
    font-size: 0.18rem;
    color: #fff;
    height: 0.24rem;
    line-height: 0.24rem;
    display: inline-flex;
    vertical-align: middle;
    border-radius: 0.2rem;
    img {
      width: 0.2rem;
      height: 0.2rem;
      vertical-align: text-top;
      margin-left: 0.05rem;
    }
  }
}
// .my-header.oem {
//   padding-bottom: 0.3rem;
// }
</style>
