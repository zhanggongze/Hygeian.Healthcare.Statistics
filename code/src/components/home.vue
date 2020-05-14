<!--
 * @Author: zgz
 * @Date: 2020-03-31 14:24:33
 * @LastEditTime: 2020-04-20 16:29:45
 * @LastEditors: zgz
 * @Description: file conten
 -->
<template>
  <section class="container">
    <div class="itemsList">
      <div class="item" @click="toDoctorConsultByAsk('新增注册数')">
        <div class="iL">
          <div class="ft">
            <p class="p1">{{yesterdayCreated}}</p>
            <p class="p2" :class="compare>0 ? 'up' : 'down' ">较前日{{compare}}</p>
          </div>
          <div class="tt">
            <span>新增注册数</span>
          </div>
        </div>
        <div class="iR">
          <div class="jt"></div>
        </div>
      </div>

      <div class="item" @click="toDoctorConsultByAsk('新增建档数')">
        <div class="iL">
          <div class="ft">
            <p class="p1">{{hYesterdayCreated}}</p>
            <p class="p2" :class="hCompare<=0 ? 'down' : 'up' ">较前日{{hCompare}}</p>
          </div>
          <div class="tt">
            <span>新增建档数</span>
          </div>
        </div>
        <div class="iR">
          <div class="jt"></div>
        </div>
      </div>

      <div class="item" @click="toDoctorConsultByAsk('累计注册数')">
        <div class="iL">
          <div class="ft">
            <p class="p1">{{totalCreated}}</p>
            <!-- <p class="p2 up">较前日+12</p> -->
          </div>
          <div class="tt">
            <span>累计注册数</span>
          </div>
        </div>
        <div class="iR">
          <div class="jt"></div>
        </div>
      </div>

      <div class="item" @click="toDoctorConsultByAsk('累计建档数')">
        <div class="iL">
          <div class="ft">
            <p class="p1">{{hTotalCreated}}</p>
            <!-- <p class="p2 down">较前日-12</p> -->
          </div>
          <div class="tt">
            <span>累计建档数</span>
          </div>
        </div>
        <div class="iR">
          <div class="jt"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import prodEnv from "../../config/dev.env";

export default {
  name: "home",
  data() {
    return {
      data: "",
      yesterdayCreated: "",
      totalCreated: "",
      theDayFeforeYesterdayCreated: "",
      compare: "",

      hTheDayFeforeYesterdayCreated: "",
      hTotalCreated: "",
      hYesterdayCreated: "",
      hCompare: ""
    };
  },
  filters: {
    evaluatePipe: function(val) {
      let o = {
        "0": "",
        "10": "",
        "20": "!",
        "30": "↑",
        "40": "↓"
      };
      return o[val];
    }
  },
  created: function() {},
  onLoad(options) {},
  mounted() {
    this.api();
  },
  methods: {
    api() {
      let u = prodEnv.api + "services/report/api/v1/host/yesterdayKPIReport";
      axios
        .post(u, {})
        .then(res => {
          let item = res.data;

          this.yesterdayCreated = item.customerReport.yesterdayCreated;
          this.totalCreated = item.customerReport.totalCreated;
          this.theDayFeforeYesterdayCreated =
            item.customerReport.theDayFeforeYesterdayCreated;
          this.compare =
            this.yesterdayCreated - this.theDayFeforeYesterdayCreated;

          this.hTheDayFeforeYesterdayCreated =
            item.healthRecordReport.theDayFeforeYesterdayCreated;
          this.hTotalCreated = item.healthRecordReport.totalCreated;
          this.hYesterdayCreated = item.healthRecordReport.yesterdayCreated;
          this.hCompare =
            this.hYesterdayCreated - this.hTheDayFeforeYesterdayCreated;
        })
        .catch(er => {
          console.log(er);
        });
    },
    aFn() {
      console.log(123);
    },
    toDoctorConsultByAsk(mod) {
      let u = "/doctorConsultByAsk/" + mod;
      this.$router.push({ path: u });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// css
.jt {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  border-top: 2px solid #666666;
  border-right: 2px solid #666666;
  transform: rotate(45deg);
}

.itemsList {
  padding: 1.875rem;

  .item {
    width: 100%;
    height: 10rem;
    display: flex;
    margin-bottom: 1.875rem;
    background-color: #fff;
    justify-content: center;
    align-items: center;

    .iL {
      flex: 3;
      padding-left: 1.875rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .ft {
        flex: 2;
        text-align: center;
        border-right: 1px solid #e1e1e1;
        .p1 {
          color: #333;
          font-size: 3rem;
        }
        .p2 {
          font-size: 1.625rem;
        }
        .up {
          color: #00ce9e;
        }
        .down {
          color: #999;
        }
      }
      .tt {
        text-align: center;
        flex: 3;
      }

      span {
        font-size: 2rem;
        color: #333;
      }
    }

    .iR {
      padding-right: 1.875rem;
      text-align: right;
      flex: 1;
    }

    &:active {
      background-color: #f5f5f5;

      .iL {
        span {
          color: #666;
        }
      }
    }
  }
}
</style>
