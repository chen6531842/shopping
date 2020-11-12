<template>
  <div class="problem-list">
    <ul>
      <li
        @click="sanji(index, item)"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item.qu }}
        <img src="../../assets/img/jc_jiantou.png" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class ProblemList extends Vue {
  private list: object[] = [];

  public sanji(index: number, item: objAny) {
    const t: any = this.$route.query.type || "0";
    const type: string = t || "0";
    if (type == "0") {
      if (index == 1) {
        window.location.href = "/swiper/helpSwiperThree.html";
      } else if (index == 2) {
        window.location.href = "/swiper/helpSwiperThree.html";
      } else if (item.an == 3) {
        window.location.href = "/swiper/pdd-type.html";
      } else {
        this.$router.push("/problem-list/details");
        this.$common.save("problem-list-details", item);
      }
    } else {
      this.$router.push("/problem-list/details");
      this.$common.save("problem-list-details", item);
    }
  }
  public getList() {
    const t: any = this.$route.query.type || "0";
    const index: string = t || "0";
    if (index == "0") {
      this.list = [
        {
          qu: "奖金是什么？",
          an:
            '<span style="color:red">奖金是对你每笔购物的奖励</span>，所有奖金累积满1元后可申请提现。（奖金的多少跟商家的优惠力度、实际付款金额和你的会员等级有关）'
        },
        { qu: "如何省钱淘宝的同时再领奖金？", an: "1" },
        { qu: "如何绑定订单号领奖金？", an: "2" },
        {
          qu: "复制口令下单后，为什么奖金没有自动发放？",
          an:
            '复制口令到下单<span style="color:red">间隔时间≤20分钟</span>，可1小时后手动把订单编号发给公众号绑定订单领取奖金。（注意：必须是通过本公众号给你的口令下单的订单才能绑定）<br/>复制本号发的口令后又从你之前的购物车、待付款页面、收藏夹、浏览记录下单<br/>使用了红包之类的抵扣。<br/>淘宝：付款时使用了<span style="color:red">红包抵扣、淘金币、集分宝、农村淘宝</span>等。<br/>拼多多：付款使用了<span style="color:red">红包抵扣</span>等。<br/>京东：付款时使用了<span style="color:red">红包抵扣、京豆、礼品卡、E卡、京东账户余额</span>等。<br/>解决方法：申请退款重新复制优惠下单；非以上原因，可联系客服协助解决。'
        },
        //{qu:'复制口令下单后，为什么奖金没有自动发放？',an:'复制公众号给你的优惠口令去淘宝，<span style="color:red">超过20分钟未付款</span>，系统则无法自动发放奖金。解决方法：付款后，把订单号发给公众号绑定拿奖金。注意：必须是通过本公众号给你的口令下单的订单才能绑定。'},
        {
          qu: "下单后发的奖金去哪查看？",
          an:
            '在公众号菜单【<span style="color:red">个人中心</span>】—【<span style="color:red">我的钱包</span>】查看，下单后的奖金会累计到<span style="color:red">待结算奖金</span>中，确认收货3天后变为<span style="color:red">已结算金额</span>即可提现。'
        },
        {
          qu: "奖金为什么付款前后不一样",
          an:
            '天猫国际商品商家保税，但是计算返现奖金单的时候不保税，按照税后价计算；付款时使用了<span style="color:red">红包抵扣</span>也会造成奖金减半或丢失；'
        },
        {
          qu: "所有的商品都有奖金么？",
          an:
            '不是所有的商品都有奖金，但是如果有奖金，公众号一定能够查得出来，淘宝<span style="color:red">90%</span>的商品都有奖金~'
        },
        {
          qu: "一次买多个商品怎么做？",
          an:
            "若要买的商品已加入购物车,请清空购物车,清空后把每个商品的淘口令发给公众号,复制新的优惠口令,再一一加入购物车,最后一起付款。切记,因淘宝官方规定，自主加入购物车的订单是没有奖金的，因此请亲们往后每次复制口令加入购物车。"
        },
        {
          qu: "奖金为什么会冻结1-3天?",
          an:
            "为了避免不良用户领取奖金后，又申请退款，从中盗刷奖金，所以奖金均会冻结1-3天，1-3天后即自动解冻转为可提现奖金。"
        },
        {
          qu: "什么是会员奖励？",
          an:
            '免费升级为公众号的会员后，每次省钱淘宝购物，均可获得<span style="color:red">额外奖励</span>，即会员奖金。具体会员奖金比例介绍，请返回帮助中心查看会员相关问题。<br/>每笔订单获得的奖金=【<span style="color:red">奖金</span>】+【<span style="color:red">会员奖励</span>】'
        },
        {
          qu: "获得拼多多奖励规避方式?",
          an: "3"
        }
      ];
    } else if (index == "1") {
      this.list = [
        {
          qu: "奖金提现到账时间？",
          an:
            '到账时间为申请提现后<span style="color:red">24小时</span>内左右，系统自动打款，请注意查收。'
        },
        {
          qu: "填写支付宝账号后无法点击提交",
          an:
            '因手机号段，如<span style="color:red">188/126</span>等比较少见，若无法提交，可填写你的邮箱支付宝账号，如果依然无法提交，可以联系人工客服解决。'
        },
        {
          qu: "收到提现成功消息，为什么支付宝账单没有这笔金额？",
          an:
            '原因可能是，你填写的手机支付宝账号绑定了<span style="color:red">多个支付宝</span>。可打开支付宝APP退出现有账号，手机号直接登录支付宝查看。找到奖金后，建议你<span style="color:red">更换</span>提现支付宝账号为你的常用的邮箱支付宝账号，如果该笔奖金未找到，可联系人工客服协助解决。'
        },
        {
          qu: "为什么提现打款失败？",
          an:
            '原因可能是，你提现填写的支付宝账号和姓名<span style="color:red">不一致</span>，或者姓名<span style="color:red">非实名</span>。请检查你的收款账号是否正确，如错误，请重新填写。'
        },
        {
          qu: "如何查看奖金是否到账？",
          an:
            '系统打款后，公众号会发送消息提示打款成功，收到消息后，可打开【<span style="color:red">支付宝APP</span>】—【<span style="color:red">我的</span>】—【<span style="color:red">账单</span>】页查看收款明细。<br/>微信：搜索微信官方公众号【微信支付】，查看到账记录，奖金直接到账零钱。'
        }
      ];
    } else if (index == "2") {
      this.list = [
        {
          qu: "如何申请代理？",
          an:
            '发送公众号【<span style="color:red">推广</span>】两个字，获取你的代理专属邀请二维码，你的好友通过你的二维码关注公众号，都会成为你的下级，目前支持<span style="color:red">两级</span>好友提成。如你邀请了好友A关注公众号，A又邀请了好友B关注了公众号，则A是你的一级好友，B是你的二级好友。'
        },
        {
          qu: "代理提成介绍",
          an:
            '通过<span style="color:red">专属邀请二维码</span>，邀请好友通过公众号省钱购物拿到奖金，则代理会获得额外奖金奖励，奖励比例是：A级好友奖金的30%，B级好友奖金的20%。比如，A和B通过公众号省钱每人获得20元奖金，则代理会获得A20*30%+B20*20%=6+4=10元。<span style="color:red">注：该提成属于额外奖励，不影响好友奖励金额</span>。'
        },
        {
          qu: "下级推广的订单如何查看？",
          an:
            '点击公众号底部菜单【<span style="color:red">我的</span>】—【<span style="color:red">个人中心</span>】页面，在【<span style="color:red">订单明细</span>】—【<span style="color:red">1级或2级</span>】订单页面查看下级明细。'
        },
        {
          qu: "代理专属邀请二维码有效期是多少天？",
          an:
            '因微信系统的限制，专属二维码最多有效期是<span style="color:red">30天</span>，过期后重新获取即可。'
        },
        {
          qu: "如何通过商品二维码推广获取佣金？",
          an:
            '本系统<span style="color:red">暂不支持分享</span>商品获取奖金，暂时<span style="color:red">仅支持</span>邀请好友获取奖金。后期会上线商品分销新功能，请注意查看公众号通知。'
        },
        {
          qu: "为什么代理专属二维码无法生成？",
          an:
            '微信账号<span style="color:red">没有设置头像</span>，则会导致获取二维码失败，请上传微信头像重试。注意，因系统缓存问题，如果设置头像后，依然无法获取二维码，请24小时后重试。'
        }
      ];
    }
    //{qu:'',an:''},
    else if (index == "3") {
      this.list = [
        {
          qu: "如何成为会员？",
          an:
            '通过公众号省钱<span style="color:red">下单且收货</span>≥1单即可免费成为会员。'
        },
        {
          qu: "如何升级会员？",
          an:
            "每次淘宝/拼多多/京东付款前，通过公众号省钱下单免费升级会员（省钱的订单在APP确认收货即可升级）。每次升级系统均会提示升级状态，请注意查看。"
        },
        {
          qu: "会员有什么福利？",
          an:
            '成为会员后，每次省钱购物，在现有奖金基础上，均可获得<span style="color:red">额外奖励金</span>，即会员奖金。不同等级的会员奖金不一样，等级越高，额外会员奖金越高。'
        },
        {
          qu: "会员有什么等级？",
          an:
            '目前会员等级分为，普通、青铜、白银、黄金、白金、钻石、至尊、王者<span style="color:red">八大等级</span>。每个大等级分为I、II、III，如青铜I、青铜II，青铜III，具体升级规则，可查看每次升级时系统的提示。'
        }
      ];
    } else if (index == "4") {
      this.list = [
        {
          qu: "为什么订单绑定失败？",
          an:
            '订单绑定失败的原因一般如下：<br/>① <span style="color:red">未复制</span>本号发的优惠口令付款的订单，则绑定失败。<br/>② 复制本号发的口令后<span style="color:red">又从</span>你之前的购物车、待付款页面、收藏夹、浏览记录下单，则绑定失败。<br/>③ 使用了红包之类的抵扣。<span style="color:red">解决方法</span>：申请退款重新复制优惠口令下单；非以上原因，可联系客服协助解决。'
        },
        {
          qu: "为什么已确认收货的订单在个人中心显示未收货？",
          an:
            '在淘宝/拼多多/京东APP<span style="color:red">确认收货付款</span>给卖家10分钟后，在公众号系统的【<span style="color:red">个人中心</span>】内查看该笔订单依然显示未收货，可联系人工客服协助解决。'
        },
        {
          qu: "省钱的订单记录哪里查看？",
          an:
            '点击公众号底部菜单【<span style="color:red">个人中心</span>】—【<span style="color:red">我的订单</span>】页面，查看你的订单明细。'
        },
        {
          qu: "下单后如何查看订单的物流信息？",
          an:
            "打开手机中的淘宝/拼多多/京东购物软件，找到对应的订单就能查看物流信息了"
        }
      ];
    } else if (index == "5") {
      this.list = [
        {
          qu: "为什么会有隐藏券？",
          an:
            '一款产品，销量越高，则该产品在淘宝天猫/拼多多/京东的排名就越好。排名越好才会有更多人来买。<span style="color:red">淘宝天猫/拼多多/京东商家</span>为了提高宝贝销量，往往会设置隐藏券，给<span style="color:red">部分渠道</span>私密使用，消费者正常情况下是看不到的，但是通过公众号查出来。'
        },
        {
          qu: "同1个产品的隐藏券能领取几个？",
          an:
            '正常情况下，一个淘宝天猫/拼多多/京东账号ID<span style="color:red">只能领取1张</span>隐藏券，如想领取多张，可找家人朋友的账号代付款领取。'
        },
        {
          qu: "隐藏券优惠跟店铺优惠券冲突么？",
          an:
            '<span style="color:red">一般不冲突</span>，可以享受店铺折扣的同时享受这个单品的隐藏优惠券。'
        },
        {
          qu: "优惠券为什么显示领取上限？",
          an:
            '领优惠券的时候，提示你优惠券领取上限，表示您已经<span style="color:red">领取过</span>该优惠券了。'
        },
        {
          qu: "淘宝天猫/拼多多/京东所有的产品都有隐藏券么？",
          an:
            '<span style="color:red">不是所有</span>的商品都有隐藏券，但是有隐藏券公众号<span style="color:red">一定</span>能够查的出来。'
        },
        {
          qu: "领券下单又申请退款后，还能领取优惠券么？",
          an:
            '因商家设置的缘故，<span style="color:red">一个淘宝ID只能领取一个</span>，使用过了，有时候则无法领取，建议找家人朋友的淘宝账号领取代为付款即可。'
        },
        {
          qu: "领券购买的产品是次品么？",
          an:
            '淘宝商家设置隐藏优惠券的目的是为了冲刺销量，不会给你发次品的，请放心。如果产品质量有问题，<span style="color:red">可直接联系商家申请售后</span>。'
        },
        {
          qu: "隐藏券会过期么？",
          an:
            '商家设置的隐藏券都是<span style="color:red">限时限量</span>的，领取后未再指定日期内使用，则优惠券就会过期。'
        }
      ];
    }
  }

  mounted() {
    this.getList();
  }
}
</script>
<style lang="less">
.problem-list {
  background-color: #fff;
}
.problem-list ul {
  padding: 0;
  margin: 0;
}
.problem-list ul li {
  width: 90%;
  margin-left: 5%;
  font-size: 3.86vw;
  border-bottom: 1px solid #f4f4f4;
  height: 11.3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2.67vw;
    height: 4.26vw;
  }
}
</style>
