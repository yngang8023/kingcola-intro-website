<script setup>
import footContent from '@/component/footCotent/footContent.vue'
import { ref, onMounted, onUnmounted } from 'vue'

// 导航菜单项
const navItems = [
  { path: '/introduce', icon: 'icon-jieshao', text: '团队介绍' },
  { path: '/style', icon: 'icon-jiangbei', text: '团队风采' },
  { path: '/culture', icon: 'icon-wenhua', text: '团队文化' },
  { path: '/project', icon: 'icon-xiangmu-new', text: '团队项目' },
  { path: '/join', icon: 'icon-navicon-bmjl', text: '加入我们' }
]

// 控制移动端菜单
const mobileMenuOpen = ref(false)

// 页面滚动效果
const scrolled = ref(false)

// 监听滚动事件
const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

// 挂载时添加事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // 页面加载时短暂隐藏滚动条，然后淡入显示
  document.body.style.overflow = 'hidden'
  setTimeout(() => {
    document.body.style.overflow = 'auto'
    // 添加平滑过渡效果
    document.body.style.transition = 'opacity 0.5s ease'
    document.body.style.opacity = 1
  }, 300)
})

// 卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="layout-container">
    <!-- 导航栏 -->
    <header :class="['header', { 'scrolled': scrolled }]">
      <div class="header-content">
        <div class="header-left">
          <router-link to="/" class="logo-container">
            <div class="logo">
              <span class="logo-text">
                <span class="king">King</span><span class="cola">Cola</span><span class="icg">-ICG</span>
              </span>
            </div>
          </router-link>
          <div class="menu-toggle" :class="{ 'active': mobileMenuOpen }" @click="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav-menu" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item"
            @click="closeMobileMenu">
            <svg class="icon">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
            <span>{{ item.text }}</span>
          </router-link>
        </nav>
      </div>
    </header>

    <!-- 页面内容 -->
    <main class="main-content">
      <router-view></router-view>
    </main>

    <!-- 页脚 -->
    <footer>
      <footContent></footContent>
    </footer>
  </div>
</template>

<style scoped lang="scss">
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: '思源宋体 Medium';
  font-weight: 500;
  src:
    url('//at.alicdn.com/wf/webfont/B6XV0nUBXUTA/KJM3BAo3e7kA.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/B6XV0nUBXUTA/QB8Fr2NJBoa5.woff') format('woff');
  font-display: swap;
}

@font-face {
  font-family: '阿里妈妈方圆体 VF Regular';
  src:
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/BU4ZRd4hOdYT.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/e6Cga7iirigP.woff') format('woff');
  font-display: swap;
}

// 基本变量
$primary-color: #00f3ff;
$primary-dark: #0d324d;
$nav-bg: rgba(18, 20, 30, 0.8);
$nav-bg-scrolled: rgba(13, 15, 23, 0.95);
$text-color: #e4e4e4;

// 布局容器
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #232222, #303030);
  color: $text-color;
  overflow-x: hidden;
}

// 主内容区
.main-content {
  flex: 1;
  padding-top: 70px; // 为固定导航栏留出空间
  width: 100%;
}

// 导航栏
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  background: $nav-bg;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 70px;
}

.header.scrolled {
  background-color: rgba(15, 23, 42, 0.95);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  height: 60px;
  backdrop-filter: blur(10px);

  .logo {
    transform: scale(0.9);
  }

  .nav-link {
    padding: 0.5rem 0.8rem;
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

// Logo
.logo {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  .logo-text {
    background: linear-gradient(45deg, #00fffc, #fff);
    -webkit-background-clip: text;
    background-clip: text;
    position: relative;
    z-index: 1;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;

    /* 添加文字发光效果 */
    text-shadow:
      0 0 5px rgba(0, 255, 252, 0.5),
      0 0 10px rgba(0, 255, 252, 0.3),
      0 0 15px rgba(0, 255, 252, 0.2);

    /* 添加微妙的边框 */
    box-shadow:
      0 0 5px rgba(0, 255, 252, 0.3),
      inset 0 0 10px rgba(255, 255, 255, 0.1);

    /* 背景渐变使文字更加突出 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 52, 89, 0.6));
      border-radius: 4px;
      z-index: -1;
    }
  }

  .king {
    color: #00fffc;
  }

  .cola {
    color: #ffffff;
  }

  .icg {
    color: #00fffc;
    font-weight: 400;
  }
}

// 导航菜单
.nav-menu {
  display: flex;
  align-items: center;
  white-space: nowrap;

  .nav-item {
    display: flex;
    align-items: center;
    padding: 0 15px;
    height: 70px;
    color: $text-color;
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease;
    font-family: '阿里妈妈方圆体 VF Regular';
    white-space: nowrap;

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      fill: currentColor;
    }

    span {
      font-size: 16px;
      letter-spacing: 1px;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, $primary-color, transparent);
      transform: translateX(-50%);
      transition: width 0.3s ease;
    }

    &:hover,
    &.router-link-active {
      color: $primary-color;

      &::after {
        width: 50%;
      }
    }

    // 活跃状态
    &.router-link-active {
      font-weight: 600;

      &::after {
        width: 70%;
        background: $primary-color;
        box-shadow: 0 0 10px rgba(0, 243, 255, 0.7);
      }
    }
  }
}

// 移动端菜单按钮
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 22px;
  cursor: pointer;
  z-index: 1001;

  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: $primary-color;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  &.active {
    span {
      &:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
}

// 响应式布局
@media (max-width: 768px) {
  .header {
    height: 60px;
  }

  .header-content {
    padding: 0 15px;
  }

  .logo {
    font-size: 1.5rem;
  }

  .header-left {
    flex: 1;
    justify-content: space-between;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    flex-direction: column;
    background: $nav-bg-scrolled;
    padding-top: 80px;
    transition: right 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    white-space: nowrap;

    &.mobile-open {
      right: 0;
    }

    .nav-item {
      width: 100%;
      height: 60px;
      justify-content: center;

      &::after {
        bottom: 5px;
      }
    }
  }

  .main-content {
    padding-top: 60px;
  }
}

// 完善动画效果
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-item {
  animation: fadeIn 0.5s ease forwards;

  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}

// 解决滚动条闪现问题的全局样式
::v-deep(body) {
  opacity: 0.98;
  transition: opacity 0.3s ease;
  scroll-behavior: smooth;
}

// 自定义滚动条样式
::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(15, 23, 42, 0.2);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 243, 255, 0.3);
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 243, 255, 0.5);
  }
}
</style>
