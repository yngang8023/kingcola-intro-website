<script setup></script>

<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-section logo-section">
        <img src="@/assets/logo.png" alt="KingCola Logo" />
        <div class="slogan">探索未知 · 引领科技 · 创造未来</div>
        <div class="slogan">有问题和建议欢迎及时联系我们</div>
      </div>

      <div class="footer-section contact-section">
        <h4>联系我们</h4>
        <p><i class="icon-qq"></i> 官方QQ：3160476026</p>
        <p><i class="icon-group"></i> 招新QQ群：776728854</p>
        <p><i class="icon-mail"></i> 邮箱：email@kingcola-icg.cn</p>
      </div>

      <div class="footer-section links-section">
        <h4>快速链接</h4>
        <router-link to="/introduce">团队介绍</router-link>
        <router-link to="/style">团队风采</router-link>
        <router-link to="/project">团队项目</router-link>
        <router-link to="/join">加入我们</router-link>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025-{{ new Date().getFullYear() }} KingCola-ICG 创新团队 · 版权所有</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 设置基本变量
$primary-color: #00f3ff;
$primary-dark: #0d324d;
$text-color: #e4e4e4;
$border-color: rgba(0, 243, 255, 0.3);
$footer-bg: #0d0d0d;
$footer-border: linear-gradient(90deg, transparent, $primary-color, transparent);

// 字体导入
@font-face {
  font-family: '阿里妈妈灵动体 VF Thin';
  src:
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/MU1lXRzLFGsC.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/G5e7O2azklS2.woff') format('woff');
  font-display: swap;
}

.footer {
  position: relative;
  z-index: 100;
  width: 100%;
  background-color: $footer-bg;
  color: $text-color;
  font-family: '阿里妈妈灵动体 VF Thin', sans-serif;

  // 顶部边框动画效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: $footer-border;
  }
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.footer-section {
  padding: 0 1rem;
  margin-bottom: 1rem;

  h4 {
    color: $primary-color;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: $primary-color;
    }
  }
}

.logo-section {
  flex: 1 1 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 0.5rem;
  }

  .slogan {
    font-size: 0.9rem;
    color: $text-color;
    opacity: 0.8;
    margin-top: 0.5rem;
    letter-spacing: 1px;
  }
}

.contact-section {
  flex: 1 1 240px;

  p {
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;

    i {
      margin-right: 8px;
      color: $primary-color;
    }
  }
}

.links-section {
  flex: 1 1 240px;
  display: flex;
  flex-direction: column;

  a {
    color: $text-color;
    text-decoration: none;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
      color: $primary-color;
      transform: translateX(5px);
    }

    &::before {
      content: '>';
      margin-right: 8px;
      color: $primary-color;
      opacity: 0.5;
    }
  }
}

.footer-bottom {
  text-align: center;
  padding: 1rem;
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.3);

  p {
    margin: 0;
    opacity: 0.7;
  }
}

// 简单图标
.icon-qq,
.icon-group,
.icon-mail {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-qq::before {
  content: 'QQ';
  color: $primary-color;
}

.icon-group::before {
  content: '群';
  color: $primary-color;
}

.icon-mail::before {
  content: '@';
  color: $primary-color;
}

// 响应式布局
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }

  .footer-section {
    width: 100%;
    margin-bottom: 1.5rem;

    h4::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .links-section {
    align-items: center;

    a:hover {
      transform: none;
    }
  }

  .contact-section p {
    justify-content: center;
  }
}
</style>
