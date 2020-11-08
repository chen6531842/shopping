<template>
  <div class="my-order">
    <div class="order-header">
      <tab-btn @click="tabClick" :active="form.platform"></tab-btn>
      <ul class="header-ul">
        <li
          class="header-item"
          :class="{ active: form.status == 5 }"
          @click="itemClick(5)"
        >
          <span>已结算</span>
        </li>
        <li
          class="header-item"
          :class="{ active: form.status == 4 }"
          @click="itemClick(4)"
        >
          <span>已失效</span>
        </li>
      </ul>
    </div>
    <div class="order-flex">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="order-ul">
          <li class="order-item" v-for="(item, index) in list" :key="index">
            <div class="order-head">
              <div class="order-type">
                <span>{{ platform[item.platform] }}</span>
                订单编号：{{ item.order_sn }}
              </div>
            </div>
            <div class="order-info">
              <div class="title">
                {{ item.goods_name }}
              </div>
              <div class="order-status-list">
                <div class="tag">{{ orderStatus[item.order_status] }}</div>
              </div>
              <div class="order-time">{{ item.order_create_time }}</div>
            </div>
            <div class="order-money">
              <div class="od-money">实付金额: ¥{{ item.order_amount }}</div>
              <div class="my-money">奖金:¥{{ item.user_award }}</div>
            </div>
          </li>
        </ul>
      </van-list>
      <!-- <div class="no-data">
        <img src="../../assets/image/no-data.png" alt="" />
        <p>空空如也~</p>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { getTeamList } from "@/api/index";
import tabBtn from "@/components/tab-btn/tab-btn.vue";
import { List, Toast } from "vant";
@Component({
  components: {
    [List.name]: List,
    "tab-btn": tabBtn
  }
})
export default class MyOtherOrder extends Vue {
  private loading = false;
  private finished = false;
  private platform = {
    jd: "京东",
    tb: "淘宝",
    pdd: "拼多多"
  };
  private active = "tb";
  private orderStatus: objAny = {
    "-1": "已支付",
    "0": "已支付",
    "1": "已成团",
    "2": "确认收货",
    "3": "审核成功",
    "4": "审核失败",
    "5": "已经结算",
    "8": "非多多进宝商品",
    "9": "已处罚"
  };
  public list: object[] = [];
  public form: objAny = {
    page: 0,
    page_size: 10,
    status: 5,
    platform: "tb"
  };
  public tabClick(active: string) {
    this.form.platform = active;
    this.form.page = 1;
    this.list = [];
    this.finished = true;
    this.getOrderList();
  }
  public itemClick(index: number) {
    this.form.status = index;
    this.form.page = 1;
    this.list = [];
    this.finished = true;
    this.getOrderList();
  }
  async getOrderList() {
    this.loading = true;
    const ret = await getTeamList(this.form);
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
    this.getOrderList();
  }
  mounted() {
    // this.getOrderList();
  }
}
</script>
<style lang="less">
.my-order {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .order-header {
    width: 100vw;
    color: #666;

    .header-ul {
      background: #fff;
      height: 8vw;
      padding: 0 20%;
      display: flex;
      justify-content: space-between;
      .header-item {
        background: #fff;
        margin-bottom: 2vw;
        height: 100%;
        padding: 0;
        width: 18vw;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          position: absolute;
          display: inline-block;
          height: 6vw;
          line-height: 6vw;
          text-align: center;
          font-size: 3.3vw;
        }
      }
      .header-item.active {
        color: #f52724 !important;
      }
    }
    .tips-text {
      height: 14vw;
      line-height: 7vw;
      background: #fff7eb;
      color: #ed9d3a;
      font-size: 3.5vw;
      img {
        width: 3.5vw;
        height: 3.5vw;
        margin-right: 2vw;
        margin-left: 4vw;
      }
    }
  }
  .order-flex {
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
  .order-ul {
    .order-item {
      margin-top: 2vw;
      background-color: #fff;
      padding: 2vw 4vw 0 4vw;
      .order-head {
        display: flex;
        font-size: 3.2vw;
        color: #333;
        border-bottom: 1px solid #eee;
        padding-bottom: 2vw;
        .order-type {
          flex: 1;
          span {
            background: rgba(216, 0, 0);
            color: #fff;
            font-size: 1vw;
            display: inline-block;
            padding: 0.5vw 1vw;
            border-radius: 0.5vw;
            line-height: 2.5vw;
            font-size: 2.5vw;
            vertical-align: text-top;
          }
        }
      }
      .order-info {
        padding: 2vw 0;
        border-bottom: 1px solid #eee;
        .title {
          font-size: 3.2vw;
          line-height: 4vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
        }
        .order-status-list {
          margin-top: 2vw;
          margin-bottom: 4vw;
          height: 5vw;
          .tag {
            padding: 0 2vw;
            height: 4.8vw;
            font-size: 3vw;
            color: #fff;
            display: inline-block;
            vertical-align: top;
            line-height: 4.8vw;
            text-align: center;
            border-radius: 2.4vw;
            background: #ff8400;
            margin-right: 2vw;
          }
        }
        .order-time {
          font-size: 3.2vw;
          line-height: 4vw;
          color: #333;
        }
      }
      .order-money {
        display: flex;
        .od-money,
        .my-money {
          flex: 1;
          font-size: 3.2vw;
          line-height: 8vw;
        }
        .my-money {
          text-align: right;
        }
      }
    }
  }
}
</style>
