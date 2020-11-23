<template>
  <div class="grade-description">
    <my-header :userInfo="userInfo" :walletInfo="walletInfo"></my-header>

    <div class="grade-tips">
      <div class="grade-tips-title">会员可解锁以下基础权益</div>
      <div class="grade-tips-box">
        <div class="grade-tips-flex">
          <div class="icon">
            <img src="../../assets/image/grade-1.png" alt="" />
          </div>
          <div class="text">提现返利金</div>
        </div>

        <div class="grade-tips-flex">
          <div class="icon">
            <img src="../../assets/image/grade-2.png" alt="" />
          </div>
          <div class="text">邀请粉丝赚钱</div>
        </div>

        <div class="grade-tips-flex">
          <div class="icon">
            <img src="../../assets/image/grade-3.png" alt="" />
          </div>
          <div class="text">参与福利活动</div>
        </div>

        <div class="grade-tips-flex">
          <div class="icon">
            <img src="../../assets/image/grade-4.png" alt="" />
          </div>
          <div class="text">购物享返利</div>
        </div>
        <div class="grade-tips-flex">
          <div class="icon">
            <img src="../../assets/image/grade-5.png" alt="" />
          </div>
          <div class="text">普查随机红包</div>
        </div>
      </div>
    </div>

    <div class="grade-content">
      <div class="grade-box yes">
        <div class="grade-box-title">
          LV.1普通会员
          <div class="status">已解锁</div>
        </div>
        <div class="grade-box-info">
          <p>解锁条件：扫码关注，即可成功会员</p>
          <div class="grade-text">可享受权益</div>
          <ul class="grade-ul">
            <li class="grade-item">会员基础权益</li>
          </ul>
        </div>
      </div>
      <div class="grade-box" :class="{ yes: userInfo.level >= 2 }">
        <div class="grade-box-title">
          LV.2VIP会员
          <div class="status" v-if="userInfo.level >= 2">已解锁</div>
          <div class="status" @click="openQrcode" v-else>
            立即解锁
          </div>
        </div>
        <div class="grade-box-info">
          <p>解锁条件：邀请 5 个粉丝完成首次查询</p>
          <div class="grade-text">可享受权益</div>
          <ul class="grade-ul">
            <li class="grade-item">会员基础权益</li>
            <li class="grade-item">
              享一级粉丝奖励 {{ data2[1] * 100 || 0 }}%的提成
            </li>
            <li class="grade-item">自购奖励加成 {{ data2[0] * 100 || 0 }}%</li>
            <li class="grade-item">
              享二级粉丝奖励 {{ data2[2] * 100 || 0 }}%的提成
            </li>
          </ul>
        </div>
      </div>
      <div class="grade-box" :class="{ yes: userInfo.level >= 3 }">
        <div class="grade-box-title">
          LV.3会员代理
          <div class="status" v-if="userInfo.level >= 2">已解锁</div>
          <div class="status" @click="openQrcode" v-else>
            立即解锁
          </div>
        </div>
        <div class="grade-box-info">
          <p>解锁条件：邀请 10 个粉丝完成首次查询</p>
          <div class="grade-text">可享受权益</div>
          <ul class="grade-ul">
            <li class="grade-item">会员基础权益</li>
            <li class="grade-item">
              享一级粉丝奖励 {{ data3[1] * 100 || 0 }}%的提成
            </li>
            <li class="grade-item">自购奖励加成 {{ data3[0] * 100 || 0 }}%</li>
            <li class="grade-item">
              享二级粉丝奖励 {{ data3[2] * 100 || 0 }}%的提成
            </li>
          </ul>
        </div>
      </div>
      <div class="grade-box" :class="userInfo.level >= 4 ? 'yes' : 'no'">
        <div class="grade-box-title">
          LV.4超级代理
          <div class="status">
            {{ userInfo.level >= 4 ? "已解锁" : "不可解锁" }}
          </div>
        </div>
        <div class="grade-box-info">
          <p>解锁条件：解锁 LV3 会员代理后可申请</p>
          <p>超级代理接受所有会员代理申请，人工审核完成后可解锁</p>
          <div class="grade-text">可享受权益</div>
          <ul class="grade-ul">
            <li class="grade-item">会员基础权益</li>
            <li class="grade-item">自购奖励加成 {{ data4[0] * 100 || 0 }}%</li>
            <li class="grade-item">
              享一级粉丝奖励 {{ data4[1] * 100 || 0 }}%的提成
            </li>
            <li class="grade-item">
              享二级粉丝奖励 {{ data4[2] * 100 || 0 }}%的提成
            </li>
            <li class="grade-item">让你的微信账号具备查询机器人的功能</li>
            <li class="grade-item">
              让你的微信好友全部自动转化为一级粉丝，无需邀请
            </li>
            <li class="grade-item">
              不用依赖于{{ $config.wxName }}平台的推广，推广自己即赚钱返利
            </li>
          </ul>
        </div>
      </div>
    </div>

    <canvas-img ref="canvasImg"></canvas-img>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import myHeader from "../my/my-header.vue";
import { getUserInfo, getWalletInfo, getUserConfig } from "@/api/index";
import { Toast } from "vant";
import canvasImg from "../my/canvas-img.vue";
@Component({
  components: {
    "my-header": myHeader,
    "canvas-img": canvasImg
  }
})
export default class GradeDescription extends Vue {
  private userInfo: objAny = {};
  private walletInfo: objAny = {};
  private gradeConfig: objAny = {};
  private data1: number[] = [];
  private data2: number[] = [];
  private data3: number[] = [];
  private data4: number[] = [];

  async getUserInfo() {
    const ret = await getUserInfo({});
    if (ret.code == 0) {
      this.userInfo = ret.data;
    } else {
      Toast(ret.msg);
    }
  }
  async getWalletInfo() {
    const ret = await getWalletInfo({});
    if (ret.code == 0) {
      this.walletInfo = ret.data;
    } else {
      Toast(ret.msg);
    }
  }
  async getUserConfig() {
    const ret = await getUserConfig({});
    if (ret.code == 0) {
      this.gradeConfig = ret.data;
      this.data1 = ret.data["1"];
      this.data2 = ret.data["2"];
      this.data3 = ret.data["3"];
      this.data4 = ret.data["4"];
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
    this.getWalletInfo();
    this.getUserConfig();
  }
}
</script>

<style lang="less">
.grade-tips {
  background-color: #fff;
  padding-top: 0.2rem;
  font-size: 0.28rem;
  .grade-tips-title {
    text-align: center;
    font-size: 0.28rem;
  }
  .grade-tips-box {
    display: flex;
    .grade-tips-title {
      font-size: 0.24rem;
    }
    .grade-tips-flex {
      padding: 0.2rem 0;
      text-align: center;
      flex: 1;
      .icon {
        width: 0.4rem;
        height: 0.4rem;
        margin: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        margin-top: 0.1rem;
        font-size: 0.18rem;
      }
    }
  }
}
.grade-content {
  padding: 0 0.2rem;
  font-size: 0.24rem;
  .grade-box {
    border-radius: 0.2rem;
    overflow: hidden;
    margin-top: 0.2rem;
    .grade-box-title {
      background-color: rgba(255, 0, 0);
      color: #fff;
      padding: 0.1rem 0.2rem;
      .status {
        float: right;
        padding: 0 0.2rem;
        border: 1px solid #fff;
        font-size: 0.18rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border-radius: 0.2rem;
      }
    }
    .grade-box-info {
      background-color: #fff;
      padding: 0.2rem;
      line-height: 0.4rem;
      color: #999;
      font-size: 0.24rem;
      .grade-text {
        margin-top: 0.05rem;
        font-size: 0.28rem;
      }
      .grade-ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.05rem;
        .grade-item {
          padding-left: 0.2rem;
          position: relative;
          width: 50%;
          box-sizing: border-box;
        }
        .grade-item:after {
          content: "";
          position: absolute;
          width: 0.05rem;
          height: 0.05rem;
          border-radius: 50%;
          transform: translateY(-50%);
          background-color: #999;
          left: 0;
          top: 50%;
        }
      }
    }
  }
  .grade-box.yes {
    .grade-box-title {
      background-color: rgba(255, 165, 0);
      .status {
        border: none;
      }
    }
  }
  .grade-box.no {
    .grade-box-title {
      background-color: rgba(170, 170, 170);
      .status {
        border: none;
      }
    }
    .grade-ul {
      .grade-item {
        width: 100%;
      }
    }
  }
}
</style>
