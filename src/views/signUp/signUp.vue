<script setup>
import { ref } from 'vue'

const classIfy = ref([
  {
    id: 1,
    className: '前端开发',
    classIntroduce:
      '了解前端相关知识，想要开发网页、app、微信小程序或者对此有强烈的兴趣'
  },
  {
    id: 2,
    className: '后端开发',
    classIntroduce:
      '了解后端相关知识，想要开发网页、app、微信小程序或者对此有强烈的兴趣'
  },
  {
    id: 3,
    className: '机器学习',
    classIntroduce: '了解或者对机器学习、计算机视觉感兴趣'
  },
  {
    id: 4,
    className: '嵌入式开发',
    classIntroduce: '对树莓派、常规单片机有一定的了解或者强烈学习欲望'
  },
  {
    id: 5,
    className: '产品设计',
    classIntroduce:
      '有外观设计、logo设计、视频剪辑、动画制作、3D建模、宣传设计等相关基础'
  },
  {
    id: 6,
    className: '策划运营',
    classIntroduce:
      '对商业运营、产品模式、财务分析等有一定的了解，或者文字功底较强'
  }
])
</script>

<template>
  <div class="container2">
    <ul class="card">
      <li class="cardContent" v-for="(item, index) in classIfy" :key="index">
        <div class="cardTitle">
          {{ item.className }}
        </div>
        <div class="cardIntroduce">
          {{ item.classIntroduce }}
        </div>

        <div class="button">
          <router-link
            :to="{
              path: '/registration',
              query: { className: item.className }
            }"
            ><el-button round plain color="#fffff"
              >申请岗位</el-button
            ></router-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container2 {
  width: 100%;
  height: 100vh;
  position: relative;

  .card {
    margin-top: 10vh;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;
    .cardContent {
      .button {
        margin-top: 6vh;
      }
      width: 18vw;
      margin-right: 10vw;
      height: 40vh;
      color: #e3e3e3fa;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(4px);
      box-shadow:
        inset 1px 1px 6px rgba(181, 181, 181, 0.3),
        2px 2px 15px rgba(0, 0, 0, 0.5);
    }
    .cardContent:first-child,
    .cardContent:nth-child(4) {
      margin-left: 7vw;
    }
    .cardContent:nth-child(-n + 3) {
      margin-bottom: 5vh;
    }
  }
}
.cardTitle {
  margin-top: 1vw;
  font-size: 1.3em;
}
.cardIntroduce {
  margin-top: 2vw;
  padding: 0 5px;
  font-size: 0.9em;
}
.container2::before {
  content: '';
  position: absolute;
  top: -12vh;
  left: 0;
  width: 200px;
  height: 200px;
  background: linear-gradient(#5ec5df, #1d8fb5);
  opacity: 0.8;
  clip-path: circle(100% at 0% 0%);
}
.container2::after {
  content: '';
  position: absolute;
  z-index: 0;
  top: 66.8vh;
  right: 0;
  width: 200px;
  height: 200px;
  background: linear-gradient(#bc8cf7, #8f7eda);
  opacity: 0.8;
  clip-path: circle(100% at 100% 100%);
}
.container3 {
  width: 90vw;
  height: 500px;
}
.container3-box1 {
  position: relative;
  transform: translate(160px, 75px);
  background-color: #878787;
  width: 70vw;
  height: 80%;
  border-radius: 1%;
  opacity: 0.8;
}
</style>
