import './assets/main.scss'
//  引入阿里巴巴的iconfont图标库
import '//at.alicdn.com/t/c/font_4373263_m0w82xyv12p.js'
import './assets/icons.js'
import './assets/removeOutline.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

// 创建应用实例
const app = createApp(App)
// 创建head实例用于SEO优化
const head = createHead()

// SEO配置增强
head.addHeadObjs({
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'KingCola-ICG团队' },
    { name: 'copyright', content: 'Copyright © 2025 KingCola-ICG. All Rights Reserved.' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#00f3ff' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.kingcola-icg.cn' }
  ]
})

// 添加全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue错误:', err)
  console.error('错误信息:', info)
}

// 注册全局组件和插件
app.use(createPinia())
app.use(router)
app.use(head)
app.use(ElementPlus, {
  locale: zhCn, // 使用中文
})

// 路由切换时滚动到顶部
router.afterEach(() => {
  window.scrollTo(0, 0)
})

// 移除点击时的框印效果
document.addEventListener('DOMContentLoaded', () => {
  // 移除所有链接和按钮的点击框印
  const removeOutlines = () => {
    const elements = document.querySelectorAll('a, button, [role="button"], [tabindex]')
    elements.forEach(el => {
      el.addEventListener('mousedown', () => {
        el.style.outline = 'none'
        el.style.boxShadow = 'none'
      })
    })
  }
  
  // 监听DOM变化，对新添加的元素也应用相同的规则
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        removeOutlines()
      }
    })
  })
  
  // 初始应用
  removeOutlines()
  
  // 监听整个文档的变化
  observer.observe(document.body, { 
    childList: true,
    subtree: true 
  })
})

// 挂载应用
app.mount('#app')
