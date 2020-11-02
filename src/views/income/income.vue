<template>
  <div class="my-income">
    <div class="income-header">
      <ul class="header-ul">
        <li
          class="header-item"
          :class="{ active: form.log_type == 1 }"
          @click="itemClick(1)"
        >
          <span>奖金收入</span>
        </li>
        <li
          class="header-item"
          :class="{ active: form.log_type == 2 }"
          @click="itemClick(2)"
        >
          <span>团队收入</span>
        </li>
        <li
          class="header-item"
          :class="{ active: form.log_type == 3 }"
          @click="itemClick(3)"
        >
          <span>其他收入</span>
        </li>
      </ul>
    </div>
    <div class="income-flex">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="income-ul">
          <li class="income-item" v-for="(item, index) in list" :key="index">
            <div class="income-item-info">
              <div>订单：{{ item.order_sn }}</div>
              <div class="time">
                {{ item.c_time }}
              </div>
            </div>
            <div class="income-money">
              <span class="money"> +{{ item.money }} </span>
            </div>
          </li>
          <!-- <li class="income-item" v-for="(item, index) in list" :key="index">
            <div class="income-flex">
              <div class="income-money">{{ item.money }}</div>
              <div class="income-text">收入前:{{ item.before_money }}</div>
              <div class="income-text">收入后:{{ item.after_money }}</div>
            </div>
            <div class="income-time">
              {{ item.c_time }}
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
import { incomeLogs } from "@/api/index";
import { List, Toast } from "vant";
@Component({
  components: {
    [List.name]: List
  }
})
export default class Myincome extends Vue {
  private loading = false;
  private finished = false;

  public list: object[] = [];
  public form: objAny = {
    page: 0,
    page_size: 10,
    log_type: 1
  };
  public itemClick(index: number) {
    this.form.log_type = index;
    this.form.page = 1;
    this.list = [];
    this.finished = true;
    this.incomeLogs();
  }
  async incomeLogs() {
    this.loading = true;
    const ret = await incomeLogs(this.form);
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
  public onLoad() {
    this.form.page++;
    this.incomeLogs();
  }
  mounted() {
    // this.incomeLogs();
  }
}
</script>
<style lang="less">
.my-income {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .income-header {
    width: 100vw;
    height: 12vw;
    background: #fff;
    color: #666;
    .header-ul {
      width: 90%;
      height: 12vw;
      margin-left: 5%;
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
  }
  .income-flex {
    flex: 1;
    padding-top: 1vw;
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
  .income-ul {
    padding: 0 2vw;
    background-color: #fff;
  }
  .income-item {
    height: 14vw;
    background: #fff;
    margin-bottom: 2vw;
    padding: 5vw;
    display: flex;
    .income-item-info {
      flex: 1;
      font-size: 4.2vw;
      height: 100%;
      color: #333;
      .time {
        color: #999;
        margin-top: 2vw;
      }
    }
    .income-money {
      height: 100%;
      font-size: 4.8vw;
      color: #f52724;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    // .income-flex {
    //   flex: 1;
    //   .income-money {
    //     font-size: 6vw;
    //     color: #000;
    //   }
    //   .income-text {
    //     font-size: 3vw;
    //     color: #999;
    //   }
    // }
    // .income-time {
    //   display: flex;
    //   justify-items: center;
    //   align-items: center;
    // }
  }
}
</style>
