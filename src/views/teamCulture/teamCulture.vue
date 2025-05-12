<template>
    <div class="team-culture-container">
        <section class="page-section">
            <div class="section-header">
                <h1 class="section-title">团队文化</h1>
                <div class="section-title-underline"></div>
            </div>

            <div class="culture-content">
                <div class="culture-image-container">
                    <!-- 确保图片完整展示 -->
                    <img src="@/assets/工作环境.jpg" alt="工作室环境" class="culture-image">
                    <div class="culture-image-caption">工作室环境</div>
                </div>

                <div class="culture-text">
                    <div class="culture-item">
                        <div class="culture-icon">
                            <svg class="icon">
                                <use xlink:href="#icon-wenhua"></use>
                            </svg>
                        </div>
                        <div class="culture-detail">
                            <h3>创新精神</h3>
                            <p>我们鼓励每位成员勇于尝试新技术、新方法，不断突破自我，推动团队发展。</p>
                        </div>
                    </div>

                    <div class="culture-item">
                        <div class="culture-icon">
                            <svg class="icon">
                                <use xlink:href="#icon-wenhua"></use>
                            </svg>
                        </div>
                        <div class="culture-detail">
                            <h3>团队协作</h3>
                            <p>相互信任、共同进步是我们的理念，每个项目都是团队智慧的结晶。</p>
                        </div>
                    </div>

                    <div class="culture-item">
                        <div class="culture-icon">
                            <svg class="icon">
                                <use xlink:href="#icon-wenhua"></use>
                            </svg>
                        </div>
                        <div class="culture-detail">
                            <h3>追求卓越</h3>
                            <p>我们对每一个项目都力求精益求精，以高标准要求自己，创造出优秀的作品。</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 团队活动部分 -->
        <section class="page-section">
            <div class="section-header">
                <h2 class="section-title">团队活动</h2>
                <div class="section-title-underline"></div>
            </div>

            <div class="activities-grid">
                <div class="activity-card">
                    <div class="activity-image-container">
                        <img src="@/assets/团建.jpg" alt="成员团建" class="activity-image">
                    </div>
                    <div class="activity-content">
                        <h3>成员团建</h3>
                        <p>工作室团建充满欢笑与活力，团队成员共同参与各种创意挑战和团体活动。从团队建设游戏到创意工坊，每个人都在轻松愉快的氛围中建立更紧密的关系。</p>
                    </div>
                </div>

                <div class="activity-card">
                    <div class="activity-image-container">
                        <img src="@/assets/总结大会.jpg" alt="总结大会" class="activity-image">
                    </div>
                    <div class="activity-content">
                        <h3>总结大会</h3>
                        <p>工作室学期总结大会是一次深入回顾与展望的盛会。团队分享成就与经验，讨论挑战与改进。温馨氛围中，共同制定新目标，激励团队更进一步。</p>
                    </div>
                </div>

                <div class="activity-card">
                    <div class="activity-image-container">
                        <img src="@/assets/小组会议.jpg" alt="小组会议" class="activity-image">
                    </div>
                    <div class="activity-content">
                        <h3>小组会议</h3>
                        <p>工作室小组会议充满活力，成员们讨论项目进展、分享想法。紧凑而高效，每人发表见解，解决问题。氛围融洽，促进了团队合作与创新。</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 工作环境部分 -->
        <section class="page-section">
            <div class="section-header">
                <h2 class="section-title">工作环境</h2>
                <div class="section-title-underline"></div>
            </div>

            <div class="workspace-showcase">
                <div class="workspace-description">
                    <p>工作室充满创意氛围，明亮宽敞的空间中布置着现代设计的工作桌。温馨的灯光和绿植增添活力，员工间交流合作紧密。富有设计感的墙面装饰和先进的设备构成了高效、舒适的工作场所。</p>
                </div>
                <div class="workspace-gallery">
                    <div class="gallery-image">
                        <img src="@/assets/工作环境.jpg" alt="工作环境1">
                    </div>
                    <div class="gallery-image">
                        <img src="@/assets/小组会议.jpg" alt="工作环境2">
                    </div>
                    <div class="gallery-image">
                        <img src="@/assets/团建.jpg" alt="工作环境3">
                    </div>
                </div>
            </div>
        </section>

        <el-backtop :right="20" :bottom="100" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
    window.scrollTo(0, 0)

    // 添加滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.1 })

    document.querySelectorAll('.page-section').forEach(section => {
        observer.observe(section)
    })
})
</script>

<style scoped lang="scss">
$primary-color: #00f3ff;
$primary-dark: #0d324d;
$primary-gradient: linear-gradient(90deg, #00c6ff, #0072ff);
$text-color: #e4e4e4;

.team-culture-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: $text-color;
}

.page-section {
    margin-bottom: 5rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;

    &.animate-visible {
        opacity: 1;
        transform: translateY(0);
    }
}

.section-header {
    margin-bottom: 2.5rem;
    text-align: center;
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

.section-title-underline {
    height: 3px;
    width: 100px;
    margin: 0 auto;
    background: linear-gradient(90deg, transparent, $primary-color, transparent);
}

.culture-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 768px) {
        flex-direction: row;
    }
}

.culture-image-container {
    flex: 1;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    height: 460px;

    @media (max-width: 767px) {
        height: 300px;
    }
}

.culture-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
        transform: scale(1.05);
    }
}

.culture-image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem;
    text-align: center;
    font-weight: bold;
}

.culture-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.culture-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: rgba(13, 15, 23, 0.5);
    padding: 1.5rem;
    border-radius: 10px;
    border-left: 3px solid $primary-color;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 243, 255, 0.2);
    }
}

.culture-icon {
    font-size: 2rem;
    color: $primary-color;

    .icon {
        width: 2rem;
        height: 2rem;
    }
}

.culture-detail {
    h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: $primary-color;
        font-size: 1.25rem;
    }

    p {
        margin: 0;
        line-height: 1.6;
    }
}

// 活动卡片样式
.activities-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.activity-card {
    background: rgba(13, 15, 23, 0.5);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-10px);

        .activity-image {
            transform: scale(1.1);
        }
    }
}

.activity-image-container {
    height: 200px;
    overflow: hidden;
}

.activity-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.activity-content {
    padding: 1.5rem;

    h3 {
        color: $primary-color;
        margin-top: 0;
        margin-bottom: 0.75rem;
        position: relative;
        padding-bottom: 0.5rem;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 2px;
            background: $primary-gradient;
        }
    }

    p {
        margin: 0;
        line-height: 1.6;
    }
}

// 工作环境部分
.workspace-showcase {
    background: rgba(13, 15, 23, 0.5);
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.workspace-description {
    margin-bottom: 2rem;
    text-align: center;

    p {
        font-size: 1.1rem;
        line-height: 1.8;
        max-width: 800px;
        margin: 0 auto;
    }
}

.workspace-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.gallery-image {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    height: 250px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;

        &:hover {
            transform: scale(1.05);
        }
    }
}

@media (max-width: 768px) {
    .culture-item {
        padding: 1rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .workspace-showcase {
        padding: 1.5rem;
    }
}
</style>