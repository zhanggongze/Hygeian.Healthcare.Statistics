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
      <div class="item" @click="toDoctorConsultByAsk()">
        <div class="iL">
          <span>新增注册数</span>
        </div>
        <div class="iR">
          <p class="p1">56</p>
          <p class="p2">较前日+12</p>
        </div>
      </div>
      <div class="item" @click="toDoctorIM()">
        <div class="iL">
          <span>新增建档数</span>
        </div>
        <div class="iR">
          <p class="p1">56</p>
          <p class="p2">较前日+12</p>
        </div>
      </div>
      <div class="item" @click="toDayConsultByAsk()">
        <div class="iL">
          <span>累计注册数</span>
        </div>
        <div class="iR">
          <p class="p1">56</p>
          <p class="p2">较前日+12</p>
        </div>
      </div>
      <div class="item" @click="toDayIM()">
        <div class="iL">
          <span>累计建档数</span>
        </div>
        <div class="iR">
          <p class="p1">56</p>
          <p class="p2">较前日+12</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      data: ""
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
  mounted() {},
  methods: {
    aFn() {
      console.log(123);
    },
    toDoctorConsultByAsk() {
      this.$router.push({ path: "/doctorConsultByAsk" });
    },
    toDoctorIM() {
      this.$router.push({ path: "/doctorIM" });
    },
    toDayConsultByAsk() {
      this.$router.push({ path: "/dayConsultByAsk" });
    },
    toDayIM() {
      this.$router.push({ path: "/dayIM" });
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

      span {
        font-size: 2rem;
        color: #333;
      }
    }

    .iR {
      padding-right: 1.875rem;
      text-align: right;
      flex: 1;
      .p1 {
        color: #408bf1;
        font-size: 2.25rem;
      }
      .p2 {
        color: #999;
      }
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
