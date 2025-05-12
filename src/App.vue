<script setup>
import { onMounted } from 'vue'
import { useHead } from '@vueuse/head'

// 全局SEO设置
useHead({
  titleTemplate: '%s | KingCola-ICG',
  meta: [
    { name: 'author', content: 'KingCola-ICG Team' },
    {
      name: 'description',
      content: 'KingCola-ICG是湖南科技大学最活跃的自发性学生科研团队，成立于2017年，致力于创新创业项目和科研竞赛。'
    },
    { name: 'robots', content: 'index, follow' },
    // Open Graph / 社交媒体
    { property: 'og:site_name', content: 'KingCola-ICG' },
    { property: 'og:type', content: 'website' },
    // 移动优化
    { name: 'theme-color', content: '#00f3ff' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.kingcola-icg.cn/' }
  ]
})

onMounted(() => {
  // 页面加载时短暂隐藏滚动条，然后平滑显示
  document.body.style.opacity = '0.98'
  document.body.style.overflow = 'hidden'

  setTimeout(() => {
    document.body.style.overflow = 'auto'
    document.body.style.transition = 'opacity 0.3s ease'
    document.body.style.opacity = '1'
  }, 300)

  // 添加结构化数据，帮助搜索引擎理解网站内容
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'KingCola-ICG',
    'url': 'https://www.kingcola-icg.cn',
    'logo': 'https://www.kingcola-icg.cn/favicon.ico',
    'description': 'KingCola-ICG是湖南科技大学最活跃的自发性学生科研团队',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'email': 'contact@kingcola-icg.cn'
    }
  })
  document.head.appendChild(script)
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
/* 全局过渡动画定义 */
@keyframes textGradientMove {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 300% 50%;
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 200% 50%;
  }
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
  }

  50% {
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.8);
  }

  100% {
    box-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
  }
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(15, 23, 42, 0.2);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 243, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 243, 255, 0.5);
}

/* 全局过渡效果 */
body {
  transition: opacity 0.3s ease;
  scroll-behavior: smooth;
  font-family: '思源宋体 ExtraLight', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: #e4e4e4;
  background-color: #232222;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

/* 使用更平滑的滚动 */
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局链接样式 */
a {
  color: #00f3ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #0072ff;
}

/* 移除点击时显示的框印 */
a:focus,
button:focus,
[role="button"]:focus,
input:focus,
select:focus,
textarea:focus,
[tabindex]:focus {
  outline: none !important;
  box-shadow: none !important;
}

/* 移除移动设备上点击时的高亮效果 */
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

/* 移除所有选中效果，但保留基本可访问性 */
:focus:not(:focus-visible) {
  outline: none;
}

/* 默认的点击效果仅在使用键盘导航时显示 */
:focus-visible {
  outline: 2px solid rgba(0, 243, 255, 0.5);
  outline-offset: 2px;
}

/* 图片优化 */
img {
  max-width: 100%;
  height: auto;
}

/* 全局容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 576px) {
  body {
    font-size: 14px;
  }
}
</style>
