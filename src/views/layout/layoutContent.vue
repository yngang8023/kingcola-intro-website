<script setup>
import footContent from '@/component/footCotent/footContent.vue'
</script>

<template>
  <body>
    <div class="content">
      <div class="box-head">
        <div class="header">
          <div class="header-image">
            <router-link to="/go"
              ><img src="@/assets/标题.png" width="30%"
            /></router-link>
          </div>
          <div class="bar">
            <router-link to="/introduce">
              <div>
                <svg class="icon"><use xlink:href="#icon-jieshao"></use></svg>
                <span>团队介绍</span>
              </div>
            </router-link>
            <router-link to="/style">
              <div>
                <svg class="icon"><use xlink:href="#icon-jiangbei"></use></svg>
                <span>团队风采</span>
              </div>
            </router-link>
            <router-link to="/project">
              <div>
                <svg class="icon"><use xlink:href="#icon-xiangmu"></use></svg>
                <span>团队项目</span>
              </div>
            </router-link>
            <router-link to="/join">
              <div>
                <svg class="icon">
                  <use xlink:href="#icon-navicon-bmjl"></use>
                </svg>
                <span>加入我们</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="sonLocation"><router-view></router-view></div>
      <div><footContent></footContent></div>
    </div>
  </body>
</template>

<style scoped lang="scss">
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: '思源宋体 Medium';
  font-weight: 500;
  src:
    url('//at.alicdn.com/wf/webfont/B6XV0nUBXUTA/KJM3BAo3e7kA.woff2')
      format('woff2'),
    url('//at.alicdn.com/wf/webfont/B6XV0nUBXUTA/QB8Fr2NJBoa5.woff')
      format('woff');
  font-display: swap;
}

@font-face {
  font-family: '阿里妈妈方圆体 VF Regular';
  src:
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/BU4ZRd4hOdYT.woff2')
      format('woff2'),
    url('//at.alicdn.com/wf/webfont/i7OBlFN3Zhyb/e6Cga7iirigP.woff')
      format('woff');
  font-display: swap;
}
.box-head {
  width: 100%;
  height: 10vh;
}
.header-image {
  margin-left: 70px;
  height: 50px;
}
body .header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgb(242, 239, 239);
  box-shadow: 2px 2px 5px rgb(219, 208, 208);
  z-index: 999;
}

html,
body {
  position: relative;
  width: 100%;
  background: linear-gradient(to bottom, #232222, #434343);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-image {
  font-family: '思源宋体 Medium';
  padding-left: 15px;
  // font-weight: bold;
  letter-spacing: 2px;
  font-size: 2em;
}

.bar {
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  span {
    font-family: '阿里妈妈方圆体 VF Regular';
    font-weight: 500;
    letter-spacing: 2px;
    padding-left: 5px;
  }

  a {
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 0.8em;
    padding: 0px 10px 0px 10px;
  }
  a:hover {
    background-color: #ffffff;
    font-weight: bold;
  }
}

.bar .router-link-active {
  position: relative;
  background-color: rgb(255, 255, 255);
  :deep(span) {
    font-weight: 800;
  }
  &:before {
    position: absolute;
    top: 70%;
    left: 50%;
    width: 10px;
    height: 10px;
    transform: translateX(-50%);
    content: '';
    background-image: url('@/assets/star4.png');
    background-size: cover;
  }
}
</style>
