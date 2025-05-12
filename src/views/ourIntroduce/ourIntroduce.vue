<script setup>
import MiddelTitle from '@/component/middelTitle.vue'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useHead } from '@vueuse/head'

// SEO优化 - 增强版
useHead({
  title: 'KingCola-ICG | 团队介绍 - 湖南科技大学创新创业团队官网',
  meta: [
    {
      name: 'description',
      content: 'KingCola-ICG是湖南科技大学最活跃的自发性学生科研团队，成立于2017年，致力于创新创业项目开发和科研竞赛，曾获国家级、省级奖励多项，拥有软件著作权与专利，涵盖前端开发、后端开发、机器学习等多个技术方向。'
    },
    {
      name: 'keywords',
      content: 'KingCola,ICG,湖南科技大学,创新创业,科研团队,学生团队,科技创新,团队介绍,前端开发,后端开发,机器学习,嵌入式开发,产品设计,策划运营,软件著作权,专利,国家级奖励'
    },
    {
      property: 'og:title',
      content: 'KingCola-ICG | 团队介绍 - 湖南科技大学创新创业团队官网'
    },
    {
      property: 'og:description',
      content: 'KingCola-ICG是湖南科技大学最活跃的自发性学生科研团队，成立于2017年，致力于创新创业项目开发和科研竞赛，曾获国家级、省级奖励多项。'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://www.kingcola-icg.cn/ourIntroduce'
    },
    {
      name: 'twitter:title',
      content: 'KingCola-ICG | 团队介绍 - 湖南科技大学创新创业团队官网'
    },
    {
      name: 'twitter:description',
      content: 'KingCola-ICG是湖南科技大学最活跃的自发性学生科研团队，成立于2017年，致力于创新创业项目开发和科研竞赛。'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'KingCola-ICG',
        'url': 'https://www.kingcola-icg.cn',
        'logo': 'https://www.kingcola-icg.cn/logo.png',
        'description': 'KingCola-ICG团队成立于2017年6月，以建设成为湖科大最活跃的自发性学生科研团队为目标，是一个开放式的创新创业团队。',
        'foundingDate': '2017-06',
        'award': [
          '国家级奖励20余项',
          '省级奖励70余项',
          '校级奖百余项'
        ],
        'knowsAbout': [
          '前端开发',
          '后端开发',
          '机器学习',
          '嵌入式开发',
          '产品设计',
          '策划运营'
        ],
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': '湘潭市',
          'addressRegion': '湖南省',
          'addressCountry': 'CN'
        }
      })
    }
  ]
})

// 团队分组数据
const classIfy = ref([
  {
    className: '前端开发',
    classIntroduce:
      '前端开发是指构建网站或应用程序用户界面的过程。它涵盖HTML、CSS、JavaScript、React、Vue、Angular等技术,负责实现设计师的界面设计，确保页面在各种设备上显示正常。技术的不为用户提供现代化、交互丰富的Web体验。'
  },
  {
    className: '后端开发',
    classIntroduce:
      '后端开发专注于构建网站或应用程序的服务器端逻辑，使用编程语言如Java、Python、Node.js等，处理数据存储、业务逻辑和与前端的交互，确保系统运行稳定且高效。'
  },
  {
    className: '机器学习',
    classIntroduce:
      '机器学习是一种人工智能分支，让计算机通过数据学习模式和规律，从而改善任务的性能，而无需明确编程。算法能够自动适应和改进，应用广泛，如预测、分类和模式识别。'
  },
  {
    className: '嵌入式开发',
    classIntroduce:
      '嵌入式开发涉及设计和编程嵌入式系统，通常嵌入在设备或产品中。使用C、C++等语言，开发者处理硬件控制、实时操作系统和低级驱动程序，以确保嵌入式系统可靠运行。'
  },
  {
    className: '产品设计',
    classIntroduce:
      '产品设计是一门创造性的艺术与科学，通过深入了解用户需求，结合创新思维和工程技术，打造出既实用又具有吸引力的产品。该过程包括市场研究、原型设计、用户体验优化等环节，旨在创造有竞争力的解决方案，满足消费者期望，并在市场中取得成功。'
  },
  {
    className: '策划运营',
    classIntroduce:
      '策划运营是通过系统性规划和执行，达成组织目标的过程。它包括目标设定、资源分配、执行计划、监测进展等步骤，旨在提高效率、降低成本、增加利润。在市场营销中，策划运营涉及品牌推广、市场活动和客户关系管理，以确保业务的可持续增长。'
  }
])

// 团队发展历程时间线数据
const timelineData = ref([
  {
    year: 2017,
    title: 'KingCola-ICG创立',
    leader: '张梁子沁',
    members: '陈世豪、曾骏、宋文华、张博玮、何世鹏等17名成员',
    achievements: '团队正式成立，确立了建设成为湖科大最活跃的自发性学生科研团队的目标'
  },
  {
    year: 2018,
    title: '第二届KingCola-ICG',
    leader: '张博玮',
    members: '宋文华、欧俣材、李昊、谢儒等28名成员',
    achievements: '团队规模扩大，开始在各类竞赛中斩获奖项'
  },
  {
    year: 2019,
    title: '第三届KingCola-ICG',
    leader: '李昊、谢儒',
    members: '常云鹏、邓璇、胡望等22名成员',
    achievements: '获得国家级奖励5项，省级奖励15项，团队项目实力显著提升'
  },
  {
    year: 2020,
    title: '第四届KingCola-ICG',
    leader: '常云鹏、王晶',
    members: '刘晨阳、张旭宁、唐文杰等26名成员',
    achievements: '入驻计算机学院微科创新创业基地，开发多项实验室产品'
  },
  {
    year: 2021,
    title: '第五届KingCola-ICG',
    leader: '刘晨阳、张旭宁',
    members: '廖子豪、何宇轩、刘文康等28名成员',
    achievements: '获得软件著作权8项，获得实用新型专利2项'
  },
  {
    year: 2022,
    title: '第六届KingCola-ICG',
    leader: '刘文康、李美玲',
    members: '李诺、刘彬、陈钰轩等30名成员',
    achievements: 'SCI二区论文2篇，SCI四区论文1篇，国家级奖励8项'
  },
  {
    year: 2023,
    title: '第七届KingCola-ICG',
    leader: '李诺、陈嘉烨',
    members: '邓燕勤、黄妍、熊璇等30名成员',
    achievements: '获得国家级奖励7项，省级奖励25项，软件著作权3项，实用新型专利1项'
  }
])

// 激活状态
const activeSection = ref(null)

// 动画效果
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll')
  const sections = document.querySelectorAll('section')

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top
    const elementBottom = element.getBoundingClientRect().bottom

    // 元素进入视口
    if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
      element.classList.add('animate-visible')
    }
  })

  // 确定当前活跃的部分
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top
    const sectionBottom = section.getBoundingClientRect().bottom
    const sectionHeight = section.offsetHeight

    // 部分可见且占据较大视口
    if (
      sectionTop < window.innerHeight * 0.5 &&
      sectionBottom > window.innerHeight * 0.5
    ) {
      if (section.classList.contains('intro-section')) {
        activeSection.value = 'intro'
      } else if (section.classList.contains('purpose-section')) {
        activeSection.value = 'purpose'
      } else if (section.classList.contains('timeline-section')) {
        activeSection.value = 'timeline'
      } else if (section.classList.contains('group-section')) {
        activeSection.value = 'group'
      } else if (section.classList.contains('culture-section')) {
        activeSection.value = 'culture'
      }
    }
  })
}

// 平滑滚动到指定部分
const scrollToSection = (sectionId) => {
  const element = document.querySelector(`.${sectionId}-section`)
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  // 添加结构化数据以提高SEO
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'KingCola-ICG',
    'url': 'https://www.kingcola-icg.cn',
    'logo': 'https://www.kingcola-icg.cn/logo.png',
    'description': 'KingCola-ICG团队成立于2017年6月，以建设成为湖科大最活跃的自发性学生科研团队为目标，是一个开放式的创新创业团队。',
    'foundingDate': '2017-06',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': '湘潭市',
      'addressRegion': '湖南省',
      'addressCountry': 'CN'
    }
  })
  document.head.appendChild(script)

  window.addEventListener('scroll', animateOnScroll)
  // 初始检查
  nextTick(() => {
    animateOnScroll()
  })

  // 重置滚动位置
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  })

  // 检查是否从开屏页面加载过来
  const isFromStartPage = sessionStorage.getItem('loadingFromStartPage') === 'true'

  // 清除会话存储中的标识
  sessionStorage.removeItem('loadingFromStartPage')

  // 处理从开屏页面过来的加载动画
  const handleTransitionFromStartPage = () => {
    // 查找现有的过渡覆盖层
    const existingOverlay = document.querySelector('.page-transition-overlay[data-preserve="true"]')

    if (existingOverlay) {
      // 找到了保留的过渡层，使用它
      console.log('使用现有的过渡覆盖层')

      // 确保显示完整状态
      const loadingContainer = existingOverlay.querySelector('.loading-container')
      const progressBar = existingOverlay.querySelector('.progress-bar')
      const progressText = existingOverlay.querySelector('.progress-text')
      const loadingMessage = existingOverlay.querySelector('.loading-message')

      if (progressBar) progressBar.style.width = '100%'
      if (progressText) progressText.textContent = '100%'
      if (loadingMessage) loadingMessage.textContent = '加载完成，正在进入...'

      // 等待一小段时间显示完整状态
      setTimeout(() => {
        // 添加淡出动画
        existingOverlay.style.opacity = '1'
        existingOverlay.style.transition = 'opacity 0.8s ease'

        setTimeout(() => {
          existingOverlay.style.opacity = '0'

          // 动画完成后移除元素
          setTimeout(() => {
            if (document.body.contains(existingOverlay)) {
              document.body.removeChild(existingOverlay)
            }

            // 显示页面内容
            const introContainer = document.querySelector('.intro-container')
            if (introContainer) {
              introContainer.classList.add('page-loaded')
            }
          }, 800)
        }, 300)
      }, 100)
    } else if (document.querySelector('.page-transition-overlay')) {
      // 找到其他过渡层但不是保留标记的
      const otherOverlay = document.querySelector('.page-transition-overlay')

      // 添加淡出动画
      otherOverlay.style.opacity = '1'
      otherOverlay.style.transition = 'opacity 0.8s ease'

      setTimeout(() => {
        otherOverlay.style.opacity = '0'

        // 动画完成后移除元素
        setTimeout(() => {
          if (document.body.contains(otherOverlay)) {
            document.body.removeChild(otherOverlay)
          }

          // 显示页面内容
          const introContainer = document.querySelector('.intro-container')
          if (introContainer) {
            introContainer.classList.add('page-loaded')
          }
        }, 800)
      }, 200)
    } else if (isFromStartPage) {
      // 如果是从开屏页面过来但没有找到覆盖层，创建一个新的
      const newOverlay = document.createElement('div')
      newOverlay.className = 'page-transition-overlay'
      newOverlay.style.position = 'fixed'
      newOverlay.style.zIndex = '10000'
      newOverlay.style.top = '0'
      newOverlay.style.left = '0'
      newOverlay.style.width = '100vw'
      newOverlay.style.height = '100vh'
      newOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.95)'
      newOverlay.style.display = 'flex'
      newOverlay.style.justifyContent = 'center'
      newOverlay.style.alignItems = 'center'
      newOverlay.style.transition = 'opacity 0.8s ease'

      const loadingText = document.createElement('div')
      loadingText.textContent = '正在进入团队介绍...'
      loadingText.style.color = '#00f3ff'
      loadingText.style.fontSize = '1.5rem'
      loadingText.style.fontFamily = 'Share Tech Mono, monospace'
      loadingText.style.textShadow = '0 0 10px rgba(0, 243, 255, 0.7)'

      newOverlay.appendChild(loadingText)
      document.body.appendChild(newOverlay)

      // 确保页面内容在初始状态下是隐藏的
      const introContainer = document.querySelector('.intro-container')
      if (introContainer) {
        introContainer.style.opacity = '0'
      }

      // 等待DOM更新后执行淡出动画
      setTimeout(() => {
        newOverlay.style.opacity = '0'

        setTimeout(() => {
          if (document.body.contains(newOverlay)) {
            document.body.removeChild(newOverlay)
          }

          // 显示页面内容
          if (introContainer) {
            introContainer.classList.add('page-loaded')
          }
        }, 800)
      }, 500)
    } else {
      // 如果不是从开屏页面过来，直接显示页面内容
      const introContainer = document.querySelector('.intro-container')
      if (introContainer) {
        introContainer.classList.add('page-loaded')
      }
    }
  }

  // 如果DOM已经加载完成，立即处理过渡
  if (document.readyState === 'complete') {
    handleTransitionFromStartPage()
  } else {
    // 否则等待页面加载完成
    window.addEventListener('load', handleTransitionFromStartPage)
  }

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

  // 使用延迟确保滚动条平滑显示
  setTimeout(() => {
    document.body.style.overflowY = 'overlay'
  }, 300)
})

// 卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', animateOnScroll)
})
</script>

<template>
  <div class="intro-container">

    <!-- 团队简介 -->
    <section class="intro-section" id="intro-section">
      <div class="team-intro animate-on-scroll">
        <div class="team-logo">
          <img src="@/assets/logo.png" alt="KingCola-ICG团队标志 - 湖南科技大学创新创业团队" />
        </div>
        <div class="team-desc">
          <h1 class="intro-title">
            <span class="highlight">K</span>ingCola-ICG
          </h1>
          <div class="intro-text">
            <p>
              KingCola-ICG
              团队成立于2017年6月，以建设成为湖科大最活跃的自发性学生科研团队为目标，是一个开放式的创新创业团队。团队成员学科交叉，来自各个学院的同学优势互补，以增强自身综合能力为主，以学科竞赛为辅，推动成员的发展。
            </p>
            <p>
              团队因不同的执着和对创业的追求而聚集在一起，共同为"KingCola团队"的发展壮大而努力，技术研发同学是我们得力的技术骨干，商学院的同学为团队平台提供商业支撑，策划设计的同学为产品的外观设计而努力。
            </p>
            <p>
              团队涉及多领域，在数学建模、电子商务、物联网、创新创业、科普作品等各项重量级赛事中共累计斩获国家级奖励20余项、省级奖励70余项、校级奖百余项，获得软件著作权11项，获得实用新型专利3项。SCI二区论文3篇，SCI四区论文2篇（导师一作，团队成员二作）目前入驻计算机学院微科创新创业基地4年多，已开发多项实验室产品。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队宗旨 -->
    <section class="purpose-section" id="purpose-section">
      <MiddelTitle>团队宗旨</MiddelTitle>
      <div class="purpose-content animate-on-scroll">
        <div class="purpose-logo">
          <img src="@/assets/标志2.png" alt="KingCola-ICG团队宗旨标志 - 创新、合作、挑战" />
        </div>
        <div class="purpose-items">
          <div class="purpose-item">
            <h3>自主创新</h3>
            <p>
              我们的目标是建设成为湖南科技大学最活跃的自发性学生科研团队。团队注重自主创新，致力于通过学生的主动性和创造性推动科研项目的发展。成员在各学科领域交叉，利用各自的专业知识，以增强自身综合能力为主，推动团队的自主创新。
            </p>
          </div>
          <div class="purpose-item">
            <h3>团队合作</h3>
            <p>
              团队的成员来自不同学院，学科背景交叉，具有互补性。强调成员之间的协同合作以提高整体团队的综合能力。商学院的同学为团队提供商业支撑，技术研发同学作为技术骨干，策划设计的同学负责产品的外观设计，展现了多学科合作的特点。
            </p>
          </div>
          <div class="purpose-item">
            <h3>挑战自我</h3>
            <p>团队的发展历程中，每一届成员都在为团队的进步而奋斗。团队涉足多个领域，参与各类重量级赛事，斩获国家级、省级、校级奖项，获得软件著作权和实用新型专利，发表SCI论文，展现了团队成员在科研和创新方面挑战自我的态度。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队发展历程时间线 -->
    <section class="timeline-section" id="timeline-section">
      <MiddelTitle>团队发展历程</MiddelTitle>
      <div class="timeline-container animate-on-scroll">
        <div class="timeline">
          <div v-for="(item, index) in timelineData" :key="index" class="timeline-item"
            :class="{ 'left': index % 2 === 0, 'right': index % 2 === 1 }">
            <div class="timeline-content">
              <div class="timeline-year">{{ item.year }}</div>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <div class="timeline-details">
                <p><strong>负责人:</strong> {{ item.leader }}</p>
                <p><strong>主要成员:</strong> {{ item.members }}</p>
                <p><strong>主要成就:</strong> {{ item.achievements }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队分组 -->
    <section class="group-section" id="group-section">
      <MiddelTitle>团队分组</MiddelTitle>
      <div class="group-cards animate-on-scroll">
        <div v-for="(item, index) in classIfy" :key="index" class="group-card">
          <div class="card-front">
            <div class="card-icon">
              <img :src="`/src/assets/${item.className}.png`" :alt="`KingCola-ICG团队${item.className}分组图标`" />
            </div>
            <h3>{{ item.className }}</h3>
          </div>
          <div class="card-back">
            <p>{{ item.classIntroduce }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队文化 -->
    <section class="culture-section" id="culture-section">
      <MiddelTitle>团队文化</MiddelTitle>
      <div class="culture-grid animate-on-scroll">
        <div class="culture-item large">
          <div class="culture-image">
            <img src="@/assets/工作环境.jpg" alt="KingCola-ICG团队工作环境 - 创意与现代设计的办公空间" />
          </div>
          <div class="culture-overlay">
            <h3>工作环境</h3>
            <p>工作室充满创意氛围，明亮宽敞的空间中布置着现代设计的工作桌。温馨的灯光和绿植增添活力，员工间交流合作紧密。富有设计感的墙面装饰和先进的设备构成了高效、舒适的工作场所。</p>
          </div>
        </div>

        <div class="culture-item">
          <div class="culture-image">
            <img src="@/assets/团建.jpg" alt="KingCola-ICG团队团建活动 - 成员互动与交流" />
          </div>
          <div class="culture-overlay">
            <h3>成员团建</h3>
            <p>工作室团建充满欢笑与活力，团队成员共同参与各种创意挑战和团体活动。从团队建设游戏到创意工坊，每个人都在轻松愉快的氛围中建立更紧密的关系。</p>
          </div>
        </div>

        <div class="culture-item">
          <div class="culture-image">
            <img src="@/assets/总结大会.jpg" alt="KingCola-ICG团队总结大会 - 成果分享与未来规划" />
          </div>
          <div class="culture-overlay">
            <h3>总结大会</h3>
            <p>工作室学期总结大会是一次深入回顾与展望的盛会。团队分享成就与经验，讨论挑战与改进。温馨氛围中，共同制定新目标，激励团队更进一步。</p>
          </div>
        </div>

        <div class="culture-item">
          <div class="culture-image">
            <img src="@/assets/小组会议.jpg" alt="KingCola-ICG团队小组会议 - 项目讨论与合作" />
          </div>
          <div class="culture-overlay">
            <h3>小组会议</h3>
            <p>工作室小组会议充满活力，成员们讨论项目进展、分享想法。紧凑而高效，每人发表见解，解决问题。氛围融洽，促进了团队合作与创新。</p>
          </div>
        </div>
      </div>
    </section>

    <el-backtop :right="20" :bottom="100" aria-label="返回顶部" title="返回页面顶部" />
  </div>
</template>

<style scoped lang="scss">
// 变量定义
$primary-color: #00f3ff;
$secondary-color: #0072ff;
$primary-dark: #0d324d;
$primary-gradient: linear-gradient(90deg, #00c6ff, #0072ff);
$bg-color: #232222;
$text-color: #e4e4e4;
$section-spacing: 80px;
$card-bg: rgba(255, 255, 255, 0.05);
$card-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
$section-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
$transition-smooth: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

/* 全局动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 243, 255, 0.4);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(0, 243, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(0, 243, 255, 0);
  }
}

// 导入字体
@font-face {
  font-family: '思源宋体 ExtraLight';
  font-weight: 200;
  src: url('//at.alicdn.com/wf/webfont/B6XV0nUBXUTA/e2a2tpMThlnv.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: '阿里妈妈方圆体 VF Regular';
  src: url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/BU4ZRd4hOdYT.woff2') format('woff2');
  font-display: swap;
}

// 基础容器样式
.intro-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: $text-color;
  font-family: '思源宋体 ExtraLight', sans-serif;
  overflow-x: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.2s ease, transform 1.2s ease;
  will-change: opacity, transform;
}

/* 页面加载完成动画 */
.page-loaded {
  opacity: 1 !important;
  transform: translateY(0) !important;
  animation: pulseIn 0.6s ease-out;
}

@keyframes pulseIn {
  0% {
    opacity: 0;
    transform: scale(0.96) translateY(30px);
  }

  70% {
    opacity: 1;
    transform: scale(1.02) translateY(0);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 淡出动画 */
.fade-out {
  animation: fadeOut 0.5s forwards ease-out;
}

/* 过渡页面样式 */
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
  backdrop-filter: blur(10px);
}

// 动画效果
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out;

  &.animate-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// 各节标题
:deep(.middle-title) {
  margin: $section-spacing 0 40px;
  position: relative;
  color: $primary-color;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: $primary-gradient;
    border-radius: 3px;
    animation: pulse 2s infinite;
  }
}

// 团队简介部分
.intro-section {
  margin-bottom: $section-spacing;
}

.team-intro {
  display: flex;
  background: rgba(30, 30, 30, 0.7);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: $section-shadow;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 243, 255, 0.1);
  transition: $transition-smooth;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    border-color: rgba(0, 243, 255, 0.3);
  }

  .team-logo {
    flex: 0 0 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, $primary-dark, rgba(13, 50, 77, 0.7));
    padding: 20px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 70%);
      animation: rotate 20s linear infinite;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    img {
      width: 180px;
      height: 180px;
      object-fit: contain;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 0 10px rgba(0, 243, 255, 0.5));
      transition: transform 0.5s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .team-desc {
    flex: 1;
    padding: 40px;

    .intro-title {
      font-size: 2.5rem;
      margin-bottom: 25px;
      font-weight: 600;
      color: white;
      position: relative;

      .highlight {
        color: transparent;
        background: linear-gradient(90deg, $primary-color, $secondary-color);
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        animation: textGradient 4s ease infinite;
        font-size: 3rem;
        text-shadow: 0 0 10px rgba(0, 243, 255, 0.7);
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100px;
        height: 3px;
        background: $primary-gradient;
        border-radius: 3px;
      }
    }

    .intro-text {
      font-size: 1.05rem;
      line-height: 1.8;

      p {
        margin-bottom: 18px;
        text-align: justify;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateX(5px);
        }
      }
    }
  }
}

// 团队宗旨部分
.purpose-section {
  margin-bottom: $section-spacing;
}

.purpose-content {
  display: flex;
  align-items: center;
  background: rgba(30, 30, 30, 0.7);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: $section-shadow;
  border: 1px solid rgba(0, 243, 255, 0.1);
  transition: $transition-smooth;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    border-color: rgba(0, 243, 255, 0.3);
  }

  .purpose-logo {
    flex: 0 0 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background: linear-gradient(135deg, rgba(13, 50, 77, 0.7), rgba(30, 30, 30, 0.3));

    img {
      width: 180px;
      object-fit: contain;
      filter: drop-shadow(0 0 10px rgba(0, 243, 255, 0.5));
      transition: transform 0.5s ease;

      &:hover {
        transform: scale(1.05) rotate(5deg);
      }
    }
  }

  .purpose-items {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding: 30px;

    .purpose-item {
      flex: 1 1 30%;
      min-width: 250px;
      padding: 15px;
      transition: all 0.3s ease;
      border-radius: 10px;

      &:hover {
        background: rgba(0, 243, 255, 0.05);
      }

      h3 {
        font-size: 1.4rem;
        background: linear-gradient(90deg, $primary-color, $secondary-color);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-bottom: 15px;
        position: relative;
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 30px;
          height: 2px;
          background: $primary-color;
          transition: width 0.3s ease;
        }

        &:hover::after {
          width: 50px;
        }
      }

      p {
        font-size: 1rem;
        line-height: 1.7;
        text-align: justify;
      }
    }
  }
}

// 时间线部分
.timeline-section {
  margin-bottom: $section-spacing;
}

.timeline-container {
  position: relative;
  padding: 20px 0;

  .timeline {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 4px;
      background: $primary-gradient;
      transform: translateX(-50%);
      border-radius: 2px;
      box-shadow: 0 0 15px rgba(0, 243, 255, 0.4);
    }
  }

  .timeline-item {
    position: relative;
    width: 50%;
    padding: 20px;
    transition: all 0.4s ease;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 20px;
      height: 20px;
      background: $primary-color;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 243, 255, 0.8);
      transform: translateY(-50%);
      z-index: 1;
      transition: all 0.3s ease;
    }

    &:hover::after {
      transform: translateY(-50%) scale(1.3);
      box-shadow: 0 0 20px rgba(0, 243, 255, 1), 0 0 40px rgba(0, 243, 255, 0.5);
      animation: pulse 1.5s infinite;
    }

    &.left {
      left: 0;

      &::after {
        right: -10px;
        transform: translateX(50%) translateY(-50%);
      }

      .timeline-content {
        margin-right: 40px;
        text-align: right;
        transform-origin: right center;
      }
    }

    &.right {
      left: 50%;

      &::after {
        left: -10px;
        transform: translateX(-50%) translateY(-50%);
      }

      .timeline-content {
        margin-left: 40px;
        text-align: left;
        transform-origin: left center;
      }
    }
  }

  .timeline-content {
    background: rgba(30, 30, 30, 0.8);
    border-radius: 12px;
    padding: 25px;
    position: relative;
    box-shadow: $card-shadow;
    transition: all 0.4s ease;
    border: 1px solid rgba(0, 243, 255, 0.2);
    backdrop-filter: blur(5px);

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      border-color: rgba(0, 243, 255, 0.5);
      background: rgba(30, 30, 30, 0.9);
    }
  }

  .timeline-year {
    position: absolute;
    top: -15px;
    background: $primary-gradient;
    color: white;
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
    transition: all 0.3s ease;

    .left & {
      right: 20px;
    }

    .right & {
      left: 20px;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      padding: 6px 25px;
    }
  }

  .timeline-title {
    margin: 15px 0;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: $primary-color;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  .timeline-details {
    font-size: 1rem;
    line-height: 1.7;

    p {
      margin-bottom: 10px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateX(5px);
      }
    }

    strong {
      color: $primary-color;
      font-weight: 500;
    }
  }
}

// 团队分组部分
.group-section {
  margin-bottom: $section-spacing;
}

.group-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;

  .group-card {
    flex: 0 0 calc(33.333% - 30px);
    min-width: 280px;
    height: 230px;
    perspective: 1500px;
    position: relative;

    &:hover {
      .card-front {
        transform: rotateY(180deg);
      }

      .card-back {
        transform: rotateY(0);
      }
    }
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 15px;
    overflow: hidden;
  }

  .card-front {
    background: linear-gradient(135deg, $primary-dark, rgba(13, 50, 77, 0.8));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    transform: rotateY(0);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 243, 255, 0.2);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 30%, rgba(0, 243, 255, 0.1), transparent 70%);
      z-index: 0;
    }

    .card-icon {
      width: 85px;
      height: 85px;
      margin-bottom: 25px;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 0 8px rgba(0, 243, 255, 0.5));
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.1) rotate(5deg);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    h3 {
      font-size: 1.5rem;
      color: white;
      font-weight: 600;
      position: relative;
      z-index: 1;
      letter-spacing: 1px;
    }
  }

  .card-back {
    background: rgba(30, 30, 30, 0.95);
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateY(-180deg);
    border: 1px solid rgba(0, 243, 255, 0.3);
    box-shadow: inset 0 0 30px rgba(0, 243, 255, 0.1);

    &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, transparent 60%);
      z-index: 0;
    }

    p {
      font-size: 1rem;
      line-height: 1.7;
      text-align: center;
      position: relative;
      z-index: 1;
    }
  }
}

// 团队文化部分
.culture-section {
  margin-bottom: $section-spacing;
}

.culture-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 25px;

  .culture-item {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.5s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 243, 255, 0.1);

    &.large {
      grid-column: span 3;
      height: 500px;
    }

    &:not(.large) {
      height: 280px;
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      border-color: rgba(0, 243, 255, 0.3);

      .culture-overlay {
        opacity: 1;
        backdrop-filter: blur(5px);
      }

      .culture-image img {
        transform: scale(1.1);
        filter: brightness(0.6) saturate(1.2);
      }
    }
  }

  .culture-image {
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.8s ease;
      filter: brightness(0.8) saturate(1.1);
    }
  }

  .culture-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(13, 50, 77, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    opacity: 0;
    transition: all 0.5s ease;

    h3 {
      font-size: 1.6rem;
      color: white;
      margin-bottom: 20px;
      position: relative;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        width: 50px;
        height: 2px;
        background: $primary-color;
        transform: translateX(-50%);
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 80px;
      }
    }

    p {
      font-size: 1.05rem;
      line-height: 1.7;
      text-align: center;
      max-width: 85%;
    }
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .group-cards {
    .group-card {
      flex: 0 0 calc(50% - 30px);
    }
  }

  .culture-grid {
    .culture-item.large {
      height: 400px;
    }
  }
}

@media (max-width: 992px) {
  .team-intro {
    flex-direction: column;

    .team-logo {
      flex: none;
      padding: 40px;

      img {
        width: 160px;
        height: 160px;
      }
    }

    .team-desc {
      padding: 30px;

      .intro-title {
        font-size: 2.2rem;
        text-align: center;

        &::after {
          left: 50%;
          transform: translateX(-50%);
        }

        .highlight {
          font-size: 2.5rem;
        }
      }
    }
  }

  .purpose-content {
    flex-direction: column;

    .purpose-logo {
      padding: 30px;
      width: 100%;
      justify-content: center;

      img {
        width: 160px;
      }
    }

    .purpose-items {
      .purpose-item {
        flex: 0 0 100%;
        text-align: center;

        h3 {
          text-align: center;

          &::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }

  .culture-grid {
    grid-template-columns: 1fr 1fr;

    .culture-item.large {
      grid-column: span 2;
    }
  }
}

@media (max-width: 768px) {
  :deep(.middle-title) {
    font-size: 1.7rem;
  }

  .timeline-container {
    .timeline {
      &::before {
        left: 20px;
        box-shadow: 0 0 15px rgba(0, 243, 255, 0.6);
      }
    }

    .timeline-item {
      width: 100%;
      padding-left: 60px;
      padding-right: 20px;
      margin-bottom: 30px;

      &::after {
        left: 20px !important;
        top: 30px;
        width: 16px;
        height: 16px;
        transform: translateX(0) translateY(0) !important;
      }

      &:hover::after {
        transform: scale(1.3) !important;
      }

      &.left,
      &.right {
        left: 0;

        &::after {
          left: 20px !important;
          transform: translateX(-50%) translateY(0) !important;
        }

        .timeline-content {
          margin: 0;
          text-align: left;
          transform-origin: left center;
        }
      }

      .timeline-year {
        left: 50px !important;
        right: auto !important;
        top: -15px;
      }
    }
  }

  .group-cards {
    .group-card {
      flex: 0 0 100%;
      max-width: 350px;
      margin: 0 auto;
    }
  }

  .culture-grid {
    grid-template-columns: 1fr;

    .culture-item.large {
      grid-column: span 1;
      height: 300px;
    }

    .culture-item:not(.large) {
      height: 250px;
    }
  }

  .page-nav {
    display: none;
  }
}

@media (max-width: 576px) {
  .intro-container {
    padding: 15px;
  }

  :deep(.middle-title) {
    font-size: 1.5rem;
    margin: 60px 0 30px;
  }

  .team-intro {
    .team-logo {
      padding: 30px;

      img {
        width: 140px;
        height: 140px;
      }
    }

    .team-desc {
      padding: 25px 20px;

      .intro-title {
        font-size: 1.9rem;

        .highlight {
          font-size: 2.2rem;
        }
      }

      .intro-text {
        font-size: 1rem;
      }
    }
  }

  .purpose-content {
    .purpose-logo {
      padding: 25px;

      img {
        width: 140px;
      }
    }

    .purpose-items {
      padding: 20px;

      .purpose-item {
        padding: 10px;

        h3 {
          font-size: 1.3rem;
        }

        p {
          font-size: 0.95rem;
        }
      }
    }
  }

  .timeline-container {
    .timeline-content {
      padding: 18px;
    }

    .timeline-year {
      font-size: 1rem;
      padding: 5px 12px;
    }

    .timeline-title {
      font-size: 1.3rem;
    }

    .timeline-details {
      font-size: 0.95rem;

      p {
        margin-bottom: 8px;
      }
    }
  }

  .group-cards {
    gap: 20px;

    .group-card {
      height: 220px;
    }

    .card-front {
      .card-icon {
        width: 70px;
        height: 70px;
        margin-bottom: 20px;
      }

      h3 {
        font-size: 1.3rem;
      }
    }

    .card-back {
      padding: 20px;

      p {
        font-size: 0.95rem;
      }
    }
  }

  .culture-grid {
    gap: 15px;

    .culture-item.large,
    .culture-item:not(.large) {
      height: 220px;
    }

    .culture-overlay {
      padding: 20px;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        max-width: 95%;
      }
    }
  }
}

// 页面导航
.page-nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 15px 0;
    transition: all 0.3s ease;
    position: relative;

    &.active {
      .nav-dot {
        background: $primary-color;
        transform: scale(1.3);
        box-shadow: 0 0 15px rgba(0, 243, 255, 0.8);
      }

      .nav-label {
        opacity: 1;
        transform: translateX(0);
      }
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;

      &:hover {
        .nav-dot {
          background: $primary-color;
          transform: scale(1.2);
        }

        .nav-label {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }

  .nav-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .nav-label {
    position: absolute;
    right: 25px;
    background: rgba(30, 30, 30, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.85rem;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.3s ease;
    white-space: nowrap;
  }
}
</style>
