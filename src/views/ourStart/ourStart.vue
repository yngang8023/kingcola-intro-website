<script setup>
import { onMounted, ref, onBeforeUnmount, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { useRouter } from 'vue-router'

// 获取router实例
const router = useRouter()

// 星空效果相关参数
const starsCount = ref(500) // 增加星星数量
const distance = 800
const star = ref([])

// 控制文字流光效果
const textGlowActive = ref(true)

// 霓虹光环效果
const neonRingActive = ref(true)

// 动态背景颜色
const backgroundTheme = ref(0)
const themeChangeInterval = ref(30000) // 30秒切换一次背景
const themes = [
  { from: '#000428', to: '#004e92' },
  { from: '#0F2027', to: '#203A43' },
  { from: '#16222A', to: '#3A6073' },
  { from: '#0d324d', to: '#1a6baa' },
  { from: '#000000', to: '#0f172a' }
]

// 流光效果状态
const flowingEffectActive = ref(true)
const cyberpunkElementsActive = ref(true)

// 数字雨效果
const digitalRainCanvas = ref(null)
const digitalRainCtx = ref(null)
const digitalRainLetters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ0123456789'
const digitalRainArr = []
const digitalRainFontSize = 12
const digitalRainColumns = ref(0)

// 新增科技效果控制变量
const dataVisualizationActive = ref(true)
const hologramicEffectsActive = ref(true)
const radarActive = ref(true)
const flyingDataCount = 30 // 飞行数据粒子数量

// Three.js场景
let threeScene = null
let threeCamera = null
let threeRenderer = null
let threeContainer = ref(null)
let particles = null
let particlesGeometry = null
let particlesMaterial = null
let clock = null
let animationFrameId = null

// 文字渐变动画速度调整
const textGradientSpeed = ref(60) // 增加到60秒，让渐变更缓慢
// 用户交互相关
const userInteractionActive = ref(false)
const cursorPosition = ref({ x: 0, y: 0 })

// 鼠标跟随相关
const cursorSize = ref(40)
const cursorGlowing = ref(false)
const cursorTrail = ref([])
const maxTrailLength = 10
const cursorEffects = ref({
  ripple: true,
  trail: true,
  highlight: true
})
const mouseVelocity = ref({ x: 0, y: 0 })
const prevMousePosition = ref({ x: 0, y: 0 })

// 新增悬浮科技元素
const techElementsCount = 8
const techElements = ref([])

// 添加数据流动画元素
const dataFlowsCount = 12
const dataFlows = ref([])

// 流光粒子
const flowingLightsCount = 20
const flowingLights = ref([])

// 新增电路线
const circuitLinesCount = 12
const circuitLines = ref([])

// 新增装饰浮动图形
const floatingShapesCount = 15
const floatingShapes = ref([])

// 新增能量脉冲
const energyPulses = ref([])
const energyPulsesCount = 8

// 装饰性粒子系统
const decorativeParticlesCount = 30
const decorativeParticles = ref([])

// 浮动能量弧 
const energyArcsCount = 6
const energyArcs = ref([])

// 移动端检测
const isMobile = ref(false)
const windowWidth = ref(window.innerWidth)

// 星空效果初始化
onMounted(() => {
  // 设置移动端检测
  checkMobile()
  createStars()
  initStars()
  initDigitalRain()
  initFlowingElements() // 流动元素初始化
  initThreeJsScene() // 初始化Three.js场景

  // 初始化新增科技效果
  initTechEffects()

  // 初始化新增动态元素
  initCircuitLines()
  initFloatingShapes()
  initEnergyPulses()
  initDecorativeParticles()
  initEnergyArcs()

  // 鼠标移动跟踪
  window.addEventListener('mousemove', handleMouseMove)
  // 点击交互效果
  window.addEventListener('click', handleClick)

  // 霓虹光环效果 - 延长时间
  const neonRingInterval = setInterval(() => {
    neonRingActive.value = !neonRingActive.value
  }, 18000)

  // 背景主题切换 - 使用更长的时间
  const themeInterval = setInterval(() => {
    backgroundTheme.value = (backgroundTheme.value + 1) % themes.length
  }, themeChangeInterval.value)

  // 流光效果切换
  const flowingInterval = setInterval(() => {
    flowingEffectActive.value = !flowingEffectActive.value
  }, 25000)

  // 赛博朋克元素动画
  const cyberpunkInterval = setInterval(() => {
    cyberpunkElementsActive.value = !cyberpunkElementsActive.value
  }, 22000)

  // 数据可视化效果切换
  const dataVisInterval = setInterval(() => {
    dataVisualizationActive.value = !dataVisualizationActive.value
  }, 30000)

  // 全息效果切换
  const hologramInterval = setInterval(() => {
    hologramicEffectsActive.value = !hologramicEffectsActive.value
  }, 28000)

  // 窗口大小变化时重新初始化效果
  window.addEventListener('resize', handleResize)

  // 清理定时器
  onBeforeUnmount(() => {
    clearInterval(neonRingInterval)
    clearInterval(themeInterval)
    clearInterval(flowingInterval)
    clearInterval(cyberpunkInterval)
    clearInterval(dataVisInterval)
    clearInterval(hologramInterval)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('click', handleClick)
    cancelAnimationFrame(animationFrameId)
    disposeThreeJsScene()
  })

  // 初始化悬浮科技元素
  initTechElements()

  // 初始化数据流动画
  initDataFlows()

  // 初始化流光粒子
  initFlowingLights()

  // 重要：在跳转到其他页面时，恢复滚动条
  router.beforeEach((to, from, next) => {
    if (from.path === '/' && to.path !== '/') {
      // 恢复滚动条
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
    next()
  })
})

// 处理按钮点击进入官网事件
const enterWebsite = () => {
  // 创建全屏加载动画页面
  const loadingOverlay = document.createElement('div')
  loadingOverlay.className = 'page-transition-overlay'
  loadingOverlay.style.position = 'fixed'
  loadingOverlay.style.zIndex = '10000'
  loadingOverlay.style.top = '0'
  loadingOverlay.style.left = '0'
  loadingOverlay.style.width = '100vw'
  loadingOverlay.style.height = '100vh'
  loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.95)'
  loadingOverlay.style.display = 'flex'
  loadingOverlay.style.justifyContent = 'center'
  loadingOverlay.style.alignItems = 'center'
  // 强化硬件加速
  loadingOverlay.style.transform = 'translateZ(0)'
  loadingOverlay.style.willChange = 'opacity, transform'
  loadingOverlay.style.backfaceVisibility = 'hidden'
  loadingOverlay.style.perspective = '1000px'
  loadingOverlay.style.webkitFontSmoothing = 'antialiased'
  loadingOverlay.style.transition = 'none' // 创建时不使用过渡动画

  // 添加loading容器
  const loadingContainer = document.createElement('div')
  loadingContainer.className = 'loading-container'
  loadingContainer.style.display = 'flex'
  loadingContainer.style.flexDirection = 'column'
  loadingContainer.style.alignItems = 'center'
  loadingContainer.style.padding = '30px'
  loadingContainer.style.backgroundColor = 'rgba(13, 50, 77, 0.8)'
  loadingContainer.style.borderRadius = '15px'
  loadingContainer.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.4)'
  loadingContainer.style.border = '1px solid rgba(0, 243, 255, 0.2)'
  loadingContainer.style.width = '90%'
  loadingContainer.style.maxWidth = '500px'
  loadingContainer.style.transform = 'translateZ(0)' // 添加硬件加速
  loadingContainer.style.willChange = 'transform' // 优化动画性能
  loadingContainer.style.backfaceVisibility = 'hidden'
  loadingContainer.style.webkitFontSmoothing = 'antialiased'
  loadingContainer.style.opacity = '0' // 初始设为不可见
  loadingContainer.style.transition = 'opacity 0.3s ease'

  // 创建LOGO区域 - 使用内联SVG代替图片，避免加载问题
  const logoContainer = document.createElement('div')
  logoContainer.className = 'loading-logo'
  logoContainer.style.width = '100px'
  logoContainer.style.height = '100px'
  logoContainer.style.borderRadius = '50%'
  logoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
  logoContainer.style.display = 'flex'
  logoContainer.style.justifyContent = 'center'
  logoContainer.style.alignItems = 'center'
  logoContainer.style.marginBottom = '20px'
  logoContainer.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.6)'
  logoContainer.style.transform = 'translateZ(0)' // 添加硬件加速

  // 简化SVG，减少复杂度
  logoContainer.innerHTML = `
    <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateZ(0);">
      <circle cx="50" cy="50" r="45" stroke="#00f3ff" stroke-width="2" />
      <path d="M30 30 L70 70" stroke="#00f3ff" stroke-width="4" />
      <path d="M70 30 L30 70" stroke="#00f3ff" stroke-width="4" />
      <circle cx="50" cy="50" r="20" stroke="#00f3ff" stroke-width="2" fill="none" />
    </svg>
  `

  // 创建标题
  const loadingTitle = document.createElement('div')
  loadingTitle.className = 'loading-title'
  loadingTitle.textContent = 'KingCola-ICG'
  loadingTitle.style.fontSize = '2.2rem'
  loadingTitle.style.fontWeight = 'bold'
  loadingTitle.style.margin = '0 0 25px 0'
  loadingTitle.style.color = '#00f3ff' // 使用纯色替代复杂渐变
  loadingTitle.style.textShadow = '0 0 10px rgba(0, 243, 255, 0.7)'
  loadingTitle.style.transform = 'translateZ(0)' // 添加硬件加速

  // 创建进度条容器
  const progressContainer = document.createElement('div')
  progressContainer.className = 'progress-container'
  progressContainer.style.width = '100%'
  progressContainer.style.height = '10px'
  progressContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
  progressContainer.style.borderRadius = '5px'
  progressContainer.style.overflow = 'hidden'
  progressContainer.style.marginBottom = '15px'
  progressContainer.style.position = 'relative'
  progressContainer.style.transform = 'translateZ(0)' // 添加硬件加速

  // 创建进度条
  const progressBar = document.createElement('div')
  progressBar.className = 'progress-bar'
  progressBar.style.height = '100%'
  progressBar.style.width = '0%'
  progressBar.style.background = '#00c6ff' // 使用纯色替代复杂渐变
  progressBar.style.borderRadius = '5px'
  progressBar.style.transition = 'width 0.1s linear' // 加快过渡时间
  progressBar.style.boxShadow = '0 0 10px rgba(0, 243, 255, 0.7)'
  progressBar.style.transform = 'translateZ(0)' // 添加硬件加速
  progressContainer.appendChild(progressBar)

  // 创建进度文本
  const progressText = document.createElement('div')
  progressText.className = 'progress-text'
  progressText.textContent = '0%'
  progressText.style.fontSize = '1rem'
  progressText.style.color = 'white'
  progressText.style.marginBottom = '10px'
  progressText.style.transform = 'translateZ(0)' // 添加硬件加速

  // 创建加载消息
  const loadingMessage = document.createElement('div')
  loadingMessage.className = 'loading-message'
  loadingMessage.textContent = '正在加载团队介绍...'
  loadingMessage.style.fontSize = '1rem'
  loadingMessage.style.color = 'rgba(255, 255, 255, 0.9)'
  loadingMessage.style.textAlign = 'center'
  loadingMessage.style.height = '24px'
  loadingMessage.style.transform = 'translateZ(0)' // 添加硬件加速

  // 添加更简单的CSS动画
  const style = document.createElement('style')
  style.textContent = `
    @keyframes rotate {
      0% { transform: rotate(0deg) translateZ(0); }
      100% { transform: rotate(360deg) translateZ(0); }
    }
    .loading-logo {
      animation: rotate 10s linear infinite;
    }
  `
  document.head.appendChild(style)

  // 组合所有元素
  loadingContainer.appendChild(logoContainer)
  loadingContainer.appendChild(loadingTitle)
  loadingContainer.appendChild(progressContainer)
  loadingContainer.appendChild(progressText)
  loadingContainer.appendChild(loadingMessage)
  loadingOverlay.appendChild(loadingContainer)

  // 确保在DOM中添加加载动画
  document.body.appendChild(loadingOverlay)

  // 强制重排，然后显示容器
  void loadingOverlay.offsetWidth // 触发重排
  loadingContainer.style.opacity = '1' // 平滑显示容器

  // 恢复滚动条
  document.documentElement.style.overflow = 'auto'
  document.body.style.overflow = 'auto'
  document.documentElement.classList.remove('start-page')

  // 移除所有可能禁用滚动条的内联样式和类
  document.documentElement.style.maxHeight = 'none'
  document.body.style.maxHeight = 'none'
  document.documentElement.style.height = 'auto'
  document.body.style.height = 'auto'

  // 确保#app的样式也被重置
  const appElement = document.getElementById('app')
  if (appElement) {
    appElement.style.overflow = 'auto'
    appElement.style.maxHeight = 'none'
    appElement.style.height = 'auto'
  }

  // 简化的预加载资源函数
  const preloadResources = () => {
    // 预加载团队介绍页面的关键图片，简化数量
    const imagesToPreload = [
      '/src/assets/logo.png',
      '/src/assets/标志2.png'
    ]

    // 加载提示信息数组
    const loadingMessages = [
      '正在加载团队介绍...',
      '正在准备团队数据...',
      '加载团队成员信息...',
      '即将完成，请稍候...'
    ]

    const totalResources = imagesToPreload.length + 4; // 图片 + 虚拟资源
    let currentProgress = 0

    // 更新进度条的函数 - 使用RAF优化性能
    const updateProgress = (progress) => {
      const targetProgress = Math.min(Math.floor(progress), 100)
      progressBar.style.width = `${targetProgress}%`
      progressText.textContent = `${targetProgress}%`

      // 根据进度更新消息
      const messageIndex = Math.floor(targetProgress / (100 / loadingMessages.length))
      const safeIndex = Math.min(messageIndex, loadingMessages.length - 1)
      loadingMessage.textContent = loadingMessages[safeIndex]

      // 到达100%准备跳转
      if (targetProgress === 100) {
        setTimeout(() => {
          sessionStorage.setItem('loadingFromStartPage', 'true')
          loadingOverlay.setAttribute('data-preserve', 'true')
          router.push('/go')
        }, 300) // 减少等待时间
      }
    }

    // 更简单的加载进度逻辑
    let loadedCount = 0;
    let timer = null;

    // 处理图片加载
    imagesToPreload.forEach(imgSrc => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
        // 计算加载进度 (每个图片权重40%)
        const imgProgress = (loadedCount / imagesToPreload.length) * 40;
        updateProgress(imgProgress);
      };
      img.src = imgSrc;
    });

    // 模拟其余资源加载，使用setTimeout平滑增加进度
    let fakeProgress = 40;
    timer = setInterval(() => {
      fakeProgress += 2;
      if (fakeProgress >= 100) {
        clearInterval(timer);
        updateProgress(100);
      } else {
        updateProgress(fakeProgress);
      }
    }, 100);
  }

  // 立即开始预加载，无需延迟
  preloadResources();
}

// 检测是否为移动设备
const checkMobile = () => {
  const updateMobileStatus = () => {
    windowWidth.value = window.innerWidth
    isMobile.value = window.innerWidth <= 768
  }

  updateMobileStatus()
  window.addEventListener('resize', updateMobileStatus)
}

// 新增电路线初始化
const initCircuitLines = () => {
  circuitLines.value = Array.from({ length: circuitLinesCount }, (_, i) => {
    return {
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      length: 50 + Math.random() * 150,
      width: 1 + Math.random() * 2,
      angle: Math.random() * 360,
      speed: 10 + Math.random() * 18,
      opacity: 0.1 + Math.random() * 0.3,
      color: `rgba(0, ${150 + Math.floor(Math.random() * 100)}, ${200 + Math.floor(Math.random() * 55)}, 0.${2 + Math.floor(Math.random() * 6)})`,
      delay: Math.random() * 15,
      segments: Math.floor(2 + Math.random() * 4) // 线段数量
    }
  })
}

// 新增浮动形状初始化
const initFloatingShapes = () => {
  floatingShapes.value = Array.from({ length: floatingShapesCount }, (_, i) => {
    // 随机选择形状类型 (0-三角形, 1-圆形, 2-正方形, 3-五边形, 4-六边形)
    const shapeType = Math.floor(Math.random() * 5)
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 5 + Math.random() * 15,
      opacity: 0.1 + Math.random() * 0.3,
      rotationSpeed: 5 + Math.random() * 10,
      floatAmplitude: 20 + Math.random() * 40,
      floatSpeed: 5 + Math.random() * 15,
      delay: Math.random() * 20,
      type: shapeType,
      borderOnly: Math.random() > 0.5 // 是否只有边框
    }
  })
}

// 新增能量脉冲初始化
const initEnergyPulses = () => {
  energyPulses.value = Array.from({ length: energyPulsesCount }, (_, i) => {
    return {
      id: i,
      x: 10 + Math.random() * 80, // 保持在视窗内
      y: 10 + Math.random() * 80,
      size: 30 + Math.random() * 100,
      speed: 13 + Math.random() * 17,
      delay: Math.random() * 15,
      opacity: 0.05 + Math.random() * 0.15,
      color: Math.random() > 0.7 ? 'rgba(123, 0, 255, 0.2)' : 'rgba(0, 243, 255, 0.2)'
    }
  })
}

// 新增装饰性粒子初始化
const initDecorativeParticles = () => {
  decorativeParticles.value = Array.from({ length: decorativeParticlesCount }, (_, i) => {
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 4,
      speed: 20 + Math.random() * 40,
      direction: Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.6,
      pulse: 1 + Math.random() * 3,
      delay: Math.random() * 10
    }
  })
}

// 新增能量弧初始化
const initEnergyArcs = () => {
  energyArcs.value = Array.from({ length: energyArcsCount }, (_, i) => {
    return {
      id: i,
      startX: 10 + Math.random() * 80,
      startY: 10 + Math.random() * 80,
      endX: 10 + Math.random() * 80,
      endY: 10 + Math.random() * 80,
      thickness: 1 + Math.random() * 2,
      duration: 13 + Math.random() * 17,
      delay: Math.random() * 20,
      color: Math.random() > 0.5 ? '#00f3ff' : '#7b00ff',
      opacity: 0.3 + Math.random() * 0.5
    }
  })
}

// 初始化新增科技效果
const initTechEffects = () => {
  // 确保标题元素有data-text属性（用于霓虹效果）
  nextTick(() => {
    const mainTitle = document.querySelector('.main-title')
    if (mainTitle && mainTitle.getAttribute('data-text')) {
      // 已经设置了data-text，不需要重复设置
    } else if (mainTitle) {
      mainTitle.setAttribute('data-text', mainTitle.textContent)
    }

    // 创建飞行数据粒子
    createFlyingData()
  })
}

// 创建飞行数据粒子
const createFlyingData = () => {
  const container = document.querySelector('.flying-data')
  if (!container) return

  // 清空现有内容
  container.innerHTML = ''

  // 创建粒子
  for (let i = 0; i < flyingDataCount; i++) {
    const particle = document.createElement('div')
    particle.classList.add('data-particle')

    // 设置随机位置和动画
    particle.style.top = `${Math.random() * 100}%`
    particle.style.left = `${Math.random() * 100}%`
    particle.style.animationDuration = `${5 + Math.random() * 10}s`
    particle.style.animationDelay = `${Math.random() * 5}s`

    container.appendChild(particle)
  }
}

// 初始化悬浮科技元素
const initTechElements = () => {
  techElements.value = Array.from({ length: techElementsCount }, (_, i) => {
    return {
      id: i,
      size: 20 + Math.random() * 40,
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      rotationSpeed: 0.5 + Math.random() * 2,
      floatSpeed: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      type: Math.floor(Math.random() * 4)
    }
  })
}

// 初始化数据流动画
const initDataFlows = () => {
  dataFlows.value = Array.from({ length: dataFlowsCount }, (_, i) => {
    return {
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      length: 100 + Math.random() * 200,
      width: 1 + Math.random() * 2,
      angle: Math.random() * 360,
      speed: 2 + Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.3,
      delay: Math.random() * 5
    }
  })
}

// 初始化流光粒子
const initFlowingLights = () => {
  flowingLights.value = Array.from({ length: flowingLightsCount }, (_, i) => {
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 8,
      speed: 10 + Math.random() * 20,
      delay: Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.7
    }
  })
}

// 窗口大小变化处理
const handleResize = () => {
  initDigitalRain()
  windowWidth.value = window.innerWidth
  isMobile.value = window.innerWidth <= 768

  if (threeRenderer) {
    threeRenderer.setSize(window.innerWidth, window.innerHeight)
    threeCamera.aspect = window.innerWidth / window.innerHeight
    threeCamera.updateProjectionMatrix()
  }
}

// 创建星星元素
const createStars = () => {
  if (!star.value || !star.value.length) {
    star.value = []
    const container = document.querySelector('.star-container')
    if (!container) return

    container.innerHTML = ''

    for (let i = 0; i < starsCount.value; i++) {
      const starElement = document.createElement('div')
      starElement.classList.add('star')

      const centerX = 50
      const centerY = 50
      const radius = 40

      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * radius
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      starElement.style.left = `${x}%`
      starElement.style.top = `${y}%`

      container.appendChild(starElement)
      star.value.push(starElement)
    }
  }
}

// 初始化星空
const initStars = () => {
  if (!star.value) return

  star.value.forEach((item) => {
    let speed = 0.2 + Math.random() * 1
    let dis = distance + Math.random() * 300
    item.style.transformOrigin = `0 0 ${dis}px`
    item.style.transform = `translate3d(0,0,-${dis}px)
    rotateY(${Math.random() * 360}deg)
    rotateX(${Math.random() * -50}deg)
    scale(${speed},${speed})`
  })
}

// 初始化数字雨效果
const initDigitalRain = () => {
  nextTick(() => {
    const canvas = document.querySelector('.digital-rain')
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    digitalRainCtx.value = canvas.getContext('2d')
    digitalRainColumns.value = Math.floor(canvas.width / digitalRainFontSize)

    // 清空现有的数字雨数组
    digitalRainArr.length = 0

    // 初始化数字雨数组
    for (let i = 0; i < digitalRainColumns.value; i++) {
      digitalRainArr[i] = Math.floor(Math.random() * canvas.height / digitalRainFontSize) - 50
    }

    // 开始数字雨动画
    drawDigitalRain()
  })
}

// 绘制数字雨
const drawDigitalRain = () => {
  if (!digitalRainCtx.value) return

  // 设置半透明黑色背景，形成拖尾效果
  digitalRainCtx.value.fillStyle = 'rgba(0, 0, 0, 0.05)'
  digitalRainCtx.value.fillRect(0, 0, window.innerWidth, window.innerHeight)

  // 设置文字颜色和字体
  digitalRainCtx.value.fillStyle = 'rgba(0, 255, 170, 0.8)'
  digitalRainCtx.value.font = `${digitalRainFontSize}px monospace`

  // 逐列绘制字符
  for (let i = 0; i < digitalRainArr.length; i++) {
    // 随机选取一个字符
    const text = digitalRainLetters[Math.floor(Math.random() * digitalRainLetters.length)]

    // 计算x,y坐标
    const x = i * digitalRainFontSize
    const y = digitalRainArr[i] * digitalRainFontSize

    // 绘制字符
    digitalRainCtx.value.fillText(text, x, y)

    // 字符到底部或随机重置到顶部
    if (y > window.innerHeight && Math.random() > 0.975) {
      digitalRainArr[i] = 0
    } else {
      digitalRainArr[i]++
    }
  }

  // 继续动画循环
  setTimeout(() => {
    requestAnimationFrame(drawDigitalRain)
  }, 50) // 控制速度
}

// 新增：流动元素初始化
const initFlowingElements = () => {
  // 添加流动线条
  addFlowingLines()
  // 添加科技网格
  addTechGrid()
}

// 添加流动线条
const addFlowingLines = () => {
  const container = document.querySelector('.flowing-lines')
  if (!container) return

  for (let i = 0; i < 15; i++) { // 增加线条数量
    const line = document.createElement('div')
    line.classList.add('flowing-line')

    // 随机位置和延迟
    const top = Math.random() * 100
    const delay = Math.random() * 10
    const duration = 15 + Math.random() * 20

    line.style.top = `${top}%`
    line.style.animationDelay = `${delay}s`
    line.style.animationDuration = `${duration}s`

    container.appendChild(line)
  }
}

// 添加科技网格
const addTechGrid = () => {
  const container = document.querySelector('.tech-grid')
  if (!container) return

  const gridSize = 20
  const rows = Math.ceil(window.innerHeight / gridSize)
  const cols = Math.ceil(window.innerWidth / gridSize)

  for (let i = 0; i < 30; i++) { // 增加节点数量
    const node = document.createElement('div')
    node.classList.add('grid-node')

    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)
    const delay = Math.random() * 10

    node.style.top = `${row * gridSize}px`
    node.style.left = `${col * gridSize}px`
    node.style.animationDelay = `${delay}s`

    container.appendChild(node)
  }
}

// 初始化Three.js场景
const initThreeJsScene = () => {
  nextTick(() => {
    // 创建场景
    threeScene = new THREE.Scene()

    // 创建相机
    threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    threeCamera.position.z = 50

    // 创建渲染器
    threeContainer.value = document.querySelector('.three-container')
    if (!threeContainer.value) return

    threeRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance', // 优先使用高性能模式
      precision: isMobile.value ? 'mediump' : 'highp', // 移动端使用中等精度
      stencil: false, // 关闭不需要的缓冲区
      depth: true,
      logarithmicDepthBuffer: false
    })
    threeRenderer.setSize(window.innerWidth, window.innerHeight)
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 限制像素比，提高性能
    threeContainer.value.appendChild(threeRenderer.domElement)

    // 创建粒子系统
    createParticleSystem()

    // 初始化时钟
    clock = new THREE.Clock()

    // 开始动画循环
    animateThreeJs()
  })
}

// 创建粒子系统
const createParticleSystem = () => {
  // 粒子几何体
  particlesGeometry = new THREE.BufferGeometry()

  // 创建大量粒子
  const particleCount = 5000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  const color = new THREE.Color()

  for (let i = 0; i < particleCount; i++) {
    // 位置随机分布在球体内
    const radius = 30 + Math.random() * 20
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) // x
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) // y
    positions[i * 3 + 2] = radius * Math.cos(phi) // z

    // 随机蓝色调
    color.setHSL(0.6 + Math.random() * 0.1, 1.0, 0.5 + Math.random() * 0.5)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    // 随机粒子大小
    sizes[i] = Math.random() * 2
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // 粒子材质
  const textureLoader = new THREE.TextureLoader()
  const particleTexture = textureLoader.load('/particle.png') // 请确保有这个纹理图片

  particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    alphaTest: 0.1,
    transparent: true,
    opacity: 0.8,
    map: particleTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  // 创建粒子系统
  particles = new THREE.Points(particlesGeometry, particlesMaterial)
  threeScene.add(particles)
}

// Three.js动画循环
const animateThreeJs = () => {
  if (!threeScene || !threeCamera || !threeRenderer) return

  const elapsedTime = clock.getElapsedTime()

  // 旋转粒子系统 - 减少移动端旋转速度
  if (particles) {
    const rotationSpeed = isMobile.value ? 0.02 : 0.05;
    particles.rotation.x = elapsedTime * rotationSpeed
    particles.rotation.y = elapsedTime * (rotationSpeed * 0.6)

    // 更新粒子大小 - 移动端减少更新频率
    if (!isMobile.value || Math.floor(elapsedTime * 2) % 3 === 0) {
      const sizes = particlesGeometry.attributes.size.array

      // 减少迭代次数
      const updateInterval = isMobile.value ? 4 : 1;
      for (let i = 0; i < sizes.length; i += updateInterval) {
        sizes[i] = Math.abs(Math.sin(elapsedTime + i)) * 2
      }

      particlesGeometry.attributes.size.needsUpdate = true
    }
  }

  // 渲染场景
  threeRenderer.render(threeScene, threeCamera)

  // 移动端降低刷新率
  if (isMobile.value) {
    // 使用16.7ms (约60fps)的节流，移动端可以用更低的刷新率
    setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateThreeJs)
    }, 20) // 约50fps，提高移动端性能
  } else {
    // 桌面端正常刷新率
    animationFrameId = requestAnimationFrame(animateThreeJs)
  }
}

// 清理Three.js资源
const disposeThreeJsScene = () => {
  if (particlesGeometry) particlesGeometry.dispose()
  if (particlesMaterial) particlesMaterial.dispose()
  if (threeRenderer) threeRenderer.dispose()

  threeScene = null
  threeCamera = null
  threeRenderer = null
  particles = null
  particlesGeometry = null
  particlesMaterial = null
}

// 鼠标移动处理
const handleMouseMove = (e) => {
  // 计算鼠标速度
  mouseVelocity.value = {
    x: e.clientX - prevMousePosition.value.x,
    y: e.clientY - prevMousePosition.value.y
  }

  // 更新前一个位置
  prevMousePosition.value = {
    x: e.clientX,
    y: e.clientY
  }

  // 直接更新位置，不使用过渡动画，避免延迟
  cursorPosition.value = {
    x: e.clientX,
    y: e.clientY
  }

  // 记录鼠标轨迹
  if (cursorEffects.value.trail) {
    cursorTrail.value.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.min(40, 20 + Math.sqrt(Math.pow(mouseVelocity.value.x, 2) + Math.pow(mouseVelocity.value.y, 2))),
      opacity: 0.8
    })

    // 限制轨迹长度
    if (cursorTrail.value.length > maxTrailLength) {
      cursorTrail.value.shift()
    }
  }

  // 鼠标移动时触发光晕效果
  cursorGlowing.value = Math.sqrt(Math.pow(mouseVelocity.value.x, 2) + Math.pow(mouseVelocity.value.y, 2)) > 5

  // 调整光标大小基于移动速度
  cursorSize.value = 40 + Math.min(30, Math.sqrt(Math.pow(mouseVelocity.value.x, 2) + Math.pow(mouseVelocity.value.y, 2)) * 0.5)

  // 只在用户交互激活时执行
  if (userInteractionActive.value) {
    // 让粒子系统稍微跟随鼠标
    if (particles) {
      particles.rotation.x += (e.movementY * 0.0005)
      particles.rotation.y += (e.movementX * 0.0005)
    }

    // 调整光环位置略微跟随鼠标
    const circles = document.querySelectorAll('.neon-circle')
    circles.forEach(circle => {
      const rect = circle.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // 计算鼠标和中心的差值，但只移动很小的距离
      const offsetX = (e.clientX - centerX) * 0.01
      const offsetY = (e.clientY - centerY) * 0.01

      circle.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${circle.dataset.scale || 1})`
    })

    // 鼠标快速移动时添加流光效果
    if (cursorEffects.value.highlight &&
      Math.sqrt(Math.pow(mouseVelocity.value.x, 2) + Math.pow(mouseVelocity.value.y, 2)) > 20) {
      createHighlightEffect(e.clientX, e.clientY, mouseVelocity.value)
    }
  }
}

// 点击交互效果
const handleClick = (e) => {
  // 切换交互状态
  userInteractionActive.value = !userInteractionActive.value

  // 创建点击涟漪效果
  createRippleEffect(e.clientX, e.clientY)

  // 创建点击轨迹特效
  createClickTrail(e.clientX, e.clientY)
}

// 创建点击涟漪效果
const createRippleEffect = (x, y) => {
  const ripple = document.createElement('div')
  ripple.classList.add('ripple-effect')
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  document.body.appendChild(ripple)

  // 动画结束后移除元素
  setTimeout(() => {
    ripple.style.opacity = '0'
    setTimeout(() => {
      if (document.body.contains(ripple)) {
        document.body.removeChild(ripple)
      }
    }, 300)
  }, 700)
}

// 新增：创建鼠标高速移动时的流光效果
const createHighlightEffect = (x, y, velocity) => {
  const highlight = document.createElement('div')
  highlight.classList.add('cursor-highlight')

  // 根据移动方向设置形状和角度
  const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI)
  const speed = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2))

  highlight.style.left = `${x}px`
  highlight.style.top = `${y}px`
  highlight.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${Math.min(1, speed / 40)})`
  document.body.appendChild(highlight)

  // 动画结束后移除元素
  setTimeout(() => {
    if (document.body.contains(highlight)) {
      document.body.removeChild(highlight)
    }
  }, 300)
}

// 新增：创建点击后的科技轨迹效果
const createClickTrail = (x, y) => {
  // 创建多个粒子效果
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div')
    particle.classList.add('click-particle')

    // 随机方向和距离
    const angle = (i / 12) * Math.PI * 2
    const distance = 60 + Math.random() * 40

    // 设置初始位置和样式
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.setProperty('--angle', `${angle}rad`)
    particle.style.setProperty('--distance', `${distance}px`)
    particle.style.setProperty('--delay', `${Math.random() * 0.2}s`)

    document.body.appendChild(particle)

    // 动画结束后移除元素
    setTimeout(() => {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle)
      }
    }, 1000)
  }

  // 创建科技圆环效果
  const techCircle = document.createElement('div')
  techCircle.classList.add('tech-click-circle')
  techCircle.style.left = `${x}px`
  techCircle.style.top = `${y}px`
  document.body.appendChild(techCircle)

  setTimeout(() => {
    if (document.body.contains(techCircle)) {
      document.body.removeChild(techCircle)
    }
  }, 1000)
}

// 组件卸载时确保重置滚动条设置
onUnmounted(() => {
  // 恢复正常滚动
  document.documentElement.style.overflow = 'auto'
  document.body.style.overflow = 'auto'
  document.documentElement.classList.remove('start-page')

  // 移除所有可能禁用滚动条的内联样式
  document.documentElement.style.maxHeight = 'none'
  document.body.style.maxHeight = 'none'
  document.documentElement.style.height = 'auto'
  document.body.style.height = 'auto'

  // 确保#app的样式也被重置
  const appElement = document.getElementById('app')
  if (appElement) {
    appElement.style.overflow = 'auto'
    appElement.style.maxHeight = 'none'
    appElement.style.height = 'auto'
  }

  // 停止动画循环
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div class="container" :style="{
    background: `linear-gradient(135deg, ${themes[backgroundTheme].from}, ${themes[backgroundTheme].to})`
  }" @mousemove="handleMouseMove">
    <!-- 扫描线 -->
    <div class="scan-lines"></div>

    <!-- 新增科技效果 -->
    <div class="hologram-effect"></div>
    <div class="circuit-pattern"></div>
    <div class="quantized-grid"></div>

    <!-- 雷达扫描 -->
    <div class="radar-scan">
      <div class="radar-beam"></div>
    </div>

    <!-- 加载环 -->
    <div class="loading-ring">
      <div class="ring-progress"></div>
    </div>

    <!-- 数据可视化 -->
    <div class="data-visualization">
      <div class="data-bars-container">
        <div class="data-bar"></div>
        <div class="data-bar"></div>
        <div class="data-bar"></div>
        <div class="data-bar"></div>
        <div class="data-bar"></div>
        <div class="data-bar"></div>
        <div class="data-bar"></div>
        <div class="data-bar"></div>
      </div>
    </div>

    <!-- 全息UI面板 -->
    <div class="hologram-ui">
      <div class="holo-panel panel-1"></div>
      <div class="holo-panel panel-2"></div>
    </div>

    <!-- 浮动数据标签 -->
    <div class="floating-data-tags">
      <div class="data-tag tag-1">SYSTEM.STATUS: ACTIVE</div>
      <div class="data-tag tag-2">NET.CONNECT: SECURE</div>
      <div class="data-tag tag-3">DATA.SYNC: 98.2%</div>
    </div>

    <!-- 飞行数据粒子 -->
    <div class="flying-data">
      <div v-for="i in 20" :key="`data-particle-${i}`" class="data-particle" :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${5 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 5}s`
      }"></div>
    </div>

    <!-- 流光效果层 -->
    <div class="flowing-lights-container">
      <div v-for="light in flowingLights" :key="light.id" class="flowing-light" :style="{
        left: `${light.x}%`,
        top: `${light.y}%`,
        width: `${light.size}px`,
        height: `${light.size}px`,
        animationDuration: `${light.speed}s`,
        animationDelay: `${light.delay}s`,
        opacity: light.opacity
      }"></div>
    </div>

    <!-- 数据流动画 -->
    <div class="data-flows-container">
      <div v-for="flow in dataFlows" :key="flow.id" class="data-flow" :style="{
        left: `${flow.startX}%`,
        top: `${flow.startY}%`,
        width: `${flow.length}px`,
        height: `${flow.width}px`,
        transform: `rotate(${flow.angle}deg)`,
        animationDuration: `${flow.speed}s`,
        animationDelay: `${flow.delay}s`,
        opacity: flow.opacity
      }"></div>
    </div>

    <!-- 脉冲边框 -->
    <div class="pulse-border top"></div>
    <div class="pulse-border right"></div>
    <div class="pulse-border bottom"></div>
    <div class="pulse-border left"></div>

    <!-- Three.js容器 -->
    <div class="three-container"></div>

    <!-- 星空背景 -->
    <div class="stars-wrapper">
      <div class="stars">
        <div class="star-container"></div>
      </div>
    </div>

    <!-- 网格背景 -->
    <div class="grid-overlay" :class="{ 'flowing-active': flowingEffectActive }"></div>

    <!-- 科技网格节点 -->
    <div class="tech-grid"></div>

    <!-- 流动线条 -->
    <div class="flowing-lines"></div>

    <!-- 数据流 -->
    <div class="data-streams">
      <div class="data-stream stream1"></div>
      <div class="data-stream stream2"></div>
      <div class="data-stream stream3"></div>
    </div>

    <!-- 代码雨效果 -->
    <canvas class="digital-rain"></canvas>

    <!-- 动态圆环特效 -->
    <div class="neon-circles" :class="{ 'pulse-strong': neonRingActive }">
      <div class="neon-circle circle1"></div>
      <div class="neon-circle circle2"></div>
      <div class="neon-circle circle3"></div>
    </div>

    <!-- 光线效果 -->
    <div class="light-beams">
      <div class="light-beam beam1"></div>
      <div class="light-beam beam2"></div>
      <div class="light-beam beam3"></div>
    </div>

    <!-- 新增流光粒子 -->
    <div class="glowing-particles">
      <div v-for="i in 20" :key="i" class="glow-particle" :style="{
        '--delay': `${Math.random() * 10}s`,
        '--duration': `${10 + Math.random() * 20}s`,
        '--size': `${3 + Math.random() * 5}px`,
        '--top': `${Math.random() * 100}%`,
        '--left': `${Math.random() * 100}%`
      }"></div>
    </div>

    <!-- 文本和按钮区域 -->
    <div class="text-container" :class="{ 'neon-active': neonRingActive, 'cyber-pulse': cyberpunkElementsActive }">
      <!-- 科技装饰元素 -->
      <div class="cyber-decor decor-top"></div>
      <div class="cyber-decor decor-bottom"></div>
      <div class="corner-decor top-left"></div>
      <div class="corner-decor top-right"></div>
      <div class="corner-decor bottom-left"></div>
      <div class="corner-decor bottom-right"></div>

      <!-- 新增科幻装饰线条 -->
      <div class="cyber-lines">
        <div class="cyber-line line1"></div>
        <div class="cyber-line line2"></div>
        <div class="cyber-line line3"></div>
        <div class="cyber-line line4"></div>
      </div>

      <div class="text" :class="{ 'text-glow-active': textGlowActive }">
        <div class="glitch-wrapper">
          <span class="main-title" data-text="KingCola-ICG">KingCola-ICG</span>
          <div class="title-underline"></div>
        </div>
        <p class="sub-title">创新技术 · 未来体验</p>
        <div class="tech-badges">
          <span class="tech-badge">Innovation</span>
          <span class="tech-badge">Create</span>
          <span class="tech-badge">Guide</span>
        </div>
        <!-- 新增科技标语 -->
        <div class="tech-slogan">
          <div class="typing-text">探索未知 · 引领科技 · 创造未来</div>
        </div>
        <div class="button-container">
          <button class="cyber-button" @click="enterWebsite">
            <div class="button-glitch"></div>
            <span class="button-content">
              <span class="cyber-button__text">进入官网</span>
              <span class="cyber-button__tag">COME</span>
            </span>
            <div class="button-glitch-effect"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- 光晕效果 -->
    <div class="glow-overlay"></div>

    <!-- 鼠标跟随效果增强 -->
    <div class="cursor-follower" :style="{
      left: cursorPosition.x + 'px',
      top: cursorPosition.y + 'px',
      width: cursorSize + 'px',
      height: cursorSize + 'px',
      opacity: cursorGlowing ? '0.8' : '0.5'
    }" :class="{ 'cursor-glow': cursorGlowing }"></div>

    <!-- 鼠标轨迹 -->
    <div v-for="(point, index) in cursorTrail" :key="index" class="cursor-trail" :style="{
      left: point.x + 'px',
      top: point.y + 'px',
      width: point.size + 'px',
      height: point.size + 'px',
      opacity: point.opacity * (index / cursorTrail.length)
    }"></div>

    <!-- 科技网格光标 -->
    <div class="tech-cursor" :style="{
      left: cursorPosition.x + 'px',
      top: cursorPosition.y + 'px'
    }">
      <div class="tech-cursor-inner"></div>
      <div class="tech-cursor-ring"></div>
      <div class="tech-cursor-cross h-line"></div>
      <div class="tech-cursor-cross v-line"></div>
      <div class="tech-cursor-dot"></div>
    </div>

    <!-- 悬浮科技元素 -->
    <div class="floating-tech-elements">
      <div v-for="element in techElements" :key="element.id" class="tech-element"
        :class="[`element-type-${element.type}`]" :style="{
          width: `${element.size}px`,
          height: `${element.size}px`,
          left: `${element.posX}%`,
          top: `${element.posY}%`,
          animationDuration: `${element.floatSpeed}s`,
          animationDelay: `${element.delay}s`,
          '--rotation-speed': `${element.rotationSpeed}s`
        }">
        <div class="tech-element-inner"></div>
      </div>
    </div>

    <!-- 网格辐射背景 -->
    <div class="radial-grid"></div>

    <!-- 科技数据面板 -->
    <div class="tech-panels">
      <div class="tech-panel panel-left"></div>
      <div class="tech-panel panel-right"></div>
    </div>

    <!-- HUD角落装饰 -->
    <div class="hud-corners">
      <div class="hud-corner top-left"></div>
      <div class="hud-corner top-right"></div>
      <div class="hud-corner bottom-left"></div>
      <div class="hud-corner bottom-right"></div>
    </div>

    <!-- 新增电路线 -->
    <div class="circuit-lines-container">
      <div v-for="line in circuitLines" :key="`circuit-line-${line.id}`" class="circuit-line" :style="{
        left: `${line.startX}%`,
        top: `${line.startY}%`,
        width: `${line.length}px`,
        height: `${line.width}px`,
        transform: `rotate(${line.angle}deg)`,
        opacity: line.opacity,
        backgroundColor: line.color,
        animationDuration: `${line.speed}s`,
        animationDelay: `${line.delay}s`
      }">
        <div v-for="i in line.segments" :key="`segment-${i}`" class="circuit-segment" :style="{
          left: `${(i - 1) * (100 / line.segments)}%`,
          animationDelay: `${line.delay + i * 0.2}s`
        }"></div>
      </div>
    </div>

    <!-- 新增浮动形状 -->
    <div class="floating-shapes-container">
      <div v-for="shape in floatingShapes" :key="`floating-shape-${shape.id}`" class="floating-shape" :class="[
        `shape-type-${shape.type}`,
        { 'border-only': shape.borderOnly }
      ]" :style="{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        opacity: shape.opacity,
        '--rotation-speed': `${shape.rotationSpeed}s`,
        '--float-amplitude': `${shape.floatAmplitude}px`,
        '--float-speed': `${shape.floatSpeed}s`,
        animationDelay: `${shape.delay}s`
      }"></div>
    </div>

    <!-- 新增能量脉冲 -->
    <div class="energy-pulses-container">
      <div v-for="pulse in energyPulses" :key="`energy-pulse-${pulse.id}`" class="energy-pulse" :style="{
        left: `${pulse.x}%`,
        top: `${pulse.y}%`,
        width: `${pulse.size}px`,
        height: `${pulse.size}px`,
        animationDuration: `${pulse.speed}s`,
        animationDelay: `${pulse.delay}s`,
        opacity: pulse.opacity,
        backgroundColor: pulse.color
      }"></div>
    </div>

    <!-- 新增装饰粒子 -->
    <div class="decorative-particles-container">
      <div v-for="particle in decorativeParticles" :key="`decorative-particle-${particle.id}`"
        class="decorative-particle" :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
          '--direction': `${particle.direction}deg`,
          '--pulse-duration': `${particle.pulse}s`,
          animationDuration: `${particle.speed}s`,
          animationDelay: `${particle.delay}s`
        }"></div>
    </div>

    <!-- 新增能量弧 -->
    <div class="energy-arcs-container">
      <svg width="100%" height="100%" class="energy-arcs-svg">
        <path v-for="arc in energyArcs" :key="`energy-arc-${arc.id}`" class="energy-arc"
          :d="`M${arc.startX}% ${arc.startY}% Q50% 50% ${arc.endX}% ${arc.endY}%`" :style="{
            stroke: arc.color,
            strokeWidth: `${arc.thickness}px`,
            opacity: arc.opacity,
            animationDuration: `${arc.duration}s`,
            animationDelay: `${arc.delay}s`
          }"></path>
      </svg>
    </div>
  </div>
</template>

<!-- 全局样式，确保滚动条彻底禁用 -->
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}

/* 针对所有可能的滚动条元素 */
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
  -webkit-appearance: none !important;
}

* {
  scrollbar-width: none !important;
  /* Firefox */
  -ms-overflow-style: none !important;
  /* IE and Edge */
}

/* 确保容器不会导致滚动 */
.container,
#app,
#app>div {
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden !important;
}

/* 修改全局样式，仅在当前组件中禁用滚动条 */
.container {
  overflow: hidden !important;
}

/* 其他页面正常显示滚动条 */
#app>div:not(.container) {
  overflow: auto !important;
  max-height: none !important;
}

html:not(.start-page) body,
html:not(.start-page) {
  overflow: auto !important;
  height: auto !important;
  max-height: none !important;
}
</style>

<style scoped lang="scss">
/* 导入多种字体 */
@font-face {
  font-family: '阿里妈妈灵动体 VF Thin';
  src:
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/MU1lXRzLFGsC.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/G5e7O2azklS2.woff') format('woff');
  font-display: swap;
}

/* 更多赛博朋克字体 */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

/* 全局变量 */
:root {
  --neon-color: #00f3ff;
  --neon-secondary: #ff00ff;
  --neon-tertiary: #7b00ff;
  --neon-shadow: #00f3ff;
  --primary-gradient: linear-gradient(90deg, #00c6ff, #0072ff, #00c6ff, #0072ff);
  --primary-gradient-alt: linear-gradient(90deg, #3a7bd5, #00d2ff, #3a7bd5, #00d2ff);
  --button-gradient: linear-gradient(90deg, #00c6ff, #0072ff, #00ffe7, #0072ff);
  --text-gradient: linear-gradient(90deg, #00f3ff, #0072ff, #7b00ff, #ff00ff, #00f3ff);
  --animated-gradient: linear-gradient(270deg, #fc00ff, #00dbde, #fc00ff, #00f3ff);
  --beam-color: rgba(0, 247, 255, 0.1);
  --brand-color: #00f3ff;
  --cyber-pink: #ff2d75;
  --cyber-blue: #0ff;
  --cyber-purple: #7000ff;
  --cyber-dark: #020E30;
  --cyber-glow: 0 0 20px rgba(0, 243, 255, 0.7);
  --tech-accent: #5efaff;
  --glow-strength: 4px;
}

/* 禁用滚动条 */
:deep(html),
:deep(body) {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
  height: 100%;
  width: 100%;
  /* 添加硬件加速 */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
}

/* 隐藏滚动条但保留功能 */
:deep(::-webkit-scrollbar) {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 10s ease;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  box-sizing: border-box;
  /* 加强硬件加速 */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  will-change: transform;
}

/* Three.js容器 */
.three-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

/* 星空效果 */
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }

  100% {
    transform: perspective(400px) rotateZ(10deg) rotateX(0deg) rotateY(-360deg);
  }
}

.stars-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.stars {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 500px;
  transform: translate(-50%, -50%);
  animation: rotateSlower 300s infinite linear;
}

.star-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.star {
  width: 2px;
  height: 2px;
  background-color: #f7f7b8;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 50%;
  box-shadow: 0 0 4px #f7f7b8;
  opacity: 0.8;
  transition: all 0.3s ease;
}

/* 网格背景 - 增强流动效果 */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(18, 24, 41, 0.7) 1px, transparent 1px),
    linear-gradient(90deg, rgba(18, 24, 41, 0.7) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 3;
  pointer-events: none;
  opacity: 0.3;
  animation: gridMove 200s linear infinite;
  transition: opacity 3s ease, background-size 5s ease;
}

.flowing-active {
  opacity: 0.5;
  background-size: 50px 50px;
}

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 40px 40px;
  }
}

/* 科技网格节点 */
.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.grid-node {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: var(--tech-accent);
  border-radius: 50%;
  opacity: 0;
  animation: nodeGlow 8s ease-in-out infinite;
}

@keyframes nodeGlow {

  0%,
  100% {
    opacity: 0;
    box-shadow: none;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    box-shadow: 0 0 10px var(--tech-accent);
    transform: scale(1.5);
  }
}

/* 流动线条 */
.flowing-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.flowing-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(0, 243, 255, 0) 15%,
      rgba(0, 243, 255, 0.5) 50%,
      rgba(0, 243, 255, 0) 85%,
      transparent 100%);
  animation: flowingLineMove 30s linear infinite;
  opacity: 0.3;
}

@keyframes flowingLineMove {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* 数据流效果 */
.data-streams {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.data-stream {
  position: absolute;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg,
      transparent 0%,
      rgba(0, 243, 255, 0.1) 10%,
      rgba(0, 243, 255, 0.4) 50%,
      rgba(0, 243, 255, 0.1) 90%,
      transparent 100%);
  animation: dataStreamFlow 15s linear infinite;
}

.stream1 {
  left: 20%;
  animation-delay: 0s;
}

.stream2 {
  left: 50%;
  animation-delay: 5s;
}

.stream3 {
  left: 80%;
  animation-delay: 10s;
}

@keyframes dataStreamFlow {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  20%,
  80% {
    opacity: 1;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

/* 霓虹圆环效果 */
.neon-circles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  transition: all 3s ease;
}

.pulse-strong .neon-circle {
  animation-duration: 4s !important;
  filter: brightness(1.2);
}

.neon-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px var(--neon-color);
  animation: pulseNeon 8s infinite, colorShift 40s infinite;
  transition: all 3s ease;
}

.circle1 {
  width: 500px;
  height: 500px;
  top: 30%;
  left: 50%;
  border-color: rgba(0, 243, 255, 0.3);
  animation-delay: 0s;
}

.circle2 {
  width: 700px;
  height: 700px;
  top: 50%;
  left: 50%;
  border-color: rgba(0, 243, 255, 0.2);
  animation-delay: 2s;
}

.circle3 {
  width: 900px;
  height: 900px;
  top: 50%;
  left: 50%;
  border-color: rgba(0, 243, 255, 0.1);
  animation-delay: 4s;
}

@keyframes pulseNeon {
  0% {
    transform: translate(-50%, -50%) scale(0.95);
    opacity: 0.4;
  }

  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }

  100% {
    transform: translate(-50%, -50%) scale(0.95);
    opacity: 0.4;
  }
}

@keyframes colorShift {
  0% {
    border-color: rgba(0, 243, 255, 0.3);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.7);
  }

  25% {
    border-color: rgba(58, 123, 213, 0.3);
    box-shadow: 0 0 15px rgba(58, 123, 213, 0.7);
  }

  50% {
    border-color: rgba(0, 210, 255, 0.3);
    box-shadow: 0 0 15px rgba(0, 210, 255, 0.7);
  }

  75% {
    border-color: rgba(123, 0, 255, 0.3);
    box-shadow: 0 0 15px rgba(123, 0, 255, 0.7);
  }

  100% {
    border-color: rgba(0, 243, 255, 0.3);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.7);
  }
}

/* 光线特效 */
.light-beams {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.4;
}

.light-beam {
  position: absolute;
  background: var(--beam-color);
  width: 200px;
  height: 100vh;
  transform: rotate(45deg) scale(2);
  filter: blur(40px);
  animation: beamMove 20s infinite linear;
}

.beam1 {
  top: -10%;
  left: 20%;
  animation-delay: 0s;
  background: linear-gradient(transparent, rgba(0, 247, 255, 0.15), transparent);
}

.beam2 {
  top: 10%;
  left: 60%;
  animation-delay: 7s;
  transform: rotate(-45deg) scale(2);
  background: linear-gradient(transparent, rgba(123, 0, 255, 0.1), transparent);
}

.beam3 {
  top: 40%;
  left: 30%;
  animation-delay: 14s;
  background: linear-gradient(transparent, rgba(255, 0, 255, 0.08), transparent);
}

@keyframes beamMove {
  0% {
    transform: rotate(45deg) scale(2) translateX(-100vh);
  }

  100% {
    transform: rotate(45deg) scale(2) translateX(100vh);
  }
}

/* 数字雨效果 */
.digital-rain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
  opacity: 0.2;
}

/* 新增流光粒子 */
.glowing-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

.glow-particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.8) 0%, rgba(0, 243, 255, 0) 70%);
  width: var(--size);
  height: var(--size);
  top: var(--top);
  left: var(--left);
  animation: particleFloat var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
  transform-origin: center;
  opacity: 0;
  filter: blur(2px);
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) translateX(0) scale(0.2) rotate(0deg);
    opacity: 0;
  }

  20% {
    opacity: 0.8;
  }

  50% {
    transform: translateY(-100px) translateX(50px) scale(1) rotate(180deg);
    opacity: 1;
  }

  80% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(0) translateX(0) scale(0.2) rotate(360deg);
    opacity: 0;
  }
}

/* 文本容器样式 */
.text-container {
  position: relative;
  z-index: 10;
  text-align: center;
  transition: all 2s ease;
  animation: floating 10s ease-in-out infinite;
  user-select: none;
  padding: 2rem;
  min-width: 460px;
  max-width: 700px;
}

.neon-active {
  filter: drop-shadow(0 0 8px var(--brand-color)) drop-shadow(0 0 12px var(--brand-color));
}

.cyber-pulse {
  animation: cyberPulse 5s infinite alternate;
}

@keyframes cyberPulse {
  0% {
    filter: drop-shadow(0 0 8px var(--brand-color)) brightness(1);
  }

  100% {
    filter: drop-shadow(0 0 15px var(--brand-color)) brightness(1.2);
  }
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0px);
  }
}

/* 科技装饰元素 */
.cyber-decor {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg,
      transparent 0%,
      var(--tech-accent) 50%,
      transparent 100%);
  width: 80%;
  left: 10%;
  animation: decorPulse 5s infinite alternate;
}

.decor-top {
  top: 0;
}

.decor-bottom {
  bottom: 0;
}

@keyframes decorPulse {
  0% {
    opacity: 0.3;
    width: 60%;
    left: 20%;
  }

  100% {
    opacity: 0.8;
    width: 80%;
    left: 10%;
  }
}

.corner-decor {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--tech-accent);
  opacity: 0.7;
  animation: cornerGlow 4s infinite alternate;
}

.top-left {
  top: 0;
  left: 0;
  border-top: 2px solid;
  border-left: 2px solid;
}

.top-right {
  top: 0;
  right: 0;
  border-top: 2px solid;
  border-right: 2px solid;
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid;
  border-left: 2px solid;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

@keyframes cornerGlow {
  0% {
    box-shadow: 0 0 5px var(--tech-accent);
  }

  100% {
    box-shadow: 0 0 15px var(--tech-accent);
  }
}

/* 新增科幻线条装饰 */
.cyber-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.cyber-line {
  position: absolute;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(0, 243, 255, 0.3) 30%,
      rgba(0, 243, 255, 0.5) 50%,
      rgba(0, 243, 255, 0.3) 70%,
      transparent 100%);
  height: 1px;
  width: 100px;
  animation: cyberLineScan 8s infinite linear;
}

.line1 {
  top: 40px;
  left: -100px;
  animation-delay: 0s;
}

.line2 {
  top: 60px;
  left: -100px;
  animation-delay: 2s;
}

.line3 {
  bottom: 60px;
  left: -100px;
  animation-delay: 4s;
}

.line4 {
  bottom: 40px;
  left: -100px;
  animation-delay: 6s;
}

@keyframes cyberLineScan {
  0% {
    left: -100px;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    left: calc(100% + 100px);
    opacity: 0;
  }
}

/* 文本样式 */
.text {
  color: #fbfbfb;
  text-align: center;
  font-family: 'Rajdhani', '阿里妈妈灵动体 VF Thin', sans-serif;
  letter-spacing: 10px;
  cursor: default;
  opacity: 0;
  animation: animate 1.5s linear forwards;
  transition: all 2s ease;
  position: relative;
  z-index: 10;
  padding: 3rem;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  box-shadow:
    0 0 20px rgba(0, 120, 255, 0.2),
    inset 0 0 20px rgba(0, 243, 255, 0.1);
  border: 1px solid rgba(0, 243, 255, 0.1);
}

/* 主标题效果 - 修复不显示问题 */
.main-title {
  display: block;
  font-size: 4em;
  font-style: italic;
  font-weight: 700;
  position: relative;
  letter-spacing: 10px;
  margin: 0;
  font-family: 'Rajdhani', 'Audiowide', sans-serif;
  user-select: none;

  /* 增强的流光效果 */
  color: white;
  text-shadow:
    0 0 5px rgba(0, 243, 255, 0.8),
    0 0 10px rgba(0, 243, 255, 0.6),
    0 0 15px rgba(0, 243, 255, 0.4);

  /* 流光背景渐变 */
  background-image: linear-gradient(90deg,
      #00f3ff 0%,
      #0072ff 15%,
      #7b00ff 30%,
      #ff00ff 45%,
      #00f3ff 60%,
      #0072ff 75%,
      #7b00ff 90%,
      #00f3ff 100%);
  background-size: 800% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: rgba(255, 255, 255, 0.1);
  /* 更透明，让渐变更明显 */

  /* 更慢的动画 */
  animation: textBackgroundFlowing 120s infinite linear;
  position: relative;
}

/* 新的流光动画 */
@keyframes textBackgroundFlowing {
  0% {
    background-position: 0% 50%;
    text-shadow:
      0 0 5px rgba(0, 243, 255, 0.8),
      0 0 10px rgba(0, 243, 255, 0.6);
  }

  100% {
    background-position: 800% 50%;
    text-shadow:
      0 0 5px rgba(0, 243, 255, 0.8),
      0 0 10px rgba(0, 243, 255, 0.6);
  }
}

/* 添加霓虹边缘效果 */
.main-title::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  color: transparent;
  font-size: 1em;
  letter-spacing: 10px;
  -webkit-text-stroke: 1px rgba(0, 243, 255, 0.4);
  filter: blur(4px);
  animation: neonPulse 8s infinite alternate;
}

@keyframes neonPulse {
  0% {
    opacity: 0.5;
    filter: blur(4px);
  }

  50% {
    opacity: 0.8;
    filter: blur(6px);
  }

  100% {
    opacity: 0.5;
    filter: blur(4px);
  }
}

/* 添加动态光束扫描效果 */
.main-title::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%);
  transform: skewX(-30deg);
  animation: lightBeam 12s infinite;
  animation-timing-function: ease-in-out;
  pointer-events: none;
}

@keyframes lightBeam {
  0% {
    left: -100%;
  }

  30%,
  70% {
    left: 200%;
  }

  100% {
    left: -100%;
  }
}

/* 文字流光效果 - 修改为超级缓慢的变化 */
.text-glow-active .main-title {
  animation: textBackgroundFlowing 120s infinite linear, textGlowSlow 60s linear infinite;
}

@keyframes textGlowSlow {
  0% {
    filter: hue-rotate(0deg) brightness(1);
    text-shadow:
      0 0 5px rgba(0, 243, 255, 0.8),
      0 0 10px rgba(0, 243, 255, 0.6),
      0 0 15px rgba(0, 243, 255, 0.4);
  }

  25% {
    filter: hue-rotate(90deg) brightness(1.05);
    text-shadow:
      0 0 5px rgba(61, 0, 255, 0.8),
      0 0 10px rgba(61, 0, 255, 0.6),
      0 0 15px rgba(61, 0, 255, 0.4);
  }

  50% {
    filter: hue-rotate(180deg) brightness(1.1);
    text-shadow:
      0 0 5px rgba(123, 0, 255, 0.8),
      0 0 10px rgba(123, 0, 255, 0.6),
      0 0 15px rgba(123, 0, 255, 0.4);
  }

  75% {
    filter: hue-rotate(270deg) brightness(1.05);
    text-shadow:
      0 0 5px rgba(185, 0, 255, 0.8),
      0 0 10px rgba(185, 0, 255, 0.6),
      0 0 15px rgba(185, 0, 255, 0.4);
  }

  100% {
    filter: hue-rotate(360deg) brightness(1);
    text-shadow:
      0 0 5px rgba(0, 243, 255, 0.8),
      0 0 10px rgba(0, 243, 255, 0.6),
      0 0 15px rgba(0, 243, 255, 0.4);
  }
}

/* 标题下划线 */
.title-underline {
  position: relative;
  height: 3px;
  background: var(--animated-gradient);
  background-size: 300% 100%;
  margin: 10px auto 0;
  width: 0;
  animation: underlineGrow 2s forwards, backgroundPulse 10s infinite linear;
}

@keyframes underlineGrow {
  0% {
    width: 0;
  }

  100% {
    width: 80%;
  }
}

@keyframes backgroundPulse {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 300% 50%;
  }
}

/* 副标题样式 */
.sub-title {
  font-size: 1.2em;
  letter-spacing: 6px;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  animation: pulseText 8s infinite;
  font-family: 'Share Tech Mono', monospace;
  user-select: none;
}

@keyframes pulseText {
  0% {
    opacity: 0.7;
    text-shadow: 0 0 5px rgba(0, 243, 255, 0.7);
  }

  50% {
    opacity: 1;
    text-shadow: 0 0 15px rgba(0, 243, 255, 1), 0 0 30px rgba(0, 243, 255, 0.5);
  }

  100% {
    opacity: 0.7;
    text-shadow: 0 0 5px rgba(0, 243, 255, 0.7);
  }
}

/* 技术标签 */
.tech-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tech-badge {
  background: rgba(0, 20, 40, 0.7);
  color: var(--tech-accent);
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  letter-spacing: 1px;
  border: 1px solid rgba(0, 243, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
  animation: badgePulse 4s infinite alternate;
  user-select: none;
}

@keyframes badgePulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
  }

  100% {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.4);
  }
}

/* 新增：科技标语 */
.tech-slogan {
  margin: 20px 0;
  min-height: 24px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  letter-spacing: 2px;
  overflow: hidden;
}

.typing-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid var(--cyber-blue);
  animation: typing 6s steps(40) infinite, blink-caret 0.75s step-end infinite;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 5px var(--cyber-blue);
}

@keyframes typing {
  0% {
    width: 0;
  }

  50% {
    width: 100%;
  }

  55% {
    width: 100%;
  }

  100% {
    width: 0;
  }
}

@keyframes blink-caret {

  from,
  to {
    border-color: transparent;
  }

  50% {
    border-color: var(--cyber-blue);
  }
}

/* 按钮容器 */
.button-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

/* 按钮样式 */
.cyber-button {
  position: relative;
  padding: 0.7rem 3rem;
  background: transparent;
  font-size: 1.2rem;
  border: none;
  border-radius: 25px;
  color: white;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  margin: 0 auto;
}

.button-content {
  position: relative;
  z-index: 10;
  display: block;
  padding: 0.7rem 2rem;
  background: rgba(13, 50, 77, 0.6);
  border-radius: 25px;
  box-shadow:
    0 0 20px rgba(0, 198, 255, 0.5),
    inset 0 0 8px rgba(0, 198, 255, 0.3);
  transition: all 0.3s ease;
}

.cyber-button:hover .button-content {
  background: rgba(0, 20, 40, 0.7);
  transform: scale(1.05);
  box-shadow:
    0 0 30px rgba(0, 198, 255, 0.7),
    inset 0 0 12px rgba(0, 198, 255, 0.5);
}

.cyber-button:active .button-content {
  transform: scale(0.95);
}

.cyber-button__text {
  position: relative;
  z-index: 10;
  font-weight: 600;
  font-family: 'Rajdhani', sans-serif;
  text-shadow: 0 0 5px rgba(0, 198, 255, 0.5);
}

/* 按钮故障效果 */
.button-glitch-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg,
      transparent 0%,
      rgba(0, 243, 255, 0.2) 50%,
      transparent 100%);
  z-index: 0;
  transform: translateX(-100%);
  animation: buttonGlitch 5s infinite;
}

@keyframes buttonGlitch {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  10%,
  90% {
    opacity: 0.7;
  }

  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* 新增：按钮故障效果 */
.button-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 9;
  border-radius: 25px;
  background: var(--animated-gradient);
  background-size: 300% 100%;
  animation: buttonGlitchEffect 10s infinite;
}

@keyframes buttonGlitchEffect {

  0%,
  90%,
  100% {
    opacity: 0;
    transform: scale(1);
  }

  92%,
  94%,
  96%,
  98% {
    opacity: 0.8;
    transform: scale(1.05);
    background-position: 100% 50%;
  }

  93%,
  95%,
  97%,
  99% {
    opacity: 0;
    transform: scale(1);
    background-position: 0% 50%;
  }
}

/* 按钮标签 */
.cyber-button__tag {
  position: absolute;
  top: -10px;
  right: 10px;
  background: var(--cyber-pink);
  color: white;
  font-size: 0.6rem;
  padding: 2px 8px;
  border-radius: 10px;
  transform: rotate(3deg);
  font-weight: bold;
  box-shadow: 0 0 10px rgba(255, 45, 117, 0.7);
  animation: tagPulse 2s infinite;
}

@keyframes tagPulse {
  0% {
    transform: rotate(3deg) scale(1);
    opacity: 0.9;
  }

  50% {
    transform: rotate(3deg) scale(1.1);
    opacity: 1;
  }

  100% {
    transform: rotate(3deg) scale(1);
    opacity: 0.9;
  }
}

/* 新增：扫描线效果 */
.scan-line {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg,
      transparent,
      rgba(0, 243, 255, 0.2),
      rgba(0, 243, 255, 0.8),
      rgba(0, 243, 255, 0.2),
      transparent);
  z-index: 20;
  pointer-events: none;
  animation: scanLineMove 8s linear infinite;
  opacity: 0.5;
}

@keyframes scanLineMove {
  0% {
    top: -5px;
  }

  100% {
    top: 100vh;
  }

}

/* 新增：光晕效果 */
.glow-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%,
      transparent 50%,
      rgba(0, 20, 40, 0.5) 100%);
  pointer-events: none;
  z-index: 15;
  opacity: 0.5;
  animation: glowPulse 20s infinite alternate;
}

@keyframes glowPulse {
  0% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 0.3;
  }
}

/* 主要动画 */
@keyframes animate {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotateSlower {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg) rotateX(0deg) rotateY(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotateZ(10deg) rotateX(10deg) rotateY(360deg);
  }
}

/* 增强光标跟随效果 */
.cursor-follower {
  position: fixed;
  border-radius: 50%;
  border: 2px solid rgba(0, 243, 255, 0.5);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  /* 移除过渡效果以消除延迟 */
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
  backdrop-filter: blur(2px);
  transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
}

.cursor-glow {
  border-color: rgba(0, 243, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.5), 0 0 30px rgba(0, 243, 255, 0.3);
}

/* 鼠标轨迹 */
.cursor-trail {
  position: fixed;
  border-radius: 50%;
  background: rgba(0, 243, 255, 0.2);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}

/* 科技网格光标 */
.tech-cursor {
  position: fixed;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%) rotate(45deg);
  pointer-events: none;
  z-index: 9997;
  opacity: 0.7;
  mix-blend-mode: lighten;
}

.tech-cursor-inner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 243, 255, 0.7);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: techCursorPulse 2s infinite alternate;
}

.tech-cursor-ring {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px dashed rgba(0, 243, 255, 0.5);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: techCursorRotate 8s linear infinite;
}

.tech-cursor-cross {
  position: absolute;
  background: rgba(0, 243, 255, 0.7);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.h-line {
  width: 60px;
  height: 1px;
}

.v-line {
  width: 1px;
  height: 60px;
}

@keyframes techCursorPulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@keyframes techCursorRotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 高速移动轨迹效果 */
.cursor-highlight {
  position: fixed;
  width: 60px;
  height: 8px;
  background: linear-gradient(90deg,
      rgba(0, 243, 255, 0) 0%,
      rgba(0, 243, 255, 0.8) 50%,
      rgba(0, 243, 255, 0) 100%);
  border-radius: 4px;
  pointer-events: none;
  z-index: 9996;
  opacity: 0.7;
  transform-origin: center;
  animation: fadeOut 0.3s forwards;
  mix-blend-mode: screen;
}

/* 点击粒子效果 */
.click-particle {
  position: fixed;
  width: 6px;
  height: 6px;
  background: rgba(0, 243, 255, 0.9);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9995;
  animation: particleExplode 1s forwards ease-out;
  animation-delay: var(--delay);
}

@keyframes particleExplode {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }

  100% {
    transform:
      translate(calc(-50% + (cos(var(--angle)) * var(--distance))),
        calc(-50% + (sin(var(--angle)) * var(--distance)))) scale(1);
    opacity: 0;
  }
}

/* 科技点击圆环 */
.tech-click-circle {
  position: fixed;
  width: 10px;
  height: 10px;
  border: 2px solid rgba(0, 243, 255, 0.9);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9995;
  transform: translate(-50%, -50%);
  animation: techCircleExpand 1s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes techCircleExpand {
  0% {
    width: 10px;
    height: 10px;
    opacity: 1;
    border-width: 2px;
  }

  100% {
    width: 150px;
    height: 150px;
    opacity: 0;
    border-width: 1px;
  }
}

/* 修改涟漪效果 */
.ripple-effect {
  position: fixed;
  width: 10px;
  height: 10px;
  background: transparent;
  border: 2px solid rgba(0, 243, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -50%);
  animation: enhancedRipple 1s forwards cubic-bezier(0.1, 0.9, 0.2, 1);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.4), inset 0 0 10px rgba(0, 243, 255, 0.4);
  transition: opacity 0.3s ease;
}

@keyframes enhancedRipple {
  0% {
    width: 10px;
    height: 10px;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.4), inset 0 0 10px rgba(0, 243, 255, 0.4);
    border-width: 2px;
  }

  100% {
    width: 250px;
    height: 250px;
    box-shadow: 0 0 40px rgba(0, 243, 255, 0.2), inset 0 0 20px rgba(0, 243, 255, 0.2);
    border-width: 1px;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
  }
}

.tech-cursor-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgb(0, 243, 255);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 243, 255, 1);
}

@keyframes techCursorPulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* 悬浮科技元素 */
.floating-tech-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
}

.tech-element {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  animation: floatAnimation var(--float-speed, 5s) infinite alternate ease-in-out;
  transform-style: preserve-3d;
}

.tech-element-inner {
  width: 100%;
  height: 100%;
  animation: rotateElement var(--rotation-speed, 3s) infinite linear;
}

.element-type-0 .tech-element-inner {
  border: 1px solid rgba(0, 243, 255, 0.7);
  transform: rotate(45deg);
}

.element-type-1 .tech-element-inner {
  border-radius: 50%;
  border: 1px dashed rgba(0, 243, 255, 0.5);
  box-shadow: inset 0 0 15px rgba(0, 243, 255, 0.3);
}

.element-type-2 .tech-element-inner {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background: rgba(0, 243, 255, 0.3);
}

.element-type-3 .tech-element-inner {
  background: rgba(0, 243, 255, 0.2);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

@keyframes floatAnimation {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  100% {
    transform: translate(30px, -30px) rotate(15deg);
  }
}

@keyframes rotateElement {
  0% {
    transform: rotateZ(0) rotateY(0);
  }

  100% {
    transform: rotateZ(360deg) rotateY(360deg);
  }
}

/* 网格辐射背景 */
.radial-grid {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vmax;
  height: 100vmax;
  background-image:
    repeating-conic-gradient(rgba(0, 243, 255, 0.1) 0deg,
      rgba(0, 243, 255, 0.1) 1deg,
      transparent 1deg,
      transparent 30deg),
    repeating-radial-gradient(rgba(0, 243, 255, 0) 0px,
      rgba(0, 243, 255, 0) 20px,
      rgba(0, 243, 255, 0.05) 20px,
      rgba(0, 243, 255, 0.05) 22px,
      rgba(0, 243, 255, 0) 22px,
      rgba(0, 243, 255, 0) 80px);
  transform: translate(-50%, -50%);
  opacity: 0.5;
  pointer-events: none;
  z-index: 1;
  animation: radarScan 30s linear infinite;
}

@keyframes radarScan {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 科技数据面板 */
.tech-panels {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
}

.tech-panel {
  position: absolute;
  width: 150px;
  height: 300px;
  background: rgba(0, 20, 40, 0.3);
  border: 1px solid rgba(0, 243, 255, 0.3);
  backdrop-filter: blur(5px);
  overflow: hidden;
  opacity: 0.7;
}

.panel-left {
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
}

.panel-right {
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
}

.panel-left::before,
.panel-right::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(0deg, transparent 50%, rgba(0, 243, 255, 0.1) 50%),
    linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 4px, 20px 20px;
  animation: panelScan 10s linear infinite;
}

@keyframes panelScan {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 100px;
  }
}

/* HUD角落装饰 */
.hud-corners {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.hud-corner {
  position: absolute;
  width: 80px;
  height: 80px;
  opacity: 0.7;
}

.top-left {
  top: 20px;
  left: 20px;
  border-top: 2px solid rgba(0, 243, 255, 0.8);
  border-left: 2px solid rgba(0, 243, 255, 0.8);
  animation: cornerPulse 4s infinite alternate;
}

.top-right {
  top: 20px;
  right: 20px;
  border-top: 2px solid rgba(0, 243, 255, 0.8);
  border-right: 2px solid rgba(0, 243, 255, 0.8);
  animation: cornerPulse 4s infinite alternate 1s;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
  border-bottom: 2px solid rgba(0, 243, 255, 0.8);
  border-left: 2px solid rgba(0, 243, 255, 0.8);
  animation: cornerPulse 4s infinite alternate 2s;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
  border-bottom: 2px solid rgba(0, 243, 255, 0.8);
  border-right: 2px solid rgba(0, 243, 255, 0.8);
  animation: cornerPulse 4s infinite alternate 3s;
}

@keyframes cornerPulse {
  0% {
    opacity: 0.3;
    filter: drop-shadow(0 0 5px rgba(0, 243, 255, 0.5));
  }

  100% {
    opacity: 0.8;
    filter: drop-shadow(0 0 10px rgba(0, 243, 255, 0.8));
  }
}

/* 扫描线效果 */
.scan-lines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg,
      rgba(0, 243, 255, 0.03) 0px,
      rgba(0, 243, 255, 0.03) 1px,
      transparent 1px,
      transparent 2px);
  pointer-events: none;
  z-index: 50;
  opacity: 0.5;
}

/* 流光粒子 */
.flowing-lights-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
  overflow: hidden;
}

.flowing-light {
  position: absolute;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.8) 0%, rgba(0, 243, 255, 0) 70%);
  border-radius: 50%;
  filter: blur(2px);
  animation: flowingLightAnimation linear infinite;
}

@keyframes flowingLightAnimation {
  0% {
    transform: scale(0) translateY(0);
    opacity: 0;
  }

  20% {
    opacity: var(--opacity, 0.5);
  }

  100% {
    transform: scale(2) translateY(-100vh);
    opacity: 0;
  }
}

/* 数据流动画 */
.data-flows-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
  overflow: hidden;
}

.data-flow {
  position: absolute;
  background: linear-gradient(90deg,
      rgba(0, 243, 255, 0) 0%,
      rgba(0, 243, 255, 0.5) 50%,
      rgba(0, 243, 255, 0) 100%);
  animation: dataFlowAnimation linear infinite;
  transform-origin: center left;
}

@keyframes dataFlowAnimation {
  0% {
    transform: translateX(-100%) rotate(var(--angle, 0deg));
    opacity: 0;
  }

  10% {
    opacity: var(--opacity, 0.2);
  }

  90% {
    opacity: var(--opacity, 0.2);
  }

  100% {
    transform: translateX(100vw) rotate(var(--angle, 0deg));
    opacity: 0;
  }
}

/* 脉冲边框 */
.pulse-border {
  position: fixed;
  background: linear-gradient(90deg,
      rgba(0, 243, 255, 0) 0%,
      rgba(0, 243, 255, 0.8) 50%,
      rgba(0, 243, 255, 0) 100%);
  pointer-events: none;
  z-index: 5;
}

.pulse-border.top,
.pulse-border.bottom {
  height: 1px;
  width: 100%;
  left: 0;
}

.pulse-border.left,
.pulse-border.right {
  width: 1px;
  height: 100%;
  top: 0;
}

.pulse-border.top {
  top: 0;
  animation: pulseBorderLeft 8s infinite linear;
}

.pulse-border.right {
  right: 0;
  animation: pulseBorderTop 8s infinite linear 2s;
}

.pulse-border.bottom {
  bottom: 0;
  animation: pulseBorderRight 8s infinite linear 4s;
}

.pulse-border.left {
  left: 0;
  animation: pulseBorderBottom 8s infinite linear 6s;
}

@keyframes pulseBorderLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  30%,
  70% {
    opacity: 0.8;
  }

  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes pulseBorderTop {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }

  30%,
  70% {
    opacity: 0.8;
  }

  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}

@keyframes pulseBorderRight {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  30%,
  70% {
    opacity: 0.8;
  }

  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
}

@keyframes pulseBorderBottom {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  30%,
  70% {
    opacity: 0.8;
  }

  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}

/* 添加全息投影效果 */
.hologram-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(transparent 0px,
      rgba(0, 243, 255, 0.05) 1px,
      transparent 2px);
  pointer-events: none;
  z-index: 6;
  opacity: 0.5;
  animation: hologramScan 10s linear infinite;
}

@keyframes hologramScan {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 100px;
  }
}

/* 添加科技回路图案 */
.circuit-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%2300f3ff' stroke-width='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.1;
  pointer-events: none;
  z-index: 1;
  animation: circuitMove 120s linear infinite;
}

@keyframes circuitMove {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 1000px 1000px;
  }
}

/* 添加数据分析图表元素 */
.data-visualization {
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 200px;
  height: 120px;
  background-color: rgba(0, 20, 40, 0.4);
  border: 1px solid rgba(0, 243, 255, 0.5);
  border-radius: 5px;
  overflow: hidden;
  z-index: 7;
  pointer-events: none;
}

.data-bars-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 80%;
  padding: 10px;
}

.data-bar {
  width: 8px;
  background: linear-gradient(180deg, rgba(0, 243, 255, 0.8) 0%, rgba(0, 102, 255, 0.4) 100%);
  border-radius: 2px 2px 0 0;
  animation: dataBarHeight 4s infinite;
}

@keyframes dataBarHeight {

  0%,
  100% {
    height: 20%;
  }

  50% {
    height: 80%;
  }
}

.data-bar:nth-child(1) {
  animation-delay: 0s;
}

.data-bar:nth-child(2) {
  animation-delay: 0.5s;
}

.data-bar:nth-child(3) {
  animation-delay: 1s;
}

.data-bar:nth-child(4) {
  animation-delay: 1.5s;
}

.data-bar:nth-child(5) {
  animation-delay: 2s;
}

.data-bar:nth-child(6) {
  animation-delay: 2.5s;
}

.data-bar:nth-child(7) {
  animation-delay: 3s;
}

.data-bar:nth-child(8) {
  animation-delay: 3.5s;
}

/* 添加雷达扫描效果 */
.radar-scan {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid rgba(0, 243, 255, 0.5);
  overflow: hidden;
  z-index: 7;
  pointer-events: none;
  background: radial-gradient(circle, rgba(0, 20, 40, 0.6) 0%, rgba(0, 20, 40, 0.3) 100%);
}

.radar-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 75px;
  height: 75px;
  transform-origin: bottom right;
  background: conic-gradient(rgba(0, 243, 255, 0.5) 0deg, transparent 20deg);
  animation: radarRotate 4s infinite linear;
}

@keyframes radarRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 添加浮动数据标签 */
.floating-data-tags {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 8;
}

.data-tag {
  position: absolute;
  padding: 5px 10px;
  background: rgba(0, 20, 40, 0.7);
  border: 1px solid rgba(0, 243, 255, 0.5);
  border-radius: 3px;
  color: rgba(0, 243, 255, 0.8);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  white-space: nowrap;
  animation: tagFloat 15s infinite alternate;
}

.tag-1 {
  top: 25%;
  left: 15%;
  animation-delay: 0s;
}

.tag-2 {
  top: 60%;
  left: 80%;
  animation-delay: 5s;
}

.tag-3 {
  top: 80%;
  left: 30%;
  animation-delay: 10s;
}

@keyframes tagFloat {
  0% {
    transform: translateY(0) translateX(0);
  }

  100% {
    transform: translateY(-30px) translateX(20px);
  }
}

/* 添加环形百分比加载 */
.loading-ring {
  position: absolute;
  top: 40px;
  right: 40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(0, 20, 40, 0.4);
  z-index: 7;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.ring-progress {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: rgba(0, 243, 255, 0.8);
  animation: ringRotate 2s linear infinite;
}

.ring-progress::before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: rgba(123, 0, 255, 0.8);
  animation: ringRotate 3s linear infinite;
}

.ring-progress::after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: rgba(0, 255, 255, 0.8);
  animation: ringRotate 1.5s linear infinite;
}

@keyframes ringRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 添加全息UI框架元素 */
.hologram-ui {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.holo-panel {
  position: absolute;
  border: 1px solid rgba(0, 243, 255, 0.3);
  background: rgba(0, 10, 30, 0.2);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
  backdrop-filter: blur(2px);
  animation: panelPulse 8s infinite alternate;
}

.panel-1 {
  top: 20%;
  right: 20px;
  width: 160px;
  height: 80px;
  border-radius: 5px;
  transform: skewX(-10deg);
}

.panel-2 {
  bottom: 20%;
  left: 20px;
  width: 120px;
  height: 160px;
  border-radius: 5px;
  transform: skewX(10deg);
}

@keyframes panelPulse {
  0% {
    border-color: rgba(0, 243, 255, 0.3);
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
  }

  100% {
    border-color: rgba(123, 0, 255, 0.3);
    box-shadow: 0 0 15px rgba(123, 0, 255, 0.3);
  }
}

/* 添加科技量化栅格 */
.quantized-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 2;
  pointer-events: none;
  opacity: 0.3;
  animation: gridQuantize 60s linear infinite;
}

@keyframes gridQuantize {
  0% {
    background-size: 20px 20px;
    opacity: 0.2;
  }

  50% {
    background-size: 25px 25px;
    opacity: 0.4;
  }

  100% {
    background-size: 20px 20px;
    opacity: 0.2;
  }
}

/* 添加飞行数据流 */
.flying-data {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 3;
}

.data-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(0, 243, 255, 0.8);
  filter: blur(1px);
  border-radius: 50%;
  opacity: 0.7;
  box-shadow: 0 0 4px rgba(0, 243, 255, 0.8);
  animation: dataFly 10s linear infinite;
}

@keyframes dataFly {
  0% {
    transform: translateX(-100px) translateY(100vh) scale(0);
    opacity: 0;
  }

  10% {
    opacity: 0.7;
  }

  90% {
    opacity: 0.7;
  }

  100% {
    transform: translateX(100vw) translateY(-100px) scale(1);
    opacity: 0;
  }
}

/* 新增电路线 */
.circuit-lines-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 6;
}

.circuit-line {
  position: absolute;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(0, 243, 255, 0.3) 30%,
      rgba(0, 243, 255, 0.5) 50%,
      rgba(0, 243, 255, 0.3) 70%,
      transparent 100%);
  height: 1px;
  width: 100px;
  animation: cyberLineScan 8s infinite linear;
}

.line1 {
  top: 40px;
  left: -100px;
  animation-delay: 0s;
}

.line2 {
  top: 60px;
  left: -100px;
  animation-delay: 2s;
}

.line3 {
  bottom: 60px;
  left: -100px;
  animation-delay: 4s;
}

.line4 {
  bottom: 40px;
  left: -100px;
  animation-delay: 6s;
}

@keyframes cyberLineScan {
  0% {
    left: -100px;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    left: calc(100% + 100px);
    opacity: 0;
  }
}

/* 新增浮动形状 */
.floating-shapes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 7;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.8) 0%, rgba(0, 243, 255, 0) 70%);
  width: var(--size);
  height: var(--size);
  top: var(--top);
  left: var(--left);
  animation: shapeFloat var(--float-speed) ease-in-out infinite;
  animation-delay: var(--delay);
  transform-origin: center;
  opacity: 0;
  filter: blur(2px);
}

@keyframes shapeFloat {
  0% {
    transform: translateY(0) translateX(0) scale(0.2) rotate(0deg);
    opacity: 0;
  }

  20% {
    opacity: 0.8;
  }

  50% {
    transform: translateY(-100px) translateX(50px) scale(1) rotate(180deg);
    opacity: 1;
  }

  80% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(0) translateX(0) scale(0.2) rotate(360deg);
    opacity: 0;
  }
}

/* 新增能量脉冲 */
.energy-pulses-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 8;
}

.energy-pulse {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.8) 0%, rgba(0, 243, 255, 0) 70%);
  width: var(--size);
  height: var(--size);
  top: var(--top);
  left: var(--left);
  animation: pulseFloat var(--pulse-duration) ease-in-out infinite;
  animation-delay: var(--delay);
  transform-origin: center;
  opacity: 0;
  filter: blur(2px);
}

@keyframes pulseFloat {
  0% {
    transform: translateY(0) translateX(0) scale(0.2) rotate(0deg);
    opacity: 0;
  }

  20% {
    opacity: 0.8;
  }

  50% {
    transform: translateY(-100px) translateX(50px) scale(1) rotate(180deg);
    opacity: 1;
  }

  80% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(0) translateX(0) scale(0.2) rotate(360deg);
    opacity: 0;
  }

}

/* 新增装饰粒子 */
.decorative-particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9;
}

.decorative-particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.8) 0%, rgba(0, 243, 255, 0) 70%);
  width: var(--size);
  height: var(--size);
  top: var(--top);
  left: var(--left);
  animation: particleFloat var(--pulse-duration) ease-in-out infinite;
  animation-delay: var(--delay);
  transform-origin: center;
  opacity: 0;
  filter: blur(2px);
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) translateX(0) scale(0.2) rotate(0deg);
    opacity: 0;
  }

  20% {
    opacity: 0.8;
  }

  50% {
    transform: translateY(-100px) translateX(50px) scale(1) rotate(180deg);
    opacity: 1;
  }

  80% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(0) translateX(0) scale(0.2) rotate(360deg);
    opacity: 0;
  }
}

/* 新增能量弧 */
.energy-arcs-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.energy-arc {
  position: absolute;
  stroke: var(--color);
  stroke-width: var(--thickness);
  opacity: var(--opacity);
  animation: arcMove var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes arcMove {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5em;
    letter-spacing: 5px;
  }

  .sub-title {
    font-size: 1em;
    letter-spacing: 3px;
  }

  .text-container {
    min-width: auto;
    width: 90%;
    padding: 1.5rem;
  }

  .tech-badge {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }

  .cyber-button {
    padding: 0.5rem 2rem;
  }

  .button-content {
    padding: 0.5rem 1.5rem;
  }

  .tech-panel,
  .data-visualization,
  .radar-scan,
  .loading-ring,
  .floating-data-tags {
    display: none;
  }

  .neon-circle {
    transform: scale(0.6) translate(-50%, -50%);
    opacity: 0.5;
    /* 降低透明度 */
  }

  .circle1 {
    width: 300px;
    height: 300px;
  }

  .circle2 {
    width: 400px;
    height: 400px;
  }

  .circle3 {
    width: 500px;
    height: 500px;
  }

  /* 大幅减少移动端的粒子和效果数量以提高性能 */
  .decorative-particle:nth-child(n+10),
  .circuit-line:nth-child(n+4),
  .floating-shape:nth-child(n+5),
  .energy-pulse:nth-child(n+3),
  .energy-arc:nth-child(n+2),
  .data-bar:nth-child(n+4),
  .tech-element:nth-child(n+4),
  .flowing-light:nth-child(n+5),
  .glow-particle:nth-child(n+5),
  .cyber-line:nth-child(n+3),
  .data-stream:nth-child(n+2),
  .data-flow:nth-child(n+5),
  .data-particle:nth-child(n+8) {
    display: none !important;
  }

  /* 移动端优化全屏布局 */
  .text {
    padding: 1.5rem;
  }

  .tech-slogan .typing-text {
    font-size: 0.8rem;
  }

  /* 针对移动设备的触摸交互 */
  .cursor-follower,
  .cursor-trail,
  .tech-cursor {
    display: none !important;
  }

  /* 降低复杂特效强度 */
  .grid-overlay {
    opacity: 0.15 !important;
    background-size: 60px 60px !important;
  }

  .scan-lines,
  .hologram-effect,
  .circuit-pattern,
  .flying-data,
  .digital-rain {
    opacity: 0.12 !important;
  }

  /* 降低动画频率，减少闪烁 */
  .light-beam,
  .data-stream,
  .neon-circle,
  .flowing-line {
    animation-duration: 15s !important;
  }

  /* 简化文字特效 */
  .main-title,
  .sub-title,
  .tech-badge {
    text-shadow: 0 0 5px rgba(0, 243, 255, 0.5) !important;
    animation: none !important;
  }

  /* 移除复杂的光晕和发光效果 */
  .cursor-glow,
  .glow-overlay,
  .pulse-border {
    display: none !important;
  }

  /* 禁用背景主题切换 */
  .container {
    transition: none !important;
    background: linear-gradient(135deg, #000428, #004e92) !important;
  }
}

/* 补充响应式布局调整 */
@media (max-width: 480px) {
  .main-title {
    font-size: 2em;
    letter-spacing: 3px;
  }

  .text-container {
    padding: 1rem;
  }

  .tech-badges {
    gap: 0.5rem;
  }

  .corner-decor {
    width: 15px;
    height: 15px;
  }
}

/* 添加平板设备断点 */
@media (min-width: 769px) and (max-width: 1024px) {
  .main-title {
    font-size: 3em;
  }

  .text-container {
    max-width: 600px;
  }

  /* 减少平板上的部分效果 */
  .decorative-particle:nth-child(n+20),
  .circuit-line:nth-child(n+8),
  .energy-pulse:nth-child(n+6) {
    display: none;
  }
}

/* 横屏模式优化 */
@media (max-height: 500px) and (orientation: landscape) {
  .text-container {
    padding: 1rem;
    min-height: auto;
  }

  .main-title {
    font-size: 2em;
    margin-bottom: 0.5rem;
  }

  .sub-title {
    margin-bottom: 1rem;
  }

  .tech-slogan {
    margin: 10px 0;
  }

  .button-container {
    margin-top: 1rem;
  }
}

/* 高DPI屏幕优化 */
@media (-webkit-min-device-pixel-ratio: 2),
(min-resolution: 192dpi) {
  .text {
    text-shadow: 0 0 3px rgba(0, 243, 255, 1);
  }

  .main-title {
    text-shadow:
      0 0 3px rgba(0, 243, 255, 1),
      0 0 6px rgba(0, 243, 255, 0.8);
  }
}

/* 页面过渡加载动画 */
.page-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
  backdrop-filter: blur(10px);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  background: rgba(13, 50, 77, 0.7);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.3);
  border: 1px solid rgba(0, 243, 255, 0.1);
  transition: all 0.5s ease;
}

.loading-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
  animation: logoGlow 2s infinite alternate;
}

.loading-logo img {
  width: 80%;
  height: 80%;
  object-fit: contain;
  filter: drop-shadow(0 0 5px rgba(0, 243, 255, 0.8));
  animation: rotateSlowly 10s linear infinite;
}

.loading-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 25px;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.7);
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  position: relative;
  text-align: center;
  background: linear-gradient(90deg, #00f3ff, #0072ff, #7b00ff, #00f3ff);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: textGradientMove 8s linear infinite;
}

.progress-container {
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
}

.progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #00c6ff, #0072ff, #00ffe7);
  background-size: 200% 100%;
  border-radius: 10px;
  animation: gradientMove 2s linear infinite;
  transition: width 0.2s linear;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.7);
}

.progress-text {
  font-size: 1rem;
  color: white;
  margin-bottom: 10px;
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 1px;
}

.loading-message {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-family: 'Share Tech Mono', monospace;
  height: 24px;
  transition: all 0.3s ease;
}

/* 加载完成动画 */
.loading-complete {
  transform: scale(1.05);
  box-shadow: 0 0 50px rgba(0, 243, 255, 0.5);
}

@keyframes logoGlow {
  0% {
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
  }

  100% {
    box-shadow: 0 0 40px rgba(0, 243, 255, 0.8);
  }
}

@keyframes rotateSlowly {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
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

@keyframes textGradientMove {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 300% 50%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .loading-container {
    padding: 25px;
  }

  .loading-logo {
    width: 80px;
    height: 80px;
  }

  .loading-title {
    font-size: 1.8rem;
  }

  .progress-text,
  .loading-message {
    font-size: 0.9rem;
  }
}

// 优化所有动画元素，添加硬件加速和减少不必要的动画
.neon-circles,
.light-beams,
.flowing-lights-container,
.data-flows-container,
.tech-element,
.grid-overlay,
.circuit-line,
.floating-shape,
.energy-pulse,
.decorative-particle,
.energy-arc {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform, opacity;
}

// 移动端特殊优化
@media (max-width: 768px) {

  // 减少移动端的特效数量和复杂度
  .neon-circle {
    transform: scale(0.6) translate(-50%, -50%) translateZ(0);
  }

  // 隐藏部分复杂特效，减轻渲染负担
  .radar-scan,
  .data-visualization,
  .hologram-ui,
  .tech-panels,
  .energy-arcs-container {
    display: none;
  }

  // 减少粒子特效，提高性能
  .grid-node:nth-child(n+10),
  .flowing-light:nth-child(n+8),
  .glow-particle:nth-child(n+10),
  .data-particle:nth-child(n+10),
  .decorative-particle:nth-child(n+12),
  .energy-pulse:nth-child(n+4) {
    display: none;
  }

  // 优化背景动画
  .grid-overlay {
    opacity: 0.2;
    background-size: 60px 60px;
  }

  // 降低渲染复杂度
  .scan-lines,
  .hologram-effect,
  .circuit-pattern {
    opacity: 0.1;
  }

  // 简化按钮动画
  .cyber-button .button-glitch,
  .cyber-button .button-glitch-effect {
    display: none;
  }
}

// 优化页面过渡动画性能
.page-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: opacity;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  background: rgba(13, 50, 77, 0.7);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.3);
  border: 1px solid rgba(0, 243, 255, 0.1);
  transition: all 0.5s ease;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: transform, opacity;
}

.progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #00c6ff, #0072ff, #00ffe7);
  background-size: 200% 100%;
  border-radius: 10px;
  animation: gradientMove 2s linear infinite;
  transition: width 0.2s linear;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.7);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

// 优化主要动画元素
.text-container {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: transform;
}

.main-title {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: background-position;
}

// 降低部分不必要的动画复杂度
@media (max-width: 768px) {

  // 简化动画，减少帧率损耗
  @keyframes animate {
    0% {
      opacity: 0;
      transform: translateY(10px) translateZ(0);
    }

    100% {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }
  }

  // 减少动画时间，加快显示
  .text {
    animation-duration: 1s;
  }

  // 优化星空效果，减少星星数量
  .stars-wrapper {
    opacity: 0.6;
  }

  // 降低数字雨效果的复杂度
  .digital-rain {
    opacity: 0.1;
  }

  // 触摸设备不需要鼠标特效
  .cursor-follower,
  .cursor-trail,
  .tech-cursor {
    display: none !important;
  }
}

// 优化渲染性能的动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateZ(0);
  }

  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateZ(0);
  }

  to {
    opacity: 0;
    transform: translateZ(0);
  }
}

// ... existing code ...</style>
