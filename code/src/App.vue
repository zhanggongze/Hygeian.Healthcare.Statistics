<!--
 * @Author: zgz
 * @Date: 2020-03-31 14:24:33
 * @LastEditTime: 2020-04-01 13:39:56
 * @LastEditors: zgz
 * @Description: file conten
 -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width   : 100%;
  min-height  : 100%;
  background-color: #f0f0f0;
}

/* 媒体查询 */
@media (min-width: 320px) {
  html {
    font-size: 7.11px;
  }
}
@media (min-width: 360px) {
  html {
    font-size: 8px;
  }
}

@media (min-width: 375px) {
  html {
    font-size: 8.33px;
  }
}

@media (min-width: 1440px) {
  html {
    font-size: 32px;
  }
}

.animated {
  animation-iteration-count:infinite;
  -webkit-animation-duration: 1.4s;
  animation-duration: 1.4s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
}

@keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
}

.fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown
}

</style>
