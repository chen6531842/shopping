<template>
  <div class="my-order">
    <div class="order-header">
      <ul class="header-ul">
        <li
          class="header-item"
          :class="{ active: form.status == 0 }"
          @click="itemClick(0)"
        >
          <span>所有订单</span>
        </li>
        <li
          class="header-item"
          :class="{ active: form.status == 1 }"
          @click="itemClick(1)"
        >
          <span>未收货</span>
        </li>
        <li
          class="header-item"
          :class="{ active: form.status == 2 }"
          @click="itemClick(2)"
        >
          <span>结算中</span>
        </li>
        <li
          class="header-item"
          :class="{ active: form.status == 3 }"
          @click="itemClick(3)"
        >
          <span>已结算</span>
        </li>
      </ul>
      <div class="tips-text">
        <p>
          <img src="../../assets/image/tips-1.png" alt="" />
          订单在购物平台上确认收货3天后，奖金才会结算喔
        </p>
        <p>
          <img src="../../assets/image/tips-1.png" alt="" />
          订单已收货但此处显示未收货，请点击刷新按钮更新
        </p>
      </div>
    </div>
    <div class="order-flex">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="order-ul">
          <li class="order-item">
            <div class="order-head">
              <div class="order-type">
                <span>京东</span>
                订单编号：134153288683
              </div>
            </div>
            <div class="order-info">
              <div class="title">
                F.L 超大号鼠标垫 高灵敏可水洗锁边加厚键盘鼠标垫超大
                游戏动漫办公精品 机器猫800*300
              </div>
              <div class="order-status-list">
                <div class="tag">未收货</div>
              </div>
              <div class="order-time">2020-02-11</div>
            </div>
            <div class="order-money">
              <div class="od-money">实付金额: 12.9</div>
              <div class="my-money">奖金:¥0.05</div>
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
import { getOrderList } from "@/api/index";
import { List, Toast } from "vant";
@Component({
  components: {
    [List.name]: List
  }
})
export default class MyOrder extends Vue {
  private loading = false;
  private finished = false;

  public list: object[] = [];
  public form: objAny = {
    page: 1,
    page_size: 10,
    status: 0
  };
  public itemClick(index: number) {
    this.form.log_type = index;
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
      if (ret.data.total_rows >= ret.data.page) {
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
      height: 12vw;
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
          font-size: 4vw;
        }
      }
      .header-item.active {
        color: #000 !important;
        border-bottom: 2px solid #f52724;
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
          .tag {
            width: 12vw;
            height: 4.8vw;
            font-size: 3vw;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
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
