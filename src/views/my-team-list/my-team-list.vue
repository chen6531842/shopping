<template>
  <div class="my-team">
    <div class="my-team-header">
      <div class="header-bg">
        <div class="my-info">
          <div class="my-img">
            <img :src="userInfo.avatar" alt="" />
          </div>
          <div class="my-info-flex">
            {{ userInfo.level == "1" ? "付费会员" : "普通用户" }}
          </div>
          <div class="btn-yao-div">
            <button class="btn-yao" @click="openQrcode">邀请好友</button>
          </div>
        </div>
        <div class="flex-list">
          <div class="flex-item">
            <div>粉丝共(人)</div>
            <div class="number">{{ teamSummary.child_count || 0 }}</div>
          </div>
          <div class="flex-item">
            <div>累计赚(元)</div>
            <div class="number">{{ teamSummary.total_income || 0 }}</div>
          </div>
          <div class="flex-item">
            <div>本月赚(元)</div>
            <div class="number">{{ teamSummary.monthly_income || 0 }}</div>
          </div>
          <div class="flex-item">
            <div>累计有(单)</div>
            <div class="number">{{ teamSummary.team_order_count || 0 }}</div>
          </div>
          <div class="flex-item">
            <div>本月有(单)</div>
            <div class="number">
              {{ teamSummary.monthly_team_order_count || 0 }}
            </div>
          </div>
        </div>
        <div class="other-info">
          <div class="other-info-flex">
            <div>一级好友</div>
            <div class="number">{{ teamSummary.first_child_count || 0 }}</div>
          </div>
          <div class="other-info-flex">
            <div>享奖励</div>
            <div class="number">{{ teamSummary.first_child_rate || 0 }}%</div>
          </div>
          <div class="other-info-flex">
            <div>二级好友</div>
            <div class="number">{{ teamSummary.second_child_count || 0 }}</div>
          </div>
          <div class="other-info-flex">
            <div>享奖励</div>
            <div class="number">{{ teamSummary.second_child_rate || 0 }}%</div>
          </div>
          <div class="other-info-flex">
            <button class="btn-yao">奖励翻倍</button>
          </div>
        </div>
      </div>

      <div class="tips">
        由于二级粉丝非您的直系好友，暂只显示一级粉丝信息，望周知
      </div>
      <!-- <div class="tab-box">
        <div
          class="tab-div"
          :class="{ active: form.type == 1 }"
          @click="typeClick(1)"
        >
          按订单数量
        </div>
        <div
          class="tab-div"
          :class="{ active: form.type == 2 }"
          @click="typeClick(2)"
        >
          按邀请时间
        </div>
      </div> -->
    </div>
    <div class="my-team-flex">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="team-ul" v-for="(item, index) in list" :key="index">
          <li class="team-item">
            <div class="team-icon">
              <img :src="item.avatar" alt="" />
            </div>
            <div class="flex">
              <div class="name">{{ item.name }}</div>
              <div class="time">{{ item.c_time }}</div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
    <canvas-img ref="canvasImg"></canvas-img>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { getUserMyTeam, getUserInfo, getTeamSummary } from "@/api/index";
import { List, Toast } from "vant";
import canvasImg from "@/views/my/canvas-img.vue";
// import { getUserInfo, getWalletInfo } from "@/api/index";
@Component({
  components: {
    [List.name]: List,
    "canvas-img": canvasImg
  }
})
export default class MyTeam extends Vue {
  private active = 0;
  private userInfo: objAny = {};
  private teamSummary: objAny = {};

  public itemClick(index: number) {
    this.active = index;
  }
  public form: objAny = {
    page: 0,
    page_size: 10,
    type: 1
  };
  openQrcode() {
    const canvasImg: objAny = this.$refs.canvasImg;
    canvasImg.open(this.userInfo);
  }
  private loading = false;
  private finished = false;
  public list: object[] = [];
  async getUserInfo() {
    const ret = await getUserInfo({});
    if (ret.code == 0) {
      this.userInfo = ret.data;
    } else {
      Toast(ret.msg);
    }
  }
  async getTeamSummary() {
    const ret = await getTeamSummary({});
    if (ret.code == 0) {
      this.teamSummary = ret.data;
    } else {
      Toast(ret.msg);
    }
  }
  public typeClick(type: number) {
    this.form.type = type;
    this.finished = false;
    this.list = [];
    this.form.page = 1;
    this.getUserMyTeam();
  }
  async getUserMyTeam() {
    this.loading = true;
    const ret = await getUserMyTeam(this.form);
    if (ret.code == 0) {
      this.list = this.list.concat(ret.data.rows);
      if (ret.data.total_rows >= ret.data.page || ret.data.total_page == 0) {
        this.finished = true;
      }
    } else {
      this.finished = true;
      Toast(ret.msg);
    }
    this.loading = false;
  }

  onLoad() {
    this.form.page++;
    this.getUserMyTeam();
  }
  mounted() {
    this.getUserInfo();
    this.getTeamSummary();
  }
}
</script>
<style lang="less">
.my-team {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .my-team-header {
    .header-bg {
      position: relative;
      background: rgba(234, 104, 106);
      font-size: 0.28rem;
      color: #fff;
      padding-bottom: 0.8rem;
      .my-info {
        display: flex;
        padding: 0.2rem;
        .my-img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          background-color: #fff;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .my-info-flex {
          flex: 1;
          line-height: 0.8rem;
          padding-left: 0.2rem;
        }
        .btn-yao-div {
          display: flex;
          align-items: center;
        }
      }
      .flex-list {
        display: flex;
        text-align: center;
        font-size: 0.24rem;
        line-height: 0.32rem;
        .flex-item {
          flex: 1;
          .number {
            margin-top: 0.1rem;
          }
        }
      }
    }
  }
  .other-info {
    position: absolute;
    bottom: -0.5rem;
    font-size: 0.24rem;
    line-height: 0.36rem;
    width: 94%;
    left: 3%;
    background: rgba(46, 47, 65);
    border-radius: 0.2rem;
    color: #fff;
    padding: 0.2rem 0;
    display: flex;
    text-align: center;
    .other-info-flex {
      flex: 1;
    }
  }
  .tips {
    line-height: 0.36rem;
    font-size: 0.24rem;
    color: #999;
    text-align: center;
    margin-top: 0.6rem;
  }
  .tab-box {
    margin-top: 0.3rem;
    text-align: center;
    height: 0.5rem;
    .tab-div {
      width: 1.8rem;
      text-align: center;
      color: #fff;
      background-color: #999;
      font-size: 0.24rem;
      padding: 0.08rem 0;
      display: inline-block;
      vertical-align: top;
      margin-right: 0.2rem;
      border-radius: 0.4rem;
    }
    .tab-div:last-child {
      margin-right: 0;
    }
    .tab-div.active {
      background: rgba(234, 104, 106);
    }
  }
  .btn-yao {
    border: 1px solid #fff;
    border-radius: 0.4rem;
    font-size: 0.24rem;
    line-height: 0.36rem;
    padding: 0 0.1rem;
    background: transparent;
  }
  .my-team-flex {
    flex: 1;
    position: relative;
    .team-ul {
      background-color: #fff;
      .team-item {
        display: flex;
        padding: 4vw;
        border-bottom: 1px solid #eee;
        .team-icon {
          width: 10vw;
          height: 10vw;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            vertical-align: top;
          }
        }
        .flex {
          flex: 1;
          padding-left: 2vw;
          .name {
            margin-bottom: 1.6vw;
            font-size: 4vw;
            color: #333;
          }
          .time {
            font-size: 3.2vw;
            font-family: PingFangSC-Regular;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
