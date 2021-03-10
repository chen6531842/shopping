<template>
  <div class="my-income">
    <div class="income-header" v-if="!$config.ISOEM">
      <div class="income-data">
        <div class="income-data-flex">
          <div class="name">自购省</div>
          <div class="value">¥{{ userInfo.total_saving | money }}</div>
        </div>
        <div class="income-data-flex">
          <div class="name">粉丝为我赚</div>
          <div class="value">¥{{ walletInfo.team_income | money }}</div>
        </div>
      </div>
      <div class="time-select">
        <div class="time-text" @click="timeShow = true">
          {{ form.start_time }} <i class="icon"></i>
        </div>
        <div class="time-text" @click="endTimeShow = true">
          {{ form.end_time }} <i class="icon"></i>
        </div>
      </div>
      <div class="list-title">
        <div class="list-flex">时间</div>
        <div class="money">金额</div>
        <div class="list-flex">内容</div>
      </div>
      <!-- <ul class="header-ul">
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
      </ul> -->
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
            <div class="time">{{ item.c_time }}</div>
            <div class="money">¥{{ item.money }}</div>
            <div class="content-text">{{ item.remark }}</div>
            <!-- <div class="income-item-info">
              <div>订单：{{ item.order_sn }}</div>
              <div class="time">
                {{ item.c_time }}
              </div>
            </div>
            <div class="income-money">
              <span class="money"> +{{ item.money }} </span>
            </div> -->
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
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="startTime"
        type="date"
        title="选择开始时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="startTimeConfirm"
        @cancel="timeShow = false"
      />
    </van-popup>
    <van-popup v-model="endTimeShow" position="bottom">
      <van-datetime-picker
        v-model="endTime"
        type="date"
        title="选择开始时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="endTimeConfirm"
        @cancel="endTimeShow = false"
      />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { incomeLogs, getUserInfo, getWalletInfo } from "@/api/index";
import { List, Toast, DatetimePicker, Popup } from "vant";
@Component({
  components: {
    [List.name]: List,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker
  }
})
export default class Myincome extends Vue {
  private loading = false;
  private finished = false;
  private minDate: Date = new Date(2020, 0, 1);
  private maxDate: Date = new Date();
  private startTime: Date = new Date();
  private endTime: Date = new Date();
  private currentDate = "";
  private timeShow = false;
  private endTimeShow = false;

  public list: object[] = [];
  public form: objAny = {
    page: 0,
    page_size: 10,
    // log_type: 1,
    start_time: "",
    end_time: ""
  };

  private userInfo: objAny = {};
  private walletInfo: objAny = {};
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
      if (this.form.page >= ret.data.total_page || ret.data.total_page == 0) {
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
  public startTimeConfirm(val: string) {
    this.form.start_time = this.$common.userDate(val, "yyyy-MM-dd");
    this.timeShow = false;
    this.form.page = 1;
    this.list = [];
    this.finished = true;
    this.incomeLogs();
  }
  public endTimeConfirm(val: string) {
    this.form.end_time = this.$common.userDate(val, "yyyy-MM-dd");
    this.endTimeShow = false;
    this.form.page = 1;
    this.list = [];
    this.finished = true;
    this.incomeLogs();
  }
  mounted() {
    this.form.start_time = this.$common.thisTimes("yy") + "-01-01";
    this.form.end_time = this.$common.thisTimes("yyyy-MM-dd");
    this.startTime = new Date(this.form.start_time);
    this.endTime = new Date(this.form.end_time);
    this.getUserInfo();
    this.getWalletInfo();
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
    // height: 12vw;
    // background: #fff;
    color: #666;
    .income-data {
      display: flex;
      padding: 0.1rem;
      .income-data-flex {
        padding: 0.2rem;
        border-radius: 0.1rem;
        margin-left: 0.2rem;
        color: #fff;
        background: rgba(240, 189, 123);
        font-size: 0.28rem;
        line-height: 0.36rem;
        flex: 1;
        text-align: center;
        .value {
          margin-top: 0.1rem;
        }
      }
      .income-data-flex:first-child {
        margin-left: 0;
        background: rgba(237, 127, 126);
      }
    }
    .time-select {
      margin-top: 0.2rem;
      background-color: #fff;
      font-size: 0.28rem;
      line-height: 0.6rem;
      display: flex;
      text-align: center;
      .time-text {
        flex: 1;
      }
      .select-text {
        width: 1.8rem;
      }
      .icon {
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 0.08rem solid transparent;
        border-right: 0.08rem solid transparent;
        border-top: 0.16rem solid #666;
        position: relative;
        top: -0.01rem;
      }
    }
    .list-title {
      font-size: 0.32rem;
      line-height: 0.72rem;
      text-align: center;
      display: flex;
      .list-flex {
        flex: 1;
      }
      .money {
        width: 1.5rem;
      }
    }
    // .header-ul {
    //   width: 90%;
    //   height: 12vw;
    //   margin-left: 5%;
    //   display: flex;
    //   justify-content: space-between;
    //   .header-item {
    //     background: #fff;
    //     margin-bottom: 2vw;
    //     height: 100%;
    //     padding: 0;
    //     width: 18vw;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     span {
    //       position: absolute;
    //       display: inline-block;
    //       height: 6vw;
    //       line-height: 6vw;
    //       text-align: center;
    //       font-size: 4vw;
    //     }
    //   }
    //   .header-item.active {
    //     color: #000 !important;
    //     border-bottom: 2px solid #f52724;
    //   }
    // }
  }
  .income-flex {
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
  .income-ul {
    padding: 0 2vw;
    background-color: #fff;
  }
  .income-item {
    display: flex;
    font-size: 0.28rem;
    line-height: 0.6rem;
    text-align: center;
    padding: 0.1rem 0;
    .time,
    .content-text {
      flex: 1;
    }
    .money {
      width: 1.5rem;
    }
    // height: 14vw;
    // background: #fff;
    // margin-bottom: 2vw;
    // padding: 5vw;
    // display: flex;
    // .income-item-info {
    //   flex: 1;
    //   font-size: 4.2vw;
    //   height: 100%;
    //   color: #333;
    //   .time {
    //     color: #999;
    //     margin-top: 2vw;
    //   }
    // }
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
