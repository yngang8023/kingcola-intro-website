<script setup>
import { onMounted, ref } from 'vue'
const starsCount = ref(800)
const distance = 800
const star = ref()
console.log(star)
onMounted(() =>
  star.value.forEach((item) => {
    let speed = 0.2 + Math.random() * 1
    let dis = distance + Math.random() * 300
    item.style.transformOrigin = `0 0 ${dis}px`
    item.style.transform = `translate3d(0,0,-${dis}px)
    rotateY(${Math.random() * 360}deg)
    rotateX(${Math.random() * -50}deg)
    scale(${speed},${speed})`
  })
)
</script>

<template>
  <body>
    <div class="stars">
      <div
        v-for="(item, index) in starsCount"
        :key="index"
        class="star"
        ref="star"
      ></div>
    </div>
    <div class="text">
      <span>KingCola</span>
      <button @click="$router.push('/go')"><span>进入官网</span></button>
    </div>
  </body>
</template>

<style scoped lang="scss">
@font-face {
  font-family: '阿里妈妈灵动体 VF Thin';
  src:
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/MU1lXRzLFGsC.woff2')
      format('woff2'),
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/G5e7O2azklS2.woff')
      format('woff');
  font-display: swap;
}
html,
body {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #000000, #434343);
  overflow: hidden;
}
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(10deg) rotateX(0deg) rotateY(-360deg);
  }
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: fixed;
  perspective-origin: 50% 100%;
  left: 20%;
  animation: rotate 150s infinite linear;
  bottom: 0;
}
.star {
  width: 2px;
  height: 2px;
  background-color: #f7f7b8;
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
  overflow: hidden;
}
.text {
  color: #fbfbfb;
  margin-top: 40vh;
  text-align: center;
  font-family: '阿里妈妈灵动体 VF Thin';
  font-size: 3em;
  letter-spacing: 10px;
  cursor: default;
  text-shadow: 1px 1px 5px #f7f7b8;
  span {
    display: block;
    font-style: italic;
  }
  button {
    margin-top: 50px;
    span {
      font-size: 13px;
      font-style: normal;
      padding: 5px 20px;
      color: #000000;
    }
  }
  opacity: 0;
  animation: animate 3s linear forwards;
  transition: all 3s;
}
@keyframes animate {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
