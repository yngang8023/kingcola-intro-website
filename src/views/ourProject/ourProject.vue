<script setup>
import { ref, onMounted, computed } from 'vue'
import MiddelTitle from '@/component/middelTitle.vue'

// 项目类型
const projectTypes = ref([
    '全部',
    '网站开发',
    '移动应用',
    '小程序',
    '智能硬件',
    '研究项目'
])

// 当前选中的项目类型
const currentType = ref('全部')

// 团队项目数据
const projectsData = ref([
    {
        id: 1,
        name: 'KingCola官方网站',
        description: '团队官方展示网站，使用Vue.js和Element Plus构建，展示团队信息、项目成果和团队文化。',
        image: 'website_project.jpg',
        type: '网站开发',
        techs: ['Vue.js', 'Element Plus', 'SCSS'],
        year: '2023'
    },
    {
        id: 2,
        name: '校园导航系统',
        description: '基于GPS和室内定位技术的校园导航应用，为师生提供精准导航、信息查询和校园活动推送服务。',
        image: 'campus_nav.jpg',
        type: '移动应用',
        techs: ['Flutter', 'Firebase', 'Google Maps API'],
        year: '2022'
    },
    {
        id: 3,
        name: '智能垃圾分类系统',
        description: '结合计算机视觉的智能垃圾分类系统，通过摄像头识别垃圾类型并进行自动分类，提高回收效率。',
        image: 'waste_sorting.jpg',
        type: '智能硬件',
        techs: ['Python', 'TensorFlow', 'Arduino'],
        year: '2021'
    },
    {
        id: 4,
        name: '大学生创业服务平台',
        description: '为大学生创业者提供资源对接、创业指导、投融资信息等服务的综合平台，促进校园创新创业生态。',
        image: 'startup_platform.jpg',
        type: '网站开发',
        techs: ['React', 'Node.js', 'MongoDB'],
        year: '2022'
    },
    {
        id: 5,
        name: '健康打卡小程序',
        description: '疫情期间开发的健康打卡小程序，支持体温记录、行程轨迹、健康码展示等功能。',
        image: 'health_checkin.jpg',
        type: '小程序',
        techs: ['微信小程序', 'JavaScript', 'Cloud Database'],
        year: '2020'
    },
    {
        id: 6,
        name: '人工智能教学辅助系统',
        description: '基于机器学习的教学辅助系统，分析学生学习行为，提供个性化学习建议和教学资源推荐。',
        image: 'ai_education.jpg',
        type: '研究项目',
        techs: ['Python', 'Scikit-learn', 'Django'],
        year: '2023'
    },
    {
        id: 7,
        name: '智慧农业监测平台',
        description: '通过物联网传感器实时监测农作物生长环境，提供智能灌溉、病虫害预警等功能的农业管理平台。',
        image: 'smart_agriculture.jpg',
        type: '智能硬件',
        techs: ['树莓派', 'MQTT', 'ESP32', 'Vue.js'],
        year: '2021'
    },
    {
        id: 8,
        name: '校园二手交易平台',
        description: '面向高校学生的二手物品交易平台，支持信息发布、在线聊天、物品估价等功能。',
        image: 'campus_trade.jpg',
        type: '移动应用',
        techs: ['React Native', 'Express', 'Socket.io'],
        year: '2022'
    }
])

// 根据类型过滤项目
const filteredProjects = computed(() => {
    if (currentType.value === '全部') {
        return projectsData.value
    } else {
        return projectsData.value.filter(project => project.type === currentType.value)
    }
})

// 切换项目类型
const changeType = (type) => {
    currentType.value = type
}

// 动画效果
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll')

    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom

        // 元素进入视口，添加延迟动画
        if (elementTop < window.innerHeight * 0.9 && elementBottom > 0) {
            setTimeout(() => {
                element.classList.add('animate-visible')
            }, index * 100) // 每个卡片延迟100ms显示
        }
    })
}

onMounted(() => {
    window.addEventListener('scroll', animateOnScroll)
    // 初始检查
    animateOnScroll()

    // 重置滚动位置
    window.scrollTo({
        top: 0,
        behavior: 'auto'
    })
})
</script>

<template>
    <div class="project-container">
        <!-- 项目标题 -->
        <MiddelTitle>团队项目展示</MiddelTitle>

        <!-- 项目分类选择器 -->
        <div class="project-filter">
            <div v-for="type in projectTypes" :key="type" class="filter-item" :class="{ active: currentType === type }"
                @click="changeType(type)">
                {{ type }}
            </div>
        </div>

        <!-- 项目展示网格 -->
        <div class="projects-grid">
            <div v-for="project in filteredProjects" :key="project.id" class="project-card animate-on-scroll">
                <div class="card-image">
                    <div class="year-badge">{{ project.year }}</div>
                    <img :src="`/src/assets/${project.image}`" :alt="project.name">
                </div>
                <div class="card-content">
                    <h3 class="project-title">{{ project.name }}</h3>
                    <div class="project-type">{{ project.type }}</div>
                    <p class="project-description">{{ project.description }}</p>
                    <div class="tech-tags">
                        <span v-for="(tech, index) in project.techs" :key="index" class="tech-tag">
                            {{ tech }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 当没有项目时显示 -->
        <div v-if="filteredProjects.length === 0" class="no-projects">
            <div class="no-data-message">
                暂无此类型项目，敬请期待...
            </div>
        </div>

        <el-backtop :right="20" :bottom="100" />
    </div>
</template>

<style scoped lang="scss">
$primary-color: #00f3ff;
$primary-dark: #0d324d;
$primary-gradient: linear-gradient(90deg, #00c6ff, #0072ff);
$bg-color: #232222;
$text-color: #e4e4e4;
$section-spacing: 60px;
$card-bg: rgba(13, 15, 23, 0.5);
$card-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

// 容器样式
.project-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: $text-color;
}

// 动画效果
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &.animate-visible {
        opacity: 1;
        transform: translateY(0);
    }
}

// 项目筛选
.project-filter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    gap: 15px;
    margin-bottom: $section-spacing;

    .filter-item {
        padding: 8px 20px;
        background: $card-bg;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid transparent;

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 243, 255, 0.2);
        }

        &.active {
            background: rgba(0, 243, 255, 0.15);
            color: $primary-color;
            border-color: $primary-color;
            box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
        }
    }
}

// 项目网格
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: $section-spacing;
}

// 项目卡片
.project-card {
    background: $card-bg;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: $card-shadow;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);

        .card-image img {
            transform: scale(1.05);
        }
    }

    .card-image {
        height: 200px;
        position: relative;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .year-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: $primary-gradient;
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-weight: bold;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            z-index: 2;
        }
    }

    .card-content {
        padding: 20px;

        .project-title {
            font-size: 1.4rem;
            color: white;
            margin-top: 0;
            margin-bottom: 8px;
        }

        .project-type {
            display: inline-block;
            background: $primary-dark;
            color: $primary-color;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.9rem;
            margin-bottom: 15px;
        }

        .project-description {
            margin-bottom: 20px;
            line-height: 1.6;
            color: #b9b9b9;
        }

        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .tech-tag {
                background: rgba(0, 0, 0, 0.2);
                color: #a3e4ff;
                padding: 4px 10px;
                border-radius: 5px;
                font-size: 0.85rem;
                border: 1px solid rgba(0, 243, 255, 0.2);
            }
        }
    }
}

// 无数据显示
.no-projects {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0;

    .no-data-message {
        font-size: 1.2rem;
        color: #888;
        text-align: center;
        padding: 30px;
        background: $card-bg;
        border-radius: 10px;
        width: 100%;
        max-width: 500px;
        border: 1px dashed rgba(255, 255, 255, 0.1);
    }
}

// 响应式设计
@media (max-width: 768px) {
    .project-filter {
        .filter-item {
            padding: 6px 15px;
            font-size: 0.9rem;
        }
    }

    .projects-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .project-card {
        .card-image {
            height: 160px;
        }

        .card-content {
            padding: 15px;

            .project-title {
                font-size: 1.2rem;
            }

            .project-description {
                font-size: 0.9rem;
            }
        }
    }
}

@media (max-width: 480px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }

    .project-filter {
        gap: 10px;

        .filter-item {
            padding: 5px 12px;
            font-size: 0.85rem;
        }
    }
}
</style>
