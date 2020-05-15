<!--
 * @Author: zgz
 * @Date: 2020-03-31 14:24:33
 * @LastEditTime: 2020-04-20 16:29:45
 * @LastEditors: zgz
 * @Description:按医生统计图文咨询人数
 -->
<template>
  <section class="container">
    <section v-if="loading">
      <loading-component></loading-component>
    </section>

    <section v-if="!loading" class="animated fadeIn">
      <header>
        <div class="title">{{thTitle}}</div>
        <div class="selectList">
          <div class="item" @click="showSelect('day')">
            <p>{{dayKey}}&nbsp;</p>
            <div :class="isShowSelect && searchType =='day' ? 'jtD' : 'jt' "></div>
            <!-- <div class="jtD"></div> -->
          </div>
        </div>
      </header>

      <div class="select animated fadeInDown" v-if="isShowSelect">
        <div v-if="searchType==='day'">
          <p @click="apiCustomer(-1,-1)">昨日</p>
          <p @click="apiCustomer(-1,-7)">最近7天</p>
          <p @click="apiCustomer(-1,-30)">最近30天</p>
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
          <p class="p1">{{startDateTime}}至{{endDateTime}}</p>
          <p class="p2" v-if="thTitle!='累计建档数'">
            合计：
            <span>{{totalCount}}人</span>
          </p>
        </div>
        <div class="hjTable">
          <table>
            <thead>
              <th>日期</th>
              <th>{{thTitle}}</th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in dailyDatasItems" :key="index">
                <td>{{item.date}}</td>
                <td v-if="thTitle!='累计建档数'">{{item.count}}</td>
                <td v-if="thTitle=='累计建档数'">{{item.cumulativeCount}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div @click="isShowSelect=false" class="bg" v-if="isShowSelect"></div>
    </section>

    <vue-hash-calendar
      ref="picker"
      model="dialog"
      :visible.sync="isShowCalendar"
      :default-datetime="defaultDatetime"
      :is-show-action="true"
      format="YY-MM-DD"
      lang="CN"
      @confirm="dateConfirm"
    ></vue-hash-calendar>
  </section>
</template>

<script>
export default {
  name: "reportComponent",
  data() {
    return {
      loading: false,
      isShowCalendar: false, // 是否显示弹窗
      defaultDatetime: new Date(),
      dateType: "",
      startDate: "开始时间",
      endDate: "结束时间",
      isShowSelect: false,
      referralItems: [],
      dailyDatasItems: [],
      startDateTime: "",
      endDateTime: "",
      totalCount: "",
      searchType: "",
      orgOptions: {},
      dayKey: "昨日",
      rfKey: "区域全部医院",
      rfItemActive: {},
      thTitle: ""
    };
  },
  mounted() {
    this.loading = true;

    // 多个请求;
    this.$http.all([this.queryReferrals(), this.apiCustomer(-1, -1)]).then(
      this.$http.spread((acct, perms) => {
        // 加载动画 防抖
        setTimeout(() => {
          this.loading = false;
        }, 300);
      })
    );

    //路由 参数
    this.thTitle = this.$route.params.title;

    //折线图初始化
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
          data: [0, 1, 2, 3, 4, 5, 6],
          type: "line",
          smooth: true,
          areaStyle: {
            normal: {
              color: "rgb(125, 179, 255)" //改变区域颜色
            }
          },
          itemStyle: {
            normal: {
              color: "#408BF1", //改变折线点的颜色
              lineStyle: {
                color: "#408BF1" //改变折线颜色
              }
            }
          }
        }
      ]
    };
  },
  methods: {
    apiCustomer(day, ageDay) {
      this.startDateTime = this.$utils.selectSetDate(ageDay);
      this.endDateTime = this.$utils.selectSetDate(day);

      switch (ageDay) {
        case -1:
          this.dayKey = "昨日";
          break;
        case -7:
          this.dayKey = "最近7天";
          break;
        case -30:
          this.dayKey = "最近30天";
          break;

        default:
          this.dayKey = "自定义";
          break;
      }

      let req = {
        startDateTime: this.$utils.formatGMTDate(this.startDateTime + " 00:00"),
        endDateTime: this.$utils.formatGMTDate(this.endDateTime + " 23:59")
      };

      this.customerRegisterAnalysisReport(req);
    },



    //api
    queryReferrals() {
      //获取渠道信息
      this.$http.post("/host/queryReferrals", {}).then(res => {
        console.log(res);

        this.referralItems = res.items;
      });
    },
    customerRegisterAnalysisReport(reqdata) {
      this.$http
        .post("/host/healthRecordCreateAnalysisReport", reqdata)
        .then(res => {
          res.dailyDatas.map(item => {
            item.date = this.$utils.formateDate(item.date);
            return item;
          });

          let items = res.dailyDatas;
          let xAxis = [];
          let series = [];
          items.forEach(element => {
            xAxis.push(element.date);

            //  v-if="thTitle!='累计建档数'"
            if (this.thTitle == "累计建档数") {
              series.push(element.cumulativeCount);
            } else {
              series.push(element.count);
            }
          });

          this.orgOptions.xAxis.data = xAxis;
          this.orgOptions.series[0].data = series;

          console.log(this.orgOptions);

          this.dailyDatasItems = items;
          this.totalCount = res.totalCount;

          this.isShowSelect = false;
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
      this.dayKey = "自定义";
      this.startDateTime = this.startDate;
      this.endDateTime = this.endDate;

      let req = {
        startDateTime: this.$utils.formatGMTDate(this.startDateTime + " 00:00"),
        endDateTime: this.$utils.formatGMTDate(this.endDateTime + " 23:59")
      };

      this.isShowSelect = false;
      this.customerRegisterAnalysisReport(req);
    },
    showSelect(type) {
      this.searchType = type;
      this.isShowSelect = true;
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
.jtD {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  border-top: 2px solid #666666;
  border-left: 2px solid #666666;
  transform: rotate(45deg);
}

header {
  background-color: #fff;
  padding: 2.25rem 1.25rem 1.25rem 1.25rem;
  position: relative;
  z-index: 2;

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
