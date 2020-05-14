<!--
 * @Author: zgz
 * @Date: 2020-03-31 14:24:33
 * @LastEditTime: 2020-04-20 16:29:45
 * @LastEditors: zgz
 * @Description: file conten
 -->
<template>
  <section class="container">
    <H1>日图文咨询</H1>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "dayConsultByAsk",
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
      flex: 2;
      padding-left: 1.875rem;

      span {
        font-size: 2.25rem;
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
