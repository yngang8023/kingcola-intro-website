<template>
    <div class="success-container">
        <div class="success-content">
            <div class="success-icon">
                <i class="el-icon-check-circle"></i>
            </div>
            <h1 class="success-title">提交成功</h1>
            <p class="success-message">恭喜您，报名信息已成功提交！</p>
            <p class="success-desc">请及时关注QQ群消息，后续消息将通过QQ群通知。</p>

            <div class="success-info">
                <!-- <div class="info-item">
                    <i class="el-icon-time"></i>
                    <span>预计审核时间：3-5个工作日</span>
                </div> -->
                <div class="info-item">
                    <i class="el-icon-message"></i>
                    <span>有任何问题请联系：QQ群 123456789</span>
                </div>
            </div>

            <div class="success-actions">
                <el-button type="primary" @click="goToHome">返回首页</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
    router.push('/')
}
</script>

<style lang="scss" scoped>
.success-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to bottom, #1a1a1a, #333333);
    padding: 2rem;
}

.success-content {
    max-width: 600px;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 3rem 2rem;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    color: #ffffff;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(to right, #5ec5df, #8f7eda);
    }
}

.success-icon {
    font-size: 5rem;
    color: #5ec5df;
    margin-bottom: 1.5rem;
    animation: pulse 2s infinite;

    i {
        display: inline-block;
    }
}

.success-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #5ec5df, #8f7eda);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.success-message {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.9);
}

.success-desc {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem;
}

.success-info {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    padding: 1.5rem;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: rgba(255, 255, 255, 0.8);

    i {
        color: #5ec5df;
        font-size: 1.2rem;
    }
}

.success-actions {
    margin-top: 2rem;

    .el-button {
        padding: 12px 30px;
        font-size: 1rem;
        background: linear-gradient(to right, #5ec5df, #8f7eda);
        border: none;

        &:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(94, 197, 223, 0.3);
        }
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

@media (max-width: 768px) {
    .success-content {
        padding: 2rem 1.5rem;
    }

    .success-title {
        font-size: 2rem;
    }

    .success-message {
        font-size: 1.2rem;
    }
}
</style>