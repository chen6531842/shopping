<template>
  <div class="my-order">
    <div class="order-header">
      <div class="order-number-info">
        <div class="order-number-flex">
          <div class="number-name">已省钱</div>
          <div class="number">¥{{ userInfo.total_saving | money }}</div>
        </div>
        <div class="order-number-flex tow">
          <div class="number-name">订单数</div>
          <div class="number">{{ walletInfo.order_count || 0 }}</div>
        </div>
        <div class="order-number-flex three">
          <div class="number-name">待返利</div>
          <div class="number">¥{{ walletInfo.unsettled | money }}</div>
        </div>
      </div>
      <div class="my-type">
        您是{{ userInfo.level_text }}，享受标准返利的
        {{ userInfo.self_rate || 0 }}% 加成
      </div>
      <tab-btn @click="tabClick" :active="form.platform"></tab-btn>
      <van-search
        v-model="form.order_sn"
        @search="onSearch"
        placeholder="请输入淘宝/拼多多/京东订单号"
      />
      <ul class="header-ul">
        <li
          class="header-item"
          :class="{ active: form.status == 0 }"
          @click="itemClick(0)"
        >
          <span>已支付</span>
        </li>
        <!-- <li
          class="header-item"
          :class="{ active: form.status == 1 }"
          @click="itemClick(1)"
        >
          <span>未收货</span>
        </li> -->
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
      <!-- <div class="tips-text">
        <p>
          <img src="../../assets/image/tips-1.png" alt="" />
          订单在购物平台上确认收货3天后，奖金才会结算喔
        </p>
        <p>
          <img src="../../assets/image/tips-1.png" alt="" />
          订单已收货但此处显示未收货，请点击刷新按钮更新
        </p>
      </div> -->
    </div>
    <div class="order-flex">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="order-ul">
          <li class="order-li" v-for="(item, index) in list" :key="index">
            <div class="order-info-box">
              <div class="order-li-inline">
                订单状态: {{ statusObj[form.status] }}
              </div>
              <div class="order-li-flex">
                订单编号: {{ item.order_sn }}
                <div class="fu-zhi" @click="copy(item.order_sn)">复制</div>
              </div>
            </div>
            <div class="order-info-box">
              <div class="order-li-inline">{{ item.c_time }}</div>
              <div class="order-li-inline">
                付款金额: ¥{{ item.order_amount }}
              </div>
              <div class="order-li-inline">
                类型:{{ platform[item.platform] }}订单
              </div>
            </div>
            <div class="shpping-info">
              <div class="shpping-img">
                <img :src="item.goods_thumbnail_url" alt="" />
              </div>
              <div class="shpping-flex">
                <div class="info-box">
                  <div class="info-box-div">
                    <div class="name">{{ item.goods_name }}</div>
                    <div class="money-box">
                      <!-- <div class="money-box-flex">
                        标准返利: ¥{{ item.promotion_amount }}
                      </div> -->
                      <div class="money-box-flex" style="text-align: right;">
                        预估返利:
                        <span class="red">¥{{ item.user_award }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- <li class="order-item" v-for="(item, index) in list" :key="index">
            <div class="order-head">
              <div class="order-type">
                <span>{{ platform[item.platform] }}</span>
                订单编号：{{ item.order_sn }}
              </div>
            </div>
            <div class="order-info">
              <div class="order-info-flex">
                <div class="title">
                  {{ item.goods_name }}
                </div>
                <div class="order-status-list">
                  <div class="tag">{{ orderStatus[item.order_status] }}</div>
                </div>
                <div class="order-time">{{ item.order_create_time }}</div>
              </div>
            </div>
            <div class="order-money">
              <div class="od-money">实付金额: ¥{{ item.order_amount }}</div>
              <div class="my-money">奖金:¥{{ item.user_award }}</div>
            </div>
          </li> -->
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
import { getOrderList, getUserInfo, getWalletInfo } from "@/api/index";
import tabBtn from "@/components/tab-btn/tab-btn.vue";
import { List, Toast, Search } from "vant";
@Component({
  components: {
    [List.name]: List,
    [Search.name]: Search,
    "tab-btn": tabBtn
  }
})
export default class MyOrder extends Vue {
  private loading = false;
  private finished = false;
  private platform = {
    jd: "京东",
    tb: "淘宝",
    pdd: "拼多多"
  };
  private active = "tb";
  private statusObj: objAny = {
    "0": "已支付",
    "5": "已结算",
    "4": "已失效"
  };
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
    status: 0,
    platform: "tb",
    order_sn: ""
  };
  public userInfo: objAny = {};
  public walletInfo: objAny = {};
  public copy(text: string) {
    this.$common.copyText(text);
  }
  public onSearch() {
    this.form.page = 1;
    this.list = [];
    this.finished = true;
    this.getOrderList();
  }
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
    const ret = await getOrderList(this.form);
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
  onLoad() {
    this.form.page++;
    this.getOrderList();
  }
  mounted() {
    this.getUserInfo();
    this.getWalletInfo();
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
    .order-number-info {
      padding: 0.1rem;
      display: flex;
      .order-number-flex {
        flex: 1;
        border-radius: 0.1rem;
        color: #fff;
        background-color: rgba(70, 157, 231);
        padding: 0.15rem;
        font-size: 0.28rem;
        text-align: center;
        margin-right: 0.15rem;
        .number {
          margin-top: 0.1rem;
        }
      }
      .tow {
        background-color: rgba(138, 125, 241);
      }
      .three {
        background-color: rgba(239, 123, 124);
      }
      .order-number-flex:last-child {
        margin-right: 0;
      }
    }
    .my-type {
      background-color: rgba(57, 50, 75);
      padding: 0.1rem 0.15rem;
      font-size: 0.24rem;
      line-height: 0.32rem;
      color: #fff;
      border-radius: 0.1rem 0.1rem 0 0;
    }
    .header-ul {
      background: #fff;
      height: 8vw;
      padding: 0 5%;
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
    padding: 0 0.1rem;
    .order-li {
      margin-top: 0.2rem;
      padding: 0.1rem 0.2rem;
      background-color: #fff;
      .order-info-box {
        color: #999;
        font-size: 0.24rem;
        display: flex;
        .order-li-inline {
          flex: 1;
          line-height: 0.4rem;
        }
        .time {
          font-size: 0.28rem;
        }
        .order-li-flex {
          flex: 2;
        }
        .fu-zhi {
          padding: 0 0.1rem;
          border: 1px solid #999;
          border-radius: 0.1rem;
          float: right;
          font-size: 0.18rem;
        }
      }
      .shpping-info {
        display: flex;
        margin-top: 0.2rem;
        color: #333;
        font-size: 0.24rem;
        .shpping-img {
          width: 1.5rem;
          height: 1.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .shpping-flex {
          padding-left: 0.2rem;
          flex: 1;
          .info-box {
            height: 100%;
            display: flex;
            align-items: center;
            justify-items: center;
          }
          .info-box-div {
            width: 100%;
          }
          .money-box {
            width: 100%;
            margin-top: 0.1rem;
            display: flex;
            .money-box-flex {
              flex: 1;
            }
          }
        }
      }
    }
    // .order-item {
    //   margin-top: 2vw;
    //   background-color: #fff;
    //   padding: 2vw 4vw 0 4vw;
    //   .order-head {
    //     display: flex;
    //     font-size: 3.2vw;
    //     color: #333;
    //     border-bottom: 1px solid #eee;
    //     padding-bottom: 2vw;
    //     .order-type {
    //       flex: 1;
    //       span {
    //         background: rgba(216, 0, 0);
    //         color: #fff;
    //         font-size: 1vw;
    //         display: inline-block;
    //         padding: 0.5vw 1vw;
    //         border-radius: 0.5vw;
    //         line-height: 2.5vw;
    //         font-size: 2.5vw;
    //         vertical-align: text-top;
    //       }
    //     }
    //   }
    //   .order-info {
    //     padding: 2vw 0;
    //     border-bottom: 1px solid #eee;
    //     display: flex;
    //     .order-img {
    //       width: 2vw;
    //       height: 2vw;
    //     }
    //     .order-info-flex {
    //       flex: 1;
    //     }
    //     .title {
    //       font-size: 3.2vw;
    //       line-height: 4vw;
    //       overflow: hidden;
    //       text-overflow: ellipsis;
    //       white-space: nowrap;
    //       color: #333;
    //     }
    //     .order-status-list {
    //       margin-top: 2vw;
    //       margin-bottom: 4vw;
    //       height: 5vw;
    //       .tag {
    //         padding: 0 2vw;
    //         height: 4.8vw;
    //         font-size: 3vw;
    //         color: #fff;
    //         display: inline-block;
    //         vertical-align: top;
    //         line-height: 4.8vw;
    //         text-align: center;
    //         border-radius: 2.4vw;
    //         background: #ff8400;
    //         margin-right: 2vw;
    //       }
    //     }
    //     .order-time {
    //       font-size: 3.2vw;
    //       line-height: 4vw;
    //       color: #333;
    //     }
    //   }
    //   .order-money {
    //     display: flex;
    //     .od-money,
    //     .my-money {
    //       flex: 1;
    //       font-size: 3.2vw;
    //       line-height: 8vw;
    //     }
    //     .my-money {
    //       text-align: right;
    //     }
    //   }
    // }
  }
}
</style>
