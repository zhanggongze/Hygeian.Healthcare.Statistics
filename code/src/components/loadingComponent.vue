<!--
 * @Author: zgz
 * @Date: 2020-03-31 14:24:33
 * @LastEditTime: 2020-04-20 16:29:45
 * @LastEditors: zgz
 * @Description: file conten
 -->
<template>
  <section class="container">
    <div class="k-square-holder2">
      <div class="k-square4 k-square4a"></div>
      <div class="k-square4 k-square4b"></div>
      <div class="k-square4 k-square4c"></div>
      <div class="k-square4 k-square4d"></div>
    </div>
    <p class="loadingP">加载中</p>
  </section>
</template>

<script>
export default {
  name: "loadingComponent",
};
</script>

<style lang="scss" scoped>

/* 加载动画 */
.loadingP{
  text-align: center;
  color: #999;
  font-size: 1.5rem;
  // padding-top: .75rem;
}
.k-square-holder2 {
  margin:0 auto;
  width: 26px;
  padding-top:2.625rem;
}
.k-square4 {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #000;
  opacity: 1;
  animation: k-loadingR 1s infinite;
  opacity: 0;
}

@keyframes k-loadingR {
  0% {
    opacity: 0.5;
    background: #000;
  }
  30% {
    opacity: 0.5;
    background: #666;
  }
  60% {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
    background: #000;
  }
}

.k-square3d {
  transform: translate(0, 25px);
}
.k-square4b {
  animation-delay: 0.7s;
}
.k-square4c {
  animation-delay: 2.1s;
}
.k-square4d {
  animation-delay: 1.4s;
}
</style>
