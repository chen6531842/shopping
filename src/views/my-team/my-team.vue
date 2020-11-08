<template>
  <div class="my-team">
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
import { getUserMyTeam } from "@/api/index";
import { List, Toast } from "vant";
@Component({
  components: {
    [List.name]: List
  }
})
export default class MyTeam extends Vue {
  private active = 0;
  public itemClick(index: number) {
    this.active = index;
  }
  public form: objAny = {
    page: 0,
    page_size: 10
  };
  private loading = false;
  private finished = false;
  public list: object[] = [];

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
}
</script>
<style lang="less">
.my-team {
  height: 100vh;
  display: flex;
  flex-direction: column;

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
