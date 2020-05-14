<!--
 * @Author: zgz
 * @Date: 2020-03-31 14:24:33
 * @LastEditTime: 2020-04-20 16:29:45
 * @LastEditors: zgz
 * @Description:按医生统计图文咨询人数
 -->
<template>
  <section class="container">
    <header>
      <div class="title">按医生统计图文咨询人数</div>
      <div class="selectList">
        <div class="item" @click="showSelect('day')">
          <p>昨日&nbsp;</p>
          <div class="jt"></div>
        </div>
        <div class="item" @click="showSelect('form')">
          <p>区域全部医院区域全&nbsp;</p>
          <div class="jt"></div>
        </div>
      </div>
    </header>

    <div class="select" v-if="isShowSelect">
      <div v-if="searchType==='day'">
        <p>昨日</p>
        <p>最近7天</p>
        <p>最近7天</p>
      </div>
      <div v-if="searchType==='form'">
        <p>全部</p>
        <p>其他</p>
        <p>运营A</p>
      </div>
      <div class="btn" v-if="searchType==='day'">
        <p @click="showCalendarDialog('start')">{{startDate}}</p>&nbsp;--&nbsp;
        <p @click="showCalendarDialog('end')">{{endDate}}</p>
        <p class="sub" @click="submitSearch()">确定</p>
      </div>
    </div>

    <section class="charts">
      <chart style="width:100%" ref="chart1" :options="orgOptions" :auto-resize="true"></chart>

      <div class="tt">
        <p class="p1">2020-05-01至2020-05-07</p>
        <p class="p2">
          合计：
          <span>600人</span>
        </p>
      </div>
      <div class="hjTable">
        <table>
          <thead>
            <th>日期</th>
            <th>{{thTitle}}</th>
          </thead>
          <tbody>
            <tr>
              <td>2020-5-04</td>
              <td>100</td>
            </tr>
            <tr>
              <td>2</td>
              <td>200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div @click="isShowSelect=false" class="bg" v-if="isShowSelect"></div>

    <vue-hash-calendar
      ref="picker"
      model="dialog"
      :visible.sync="isShowCalendar"
      :default-datetime="defaultDatetime"
      :is-show-action="true"
      format="YY/MM/DD"
      lang="CN"
      @confirm="dateConfirm"
    ></vue-hash-calendar>
  </section>
</template>

<script>
import axios from "axios";
import prodEnv from "../../config/dev.env";

export default {
  name: "doctorConsultByAsk",
  data() {
    return {
      isShowCalendar: false, // 是否显示弹窗
      defaultDatetime: new Date(),
      dateType: "",
      startDate: "开始时间",
      endDate: "结束时间",
      isShowSelect: false,
      searchType: "",
      orgOptions: {},
      thTitle: ""
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
    console.log(prodEnv);

    this.api();

    this.thTitle = this.$route.params.title;
    this.orgOptions = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        }
      ]
    };
  },
  methods: {
    api() {
      let u = prodEnv.api + "services/report/api/v1/host/yesterdayKPIReport";
      axios
        .post(u, {})
        .then(res => {
          console.log(res);
        })
        .catch(er => {
          console.log(res);
        });
    },
    showCalendarDialog(type) {
      // 显示日历
      this.isShowCalendar = true;
      this.dateType = type;
    },
    dateConfirm(date) {
      // 点击确认按钮触发
      console.log(date, "confirm");
      if (this.dateType === "start") {
        this.startDate = date;
      } else {
        this.endDate = date;
      }
    },
    submitSearch() {
      this.isShowSelect = false;
    },
    showSelect(type) {
      this.isShowSelect = true;
      this.searchType = type;
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
  border-bottom: 2px solid #666666;
  border-right: 2px solid #666666;
  transform: rotate(45deg);
}

header {
  background-color: #fff;
  padding: 2.25rem 1.25rem 1.25rem 1.25rem;
  position: relative;
  z-index: 1;

  .title {
    font-size: 2.25rem;
    color: #333;
    padding-left: 0.625rem;
    border-left: 0.575rem solid #408bf1;
  }
  .selectList {
    margin-top: 2.5rem;
    padding-bottom: 1.25rem;
    display: flex;
    text-align: center;
    .item {
      flex: 1;
      p {
        font-size: 2rem;
        color: #333;
        display: inline-block;
      }
    }
  }
}
.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
}
.select {
  z-index: 1;
  width: 100%;
  position: absolute;
  background-color: #fff;
  border-top: 1px solid #e1e1e1;
  p {
    font-size: 2rem;
    color: #333;
    padding: 2.1875rem;
    border-bottom: 1px solid #e1e1e1;
    &:active {
      background-color: #f0f0f0;
    }
  }
  .btn {
    padding: 0.9375rem;
    color: #999;
    p {
      display: inline-block;
      font-size: 1.75rem;
      color: #999;
      padding: 1.375rem 2.2rem;
      background-color: #eee;
      border: none;
      border-radius: 2.1875rem;
      &:active {
        background-color: rgb(226, 226, 226);
      }
    }
    .sub {
      margin-left: 1.25rem;
      border-radius: 0.625rem;
      color: #fff;
      float: right;
      padding: 1.375rem 3.5rem;
      background: linear-gradient(
        90deg,
        rgba(64, 139, 241, 1),
        rgba(34, 172, 251, 1)
      );
      &:active {
        background: linear-gradient(90deg, rgb(32, 159, 233) rgb(60, 129, 226));
      }
    }
  }
}

.charts {
  margin-top: 1.25rem;
  background-color: #fff;
  padding: 0 1.875rem 1.875rem 1.875rem;

  .tt {
    display: flex;
    p {
      flex: 1;
      color: #999999;
      font-size: 1.75rem;
      span {
        font-size: 2.5rem;
        color: #408bf1;
      }
    }
    .p1 {
      flex: 2;
      line-height: 2.5;
    }
  }

  .hjTable {
    table {
      display: block;
      thead {
        background: rgba(57, 108, 178, 0.1);
        border: none;
        display: flex;
        th {
          flex: 1;
          color: #333;
          font-size: 1.75rem;
          font-weight: 400;
          padding: 1rem;
        }
      }
      tbody {
        display: block;
        tr {
          display: flex;
          border-bottom: 1px solid #e1e1e1;
          text-align: center;
          td {
            flex: 1;
            font-size: 1.75rem;
            color: #666;
            padding: 1.875rem;
            &:nth-child(2) {
              color: #408bf1;
            }
          }
        }
      }
    }
  }
}
</style>
