import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/ourStart/ourStart.vue')
    },
    {
      path: '/go',
      component: () => import('@/views/layout/layoutContent.vue'),
      redirect: '/introduce',
      children: [
        {
          path: '/style',
          component: () => import('@/views/ourStyle/ourStyle.vue')
        },
        {
          path: '/introduce',
          component: () => import('@/views/ourIntroduce/ourIntroduce.vue')
        },
        {
          path: '/culture',
          component: () => import('@/views/teamCulture/teamCulture.vue')
        },
        {
          path: '/project',
          component: () => import('@/views/ourProject/ourProject.vue')
        },
        {
          path: '/join',
          component: () => import('@/views/signUp/signUp.vue')
        }
      ]
    },
    {
      path: '/registration',
      component: () => import('@/views/registrationForm/registrationForm.vue')
    },
    {
      path: '/success',
      component: () => import('@/views/success/success.vue')
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 排除初始化加载和从ourStart到ourIntroduce的路由跳转
  // 因为ourStart已经有自己的过渡动画
  if (from.name && from.path !== '/' && to.path !== '/') {
    // 显示加载动画
    const loadingOverlay = document.createElement('div')
    loadingOverlay.className = 'global-page-transition'
    
    const loadingSpinner = document.createElement('div')
    loadingSpinner.className = 'global-transition-spinner'
    
    loadingOverlay.appendChild(loadingSpinner)
    document.body.appendChild(loadingOverlay)
    
    // 设置动画过渡完成后自动移除
    setTimeout(() => {
      if (document.body.contains(loadingOverlay)) {
        // 添加淡出动画类
        loadingOverlay.classList.add('fade-out')
        
        // 动画结束后移除元素
        setTimeout(() => {
          if (document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay)
          }
        }, 300)
      }
    }, 800)
  }
  next()
})

export default router

/* 添加全局过渡动画样式 */
const style = document.createElement('style')
style.textContent = `
  .global-page-transition {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease-in-out;
    backdrop-filter: blur(5px);
  }
  
  .global-transition-spinner {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(0, 243, 255, 0.3);
    border-radius: 50%;
    border-top-color: #00f3ff;
    animation: spin 1s linear infinite;
  }
  
  .global-page-transition.fade-out {
    animation: fadeOut 0.3s ease-in-out forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`
document.head.appendChild(style)
