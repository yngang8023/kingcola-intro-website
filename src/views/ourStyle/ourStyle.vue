<script setup>
import { ref, onMounted } from 'vue'
import MiddelTitle from '@/component/middelTitle.vue'

// 颜色方案数据
const colorSchemes = ref([
    {
        name: '主色调',
        colors: [
            { name: '湛蓝', hex: '#00f3ff', rgb: '0, 243, 255' },
            { name: '深蓝', hex: '#0d324d', rgb: '13, 50, 77' }
        ]
    },
    {
        name: '辅助色',
        colors: [
            { name: '天蓝', hex: '#0072ff', rgb: '0, 114, 255' },
            { name: '浅蓝', hex: '#a3e4ff', rgb: '163, 228, 255' },
            { name: '深灰', hex: '#232222', rgb: '35, 34, 34' }
        ]
    },
    {
        name: '文本色',
        colors: [
            { name: '白色', hex: '#ffffff', rgb: '255, 255, 255' },
            { name: '浅灰', hex: '#e4e4e4', rgb: '228, 228, 228' },
            { name: '中灰', hex: '#b9b9b9', rgb: '185, 185, 185' }
        ]
    }
])

// 设计原则数据
const designPrinciples = ref([
    {
        title: '现代感',
        icon: 'icon-modern',
        description: '采用简洁、流畅的线条和形状，营造出前卫、科技感十足的视觉效果，体现团队的创新精神。'
    },
    {
        title: '一致性',
        icon: 'icon-consistency',
        description: '在各种应用场景中保持风格一致，包括颜色、字体、图标和布局，确保团队视觉形象的统一性。'
    },
    {
        title: '响应式',
        icon: 'icon-responsive',
        description: '设计适应各种屏幕尺寸和设备类型，确保在任何环境下都能提供出色的用户体验。'
    },
    {
        title: '可访问性',
        icon: 'icon-accessibility',
        description: '确保内容对所有用户友好，包括色彩对比度、字体清晰度和导航便捷性等方面的考量。'
    }
])

// 字体数据
const fontFamilies = ref([
    {
        name: '思源宋体 ExtraLight',
        type: '主标题字体',
        description: '用于重要标题和强调文字，线条细腻优雅，体现团队专业形象。',
        sample: 'KingCola 创新团队'
    },
    {
        name: '阿里妈妈方圆体 VF Regular',
        type: '正文字体',
        description: '用于正文内容，清晰易读，适合长文本阅读，保持页面整洁与专业感。',
        sample: '我们是一支充满创造力和活力的团队，致力于创新与突破。'
    }
])

// 团队获奖数据
const teamAwards = ref([
    {
        title: '2023年度全国大学生软件创新大赛一等奖',
        date: '2023-12-15',
        description: '团队自主研发的"智慧校园解决方案"在全国大学生软件创新大赛中荣获一等奖，该项目结合AI技术和物联网应用，为校园管理提供了创新解决方案。',
        image: 'award1.jpg'
    },
    {
        title: '第十二届互联网+创新创业大赛银奖',
        date: '2023-10-20',
        description: '团队开发的"碳排放监测与优化系统"在互联网+创新创业大赛中获得银奖，该项目利用大数据分析和云计算技术，为企业提供碳排放监测和优化方案。',
        image: 'award2.jpg'
    },
    {
        title: '2022华为软件精英挑战赛区域赛第一名',
        date: '2022-08-15',
        description: 'KingCola团队在华为软件精英挑战赛中表现出色，凭借高效的算法设计和优秀的团队协作能力，获得区域赛第一名的佳绩。',
        image: 'award3.jpg'
    }
])

// 折叠面板控制
const activePanels = ref(['teamAwards']) // 默认只展开团队获奖部分

// 动画效果
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll')

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top

        // 元素进入视口
        if (elementTop < window.innerHeight * 0.85) {
            element.classList.add('animate-visible')
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
    <div class="style-container">
        <!-- 团队风采标题 -->
        <section class="title-section">
            <h1 class="page-title">团队风采</h1>
            <p class="page-desc">展示KingCola团队的荣誉成就与设计风格</p>
        </section>

        <!-- 团队获奖情况 -->
        <section class="awards-section style-section">
            <MiddelTitle>团队荣誉</MiddelTitle>

            <div class="awards-list animate-on-scroll">
                <div v-for="(award, index) in teamAwards" :key="index" class="award-card">
                    <div class="award-icon">
                        <svg class="icon">
                            <use xlink:href="#icon-award"></use>
                        </svg>
                    </div>
                    <div class="award-content">
                        <h3 class="award-title">{{ award.title }}</h3>
                        <p class="award-date">{{ award.date }}</p>
                        <p class="award-description">{{ award.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 关于本站设计 (折叠面板) -->
        <section class="style-section">
            <MiddelTitle>关于本站设计</MiddelTitle>

            <el-collapse v-model="activePanels" class="style-collapse">
                <!-- 设计风格面板 -->
                <el-collapse-item title="设计风格" name="designStyle">
                    <div class="style-intro animate-on-scroll">
                        <div class="style-logo">
                            <img src="@/assets/标志2.png" alt="KingCola Logo">
                        </div>
                        <div class="style-description">
                            <h2>网站设计风格</h2>
                            <p>本网站的设计风格强调科技感与创新，采用蓝色为主色调，象征科技、信任与专业。网站的视觉语言结合了简约现代的几何元素与流畅的动效，打造出独特而一致的品牌体验。</p>
                            <p>无论是平面设计、网页设计还是产品设计，我们都确保在视觉上的吸引力和功能上的实用性。</p>
                        </div>
                    </div>
                </el-collapse-item>

                <!-- 设计原则面板 -->
                <el-collapse-item title="设计原则" name="designPrinciples">
                    <div class="principles-grid animate-on-scroll">
                        <div v-for="(principle, index) in designPrinciples" :key="index" class="principle-card">
                            <div class="principle-icon">
                                <svg class="icon">
                                    <use :xlink:href="`#${principle.icon}`"></use>
                                </svg>
                            </div>
                            <h3>{{ principle.title }}</h3>
                            <p>{{ principle.description }}</p>
                        </div>
                    </div>
                </el-collapse-item>

                <!-- 配色方案面板 -->
                <el-collapse-item title="配色方案" name="colorSchemes">
                    <div class="color-schemes animate-on-scroll">
                        <div v-for="(scheme, schemeIndex) in colorSchemes" :key="schemeIndex" class="color-scheme">
                            <h3 class="scheme-title">{{ scheme.name }}</h3>
                            <div class="color-grid">
                                <div v-for="(color, colorIndex) in scheme.colors" :key="colorIndex" class="color-card">
                                    <div class="color-preview" :style="{ backgroundColor: color.hex }"></div>
                                    <div class="color-details">
                                        <h4>{{ color.name }}</h4>
                                        <div class="color-values">
                                            <span>{{ color.hex }}</span>
                                            <span>RGB: {{ color.rgb }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>

                <!-- 字体展示面板 -->
                <el-collapse-item title="字体系统" name="fontSystem">
                    <div class="fonts-showcase animate-on-scroll">
                        <div v-for="(font, index) in fontFamilies" :key="index" class="font-card">
                            <div class="font-header">
                                <h3>{{ font.name }}</h3>
                                <span class="font-type">{{ font.type }}</span>
                            </div>

                            <div class="font-sample" :style="{ fontFamily: font.name }">
                                {{ font.sample }}
                            </div>

                            <p class="font-description">{{ font.description }}</p>
                        </div>
                    </div>
                </el-collapse-item>

                <!-- 标志使用规范面板 -->
                <el-collapse-item title="标志规范" name="logoGuidelines">
                    <div class="logo-guidelines animate-on-scroll">
                        <div class="logo-variants">
                            <div class="logo-variant">
                                <div class="logo-display">
                                    <img src="@/assets/logo.png" alt="KingCola主标志">
                                </div>
                                <h3>主标志</h3>
                                <!-- <p>用于正式场合、官方文件和主要品牌展示。</p> -->
                            </div>

                            <div class="logo-variant">
                                <div class="logo-display dark">
                                    <img src="@/assets/标志2.png" alt="KingCola副标志">
                                </div>
                                <h3>副标志</h3>
                                <!-- <p>用于空间受限场合或作为设计元素使用。</p> -->
                            </div>
                        </div>

                        <div class="logo-rules">
                            <h3>使用规范</h3>
                            <ul>
                                <li>标志周围应保留足够的空白空间，空间大小至少为标志高度的1/4</li>
                                <li>不得改变标志的颜色、比例或方向</li>
                                <li>标志最小使用尺寸为30px高度，以确保清晰可辨</li>
                                <li>在深色背景上使用浅色版本标志，在浅色背景上使用深色版本标志</li>
                            </ul>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </section>

        <el-backtop :right="20" :bottom="100" />
    </div>
</template>

<style scoped lang="scss">
$primary-color: #00f3ff;
$primary-dark: #0d324d;
$primary-gradient: linear-gradient(90deg, #00c6ff, #0072ff);
$text-color: #e4e4e4;
$section-spacing: 80px;
$card-bg: rgba(13, 15, 23, 0.5);
$card-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

// 字体导入
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

// 容器样式
.style-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: $text-color;
    font-family: '阿里妈妈方圆体 VF Regular', sans-serif;
}

// 页面标题部分
.title-section {
    text-align: center;
    margin-bottom: 50px;

    .page-title {
        font-family: '思源宋体 ExtraLight', sans-serif;
        font-size: 2.5rem;
        color: white;
        margin-bottom: 10px;
        position: relative;
        display: inline-block;

        &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: $primary-gradient;
            border-radius: 3px;
        }
    }

    .page-desc {
        color: #b9b9b9;
        font-size: 1.1rem;
        margin-top: 20px;
    }
}

// 节样式
.style-section {
    margin-bottom: $section-spacing;
}

// 动画效果
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;

    &.animate-visible {
        opacity: 1;
        transform: translateY(0);
    }
}

// 折叠面板样式
.style-collapse {
    background: transparent;
    border: none;

    :deep(.el-collapse-item__header) {
        background-color: $card-bg;
        color: white;
        border-radius: 10px;
        margin-bottom: 10px;
        padding: 15px 20px;
        font-family: '思源宋体 ExtraLight', sans-serif;
        font-size: 1.2rem;
        border: none;

        &:hover {
            background-color: rgba(13, 15, 23, 0.7);
        }
    }

    :deep(.el-collapse-item__wrap) {
        background: transparent;
        border: none;
    }

    :deep(.el-collapse-item__content) {
        padding: 20px 10px;
        color: $text-color;
    }
}

// 风格介绍
.style-intro {
    display: flex;
    background: $card-bg;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: $card-shadow;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    .style-logo {
        flex: 0 0 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $primary-dark;
        padding: 30px;

        @media (max-width: 768px) {
            flex: auto;
        }

        img {
            width: 180px;
            height: 180px;
            object-fit: contain;
        }
    }

    .style-description {
        flex: 1;
        padding: 30px;

        h2 {
            font-size: 1.8rem;
            margin-top: 0;
            margin-bottom: 20px;
            color: white;
            position: relative;
            font-family: '思源宋体 ExtraLight', sans-serif;

            &::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 60px;
                height: 3px;
                background: $primary-gradient;
                border-radius: 3px;
            }
        }

        p {
            font-size: 1rem;
            line-height: 1.8;
            margin-bottom: 15px;
        }
    }
}

// 设计原则
.principles-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;

    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
}

.principle-card {
    background: $card-bg;
    padding: 30px;
    border-radius: 10px;
    box-shadow: $card-shadow;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);

        .principle-icon {
            transform: scale(1.1);
        }
    }

    .principle-icon {
        font-size: 2.5rem;
        color: $primary-color;
        margin-bottom: 20px;
        transition: transform 0.3s ease;

        .icon {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    h3 {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: white;
    }

    p {
        font-size: 0.95rem;
        line-height: 1.6;
    }
}

// 配色方案
.color-schemes {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.color-scheme {
    .scheme-title {
        font-size: 1.4rem;
        margin-bottom: 20px;
        color: white;
        position: relative;
        display: inline-block;

        &::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 40px;
            height: 2px;
            background: $primary-color;
        }
    }
}

.color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

.color-card {
    display: flex;
    background: $card-bg;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: $card-shadow;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    .color-preview {
        flex: 0 0 80px;
        border-radius: 10px 0 0 10px;
    }

    .color-details {
        flex: 1;
        padding: 15px;

        h4 {
            margin-top: 0;
            margin-bottom: 10px;
            color: white;
            font-size: 1.1rem;
        }

        .color-values {
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-size: 0.9rem;
            color: #b9b9b9;
        }
    }
}

// 字体展示
.fonts-showcase {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.font-card {
    background: $card-bg;
    border-radius: 10px;
    padding: 25px;
    box-shadow: $card-shadow;

    .font-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        h3 {
            margin: 0;
            color: white;
            font-size: 1.2rem;
        }

        .font-type {
            background: $primary-dark;
            color: $primary-color;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
        }
    }

    .font-sample {
        font-size: 1.8rem;
        padding: 20px;
        margin-bottom: 20px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        color: white;
        line-height: 1.5;
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-left: 3px solid $primary-color;
    }

    .font-description {
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 0;
    }
}

// 标志规范
.logo-guidelines {
    background: $card-bg;
    border-radius: 10px;
    padding: 30px;
    box-shadow: $card-shadow;
}

.logo-variants {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.logo-variant {
    text-align: center;

    .logo-display {
        background: white;
        height: 200px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;

        &.dark {
            background: $primary-dark;
        }

        img {
            max-width: 150px;
            max-height: 150px;
        }
    }

    h3 {
        margin-top: 0;
        margin-bottom: 10px;
        color: white;
    }

    p {
        font-size: 0.95rem;
        margin: 0;
    }
}

.logo-rules {
    margin-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 30px;

    h3 {
        margin-top: 0;
        margin-bottom: 20px;
        color: white;
    }

    ul {
        padding-left: 20px;

        li {
            margin-bottom: 10px;
            line-height: 1.6;
        }
    }
}

// 团队获奖列表样式
.awards-list {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.award-card {
    display: flex;
    background: $card-bg;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: $card-shadow;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    .award-icon {
        flex: 0 0 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $primary-dark;
        padding: 20px;

        .icon {
            width: 3rem;
            height: 3rem;
            color: $primary-color;
        }
    }

    .award-content {
        flex: 1;
        padding: 25px;

        .award-title {
            font-size: 1.3rem;
            margin-top: 0;
            margin-bottom: 10px;
            color: white;
            font-family: '思源宋体 ExtraLight', sans-serif;
        }

        .award-date {
            font-size: 0.9rem;
            color: $primary-color;
            margin-bottom: 15px;
        }

        .award-description {
            font-size: 1rem;
            line-height: 1.7;
            margin: 0;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;

        .award-icon {
            flex: none;
            padding: 15px;
        }
    }
}

// 响应式调整
@media (max-width: 576px) {
    .style-intro {
        .style-logo {
            padding: 20px;

            img {
                width: 120px;
                height: 120px;
            }
        }

        .style-description {
            padding: 20px;

            h2 {
                font-size: 1.5rem;
            }
        }
    }

    .principle-card {
        padding: 20px;
    }

    .color-card {
        flex-direction: column;

        .color-preview {
            flex: none;
            height: 80px;
            border-radius: 10px 10px 0 0;
        }
    }

    .font-card {
        padding: 20px;

        .font-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        .font-sample {
            padding: 15px;
            font-size: 1.5rem;
        }
    }

    .logo-guidelines {
        padding: 20px;
    }

    .award-card .award-content {
        padding: 15px;

        .award-title {
            font-size: 1.1rem;
        }
    }
}
</style>
