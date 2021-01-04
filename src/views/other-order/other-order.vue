<template>
  <div class="my-order">
    <div class="order-header">
      <tab-btn @click="tabClick" :active="form.platform"></tab-btn>
      <!-- <ul class="header-ul">
        <li
          class="header-item"
          :class="{ active: form.status == 2 }"
          @click="itemClick(2)"
        >
          <span>待结算</span>
        </li>
        <li
          class="header-item"
          :class="{ active: form.status == 4 }"
          @click="itemClick(4)"
        >
          <span>已失效</span>
        </li>
      </ul> -->
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
                订单状态:
                {{
                  statusObj[item.order_status]
                    ? statusObj[item.order_status]
                    : "无效"
                }}
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
                        获得粉丝奖金:
                        <span class="red">¥{{ item.estimated_award }}</span>
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
          </li> -->
        </ul>
      </van-list>
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
  private statusObj: objAny = {
    "0": "已支付",
    "5": "已结算"
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
    status: 2,
    platform: "tb"
  };
  public tabClick(active: string) {
    this.form.platform = active;
    this.form.page = 1;
    this.list = [];
    this.finished = true;
    this.getOrderList();
  }
  public copy(text: string) {
    this.$common.copyText(text);
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
    // const form: objAny = JSON.parse(JSON.stringify(this.form));
    // form.status = this.form.status == 2 ? "0,1,2,3" : 5;

    const ret = await getTeamList(this.form);
    if (ret.code == 0) {
      this.list = this.list.concat(ret.data.rows);
      if (this.form.page >= ret.data.total_page || ret.data.total_page == 0) {
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
        color: #f48220 !important;
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
    //         background: #f48220;
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
