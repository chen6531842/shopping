<template>
  <div class="my-deposit">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="deposit-ul" v-for="(item, index) in list" :key="index">
        <li class="deposit-item">
          <div class="deposit-icon">
            <img src="../../assets/image/pay.png" alt="" />
          </div>
          <div class="flex">
            <div class="money">{{ item.money }}元</div>
            <div class="time">{{ item.c_time }}</div>
          </div>
          <div class="status" :class="{ yes: item.status == 1 }">
            {{ item.status == 0 ? "处理中" : "已处理" }}
          </div>
        </li>
      </ul>
    </van-list>
    <!-- <div class="no-data">暂无更多数据</div> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { withdrawLogs } from "@/api/index";
import { List, Toast } from "vant";
@Component({
  components: {
    [List.name]: List
  }
})
export default class MyDeposit extends Vue {
  public form: objAny = {
    page: 0,
    page_size: 10
  };
  private loading = false;
  private finished = false;
  public list: object[] = [];

  async incomeLogs() {
    this.loading = true;
    const ret = await withdrawLogs(this.form);
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
    this.incomeLogs();
  }
}
</script>
<style lang="less">
.my-deposit {
  height: 100vh;
  .deposit-ul {
    padding: 0 2vw;
    background-color: #fff;
  }
  .deposit-item {
    display: flex;
    padding: 3vw 2vw;
    border-bottom: 1px solid #eee;

    .deposit-icon img {
      width: 10vw;
      height: 10vw;
    }
    .flex {
      flex: 1;
      padding-left: 2vw;
      .money {
        font-size: 6vw;
        color: #000;
      }
      .time {
        font-size: 4vw;
        color: #999;
      }
    }
    .status {
      font-size: 4vw;
      color: #999;
      display: flex;
      justify-items: center;
      align-items: center;
    }
    .status.yes {
      font-size: 4vw;
      color: #00aaef;
    }
  }
}
</style>
