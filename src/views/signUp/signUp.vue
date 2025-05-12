<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import frontendIcon from '@/assets/前端开发.png'
import backendIcon from '@/assets/后端开发.png'
import mlIcon from '@/assets/机器学习.png'
import embeddedIcon from '@/assets/嵌入式开发.png'
import productIcon from '@/assets/产品设计.png'
import planningIcon from '@/assets/策划运营.png'

const router = useRouter()
const isLoading = ref(true)
const activeIndex = ref(null)

const classIfy = ref([
  {
    id: 1,
    className: '前端开发',
    classIntroduce: '了解前端相关知识，想要开发网页、app、微信小程序或者对此有强烈的兴趣',
    color: '#5ec5df'
  },
  {
    id: 2,
    className: '后端开发',
    classIntroduce: '了解后端相关知识，想要开发网页、app、微信小程序或者对此有强烈的兴趣',
    color: '#8f7eda'
  },
  {
    id: 3,
    className: '机器学习',
    classIntroduce: '了解或者对机器学习、计算机视觉感兴趣',
    color: '#f89860'
  },
  {
    id: 4,
    className: '嵌入式开发',
    classIntroduce: '对树莓派、常规单片机有一定的了解或者强烈学习欲望',
    color: '#5ab552'
  },
  {
    id: 5,
    className: '产品设计',
    classIntroduce: '有外观设计、logo设计、视频剪辑、动画制作、3D建模、宣传设计等相关基础',
    color: '#e8556e'
  },
  {
    id: 6,
    className: '策划运营',
    classIntroduce: '对商业运营、产品模式、财务分析等有一定的了解，或者文字功底较强',
    color: '#f7d046'
  }
])

// 图标映射
const iconMap = {
  '前端开发': frontendIcon,
  '后端开发': backendIcon,
  '机器学习': mlIcon,
  '嵌入式开发': embeddedIcon,
  '产品设计': productIcon,
  '策划运营': planningIcon
}

// 获取图标路径的函数
const getIconPath = (className) => {
  return iconMap[className] || ''
}

const handleMouseEnter = (index) => {
  activeIndex.value = index
}

const handleMouseLeave = () => {
  activeIndex.value = null
}

const handleApply = (className) => {
  router.push({
    path: '/registration',
    query: { className }
  })
}

onMounted(() => {
  // 为提高性能，预加载图标
  Object.values(iconMap).forEach(iconSrc => {
    const img = new Image();
    img.src = iconSrc;
  });

  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <div class="signup-container">
    <div class="page-header">
      <h1 class="main-title">加入我们</h1>
      <p class="sub-title">选择你感兴趣的方向，开启你的科技之旅</p>
    </div>

    <div class="card-container" v-if="!isLoading">
      <div class="card-wrapper" v-for="(item, index) in classIfy" :key="index" @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave()" :class="{ 'card-active': activeIndex === index }">
        <div class="card-content" :style="{ '--card-color': item.color }">
          <div class="card-icon">
            <img :src="getIconPath(item.className)" :alt="item.className" />
          </div>
          <div class="card-title">
            {{ item.className }}
          </div>
          <div class="card-intro">
            {{ item.classIntroduce }}
          </div>
          <div class="card-action">
            <el-button type="primary" round @click="handleApply(item.className)">
              申请岗位
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="loading-container" v-else>
      <el-skeleton :rows="6" animated />
    </div>

    <!-- <footContent /> -->
  </div>
</template>

<style scoped lang="scss">
.signup-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #232222 0%, #434343 100%);
  padding: 2rem 0 4rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -12vh;
    left: 0;
    width: 300px;
    height: 300px;
    background: linear-gradient(#5ec5df, #1d8fb5);
    opacity: 0.6;
    clip-path: circle(100% at 0% 0%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 0;
    bottom: -10vh;
    right: 0;
    width: 300px;
    height: 300px;
    background: linear-gradient(#bc8cf7, #8f7eda);
    opacity: 0.6;
    clip-path: circle(100% at 100% 100%);
  }
}

.page-header {
  text-align: center;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;

  .main-title {
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .sub-title {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    font-weight: 300;
    margin-top: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
}

.card-wrapper {
  flex: 0 0 calc(33.333% - 2rem);
  max-width: 350px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1024px) {
    flex: 0 0 calc(50% - 2rem);
  }

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 450px;
  }

  &.card-active {
    transform: translateY(-10px) translateZ(0);

    .card-content {
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2),
        inset 0 0 0 1px rgba(255, 255, 255, 0.2);

      &::before {
        opacity: 0.7;
      }

      .card-icon img {
        transform: scale(1.1) translateZ(0);
      }
    }
  }
}

.card-content {
  position: relative;
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem 1.5rem;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  transform: translateZ(0);
  will-change: transform, box-shadow;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--card-color);
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
}

.card-icon {
  margin-bottom: 1.5rem;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.9;
    transition: all 0.3s ease;
  }
}

.card-title {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.card-intro {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.card-action {
  width: 100%;
  margin-top: 1rem;

  .el-button {
    background-color: var(--card-color);
    border-color: var(--card-color);
    padding: 10px 25px;
    font-size: 0.95rem;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  }
}

.loading-container {
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) translateZ(0);
  }

  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}

.card-wrapper {
  animation: fadeIn 0.5s ease-out forwards;
  will-change: transform, opacity;
  backface-visibility: hidden;

  @for $i from 1 through 6 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }

  &:nth-child(6) {
    animation-fill-mode: forwards;
    animation-delay: 0.6s;
    animation-name: fadeInLast;
  }
}

@keyframes fadeInLast {
  from {
    opacity: 0;
    transform: translateY(20px) translateZ(0);
    will-change: transform, opacity;
  }

  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
    will-change: auto;
  }
}
</style>
