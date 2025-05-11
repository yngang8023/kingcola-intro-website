<script setup>
import MiddelTitle from '@/component/middelTitle.vue'
import { ref } from 'vue'
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
</script>

<template>
  <div class="box">
    <div class="container">
      <div class="bg">
        <span class="yuan"></span>
        <span class="yuan"></span>
        <span class="yuan"></span>
      </div>
      <div class="glass">
        <div class="logo">
          <img src="@/assets/logo.png" />
        </div>
        <span class="text">
          <br />
          <br />
          <br />
          <span class="first">K</span>ingCola-ICG 团队成立于 2017 年 6
          月，以建设成为湖科大最活跃的自发性 学生科研团队
          为目标，是一个开放式的创新创业团队。团队成员学
          科交叉，来自各个学院的同 学优势互补，以增强自身综合能力为主，
          以学科竞赛为辅，推动成员的发展。团 队因不同的执着和对创业的
          追求而聚集在一起，共同为“KingCola 团队”的发 展壮大而努力，
          技术研发同学是我们得力的技术骨干，商学院的同学为团队平台 提
          供商业支撑，策划设计的同学为产品的外观设计而努力。
          团队涉及多领域，在数学建模、电子商务、物联网、创新创业、
          科普作品等各项重量级赛事中共累计斩获国家级奖励 20 余项、省级 奖励 70
          余项、校级奖百余项，获得软件著作权 11 项，获得实用新 型专利 3 项。SCI
          二区论文 3 篇， SCI 四区论文 2 篇（导师一
          作，团队成员二作）目前入驻计算机学院微科创新创业基地 4 年多，
          已开发多项实验室产品。</span
        >
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="text"
          >我们团队发展至今已经进行过六届成员更替，每一届团队成员
          都在为团队进步而奋斗，第一届 KingCola-ICG 团队成员由张梁子沁
          作为负责人，陈世豪、曾骏、宋文华、张博玮以及何世鹏等 17 名成
          员组成。第二届 KingCola-ICG 团队成员则由张博玮作为负责人，宋
          文华、欧俣材、李昊、谢儒等 28 名成员组成。第三届 KingCola-ICG
          团队成员则由李昊、谢儒作为负责人，常云鹏、邓璇、胡望等 22
          名成员组成。第四届 KingCola-ICG 团队成员则由常云鹏、王晶
          作为负责人，刘晨阳、张旭宁、唐文杰等 26 名成员组成。第五届
          KingCola-ICG 团队成员则由刘晨阳、张旭宁作为负责人，廖子豪、
          何宇轩、刘文康等 28 名成员组成。第六届 KingCola-ICG 团队成员
          则由刘文康、李美玲作为负责人，李诺、刘彬、陈钰轩等 30 名成员
          组成。第七届 KingCola-ICG 团队成员则由李诺、陈嘉烨作为负责人，
          邓燕勤、黄妍、熊璇等 30 名成员组成。每届团队的成员有来自各个
          学院的同学，利用自身专业学科的优势，解决项目组的相关问题及
          推动项目的发展</span
        >
      </div>
    </div>
    <MiddelTitle>团队宗旨</MiddelTitle>
    <div class="container3">
      <div class="container3-box1">
        <div class="container3-box2">
          <div class="image-b">
            <img src="@/assets/标志2.png" width="170px" />
          </div>
          <div class="container3-content">
            <span> 自主创新 </span>
            <span> 团队合作 </span>
            <span> 挑战自我 </span>
          </div>
        </div>
      </div>
    </div>
    <MiddelTitle>团队分组</MiddelTitle>
    <div class="container4">
      <div
        class="container4-card"
        v-for="(item, index) in classIfy"
        :key="index"
      >
        <div class="card-top">
          <div class="card-top-content">
            <img :src="`/src/assets/${item.className}.png`" alt="" />
            <h3>{{ item.className }}</h3>
          </div>
        </div>
        <div class="card-bottom">
          <div class="card-bottom-content">
            <p>
              {{ item.classIntroduce }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <MiddelTitle>团队文化</MiddelTitle>
    <div class="container5">
      <div class="box-left">
        <img src="@/assets/工作环境.jpg" alt="" />
        <div class="bg0">
          <span class="one">工作环境</span>
          <span class="two"
            >工作室充满创意氛围，明亮宽敞的空间中布置着现代设计的工作桌。温馨的灯光和绿植增添活力，员工间交流合作紧密。富有设计感的墙面装饰和先进的设备构成了高效、舒适的工作场所。</span
          >
        </div>
      </div>
      <div class="box-right">
        <div class="c5-box1">
          <img src="@/assets/团建.jpg" alt="" />
          <div class="bg1">
            <span class="one">成员团建</span>
            <span class="two"
              >工作室团建充满欢笑与活力，团队成员共同参与各种创意挑战和团体活动。从团队建设游戏到创意工坊，每个人都在轻松愉快的氛围中建立更紧密的关系。团建活动不仅促进了团队协作，也激发了创造力。</span
            >
          </div>
        </div>
        <div class="c5-box2">
          <img src="@/assets/总结大会.jpg" alt="" />
          <div class="bg2">
            <span class="one">总结大会</span>
            <span class="two"
              >工作室学期总结大会是一次深入回顾与展望的盛会。团队分享成就与经验，讨论挑战与改进。温馨氛围中，共同制定新目标，激励团队更进一步。</span
            >
          </div>
        </div>
      </div>
      <div class="box-last">
        <img src="@/assets/小组会议.jpg" alt="" />
        <div class="bg3">
          <span class="one">小组会议</span>
          <span class="two"
            >工作室小组会议充满活力，成员们讨论项目进展、分享想法。紧凑而高效，每人发表见解，解决问题。氛围融洽，促进了团队合作与创新。</span
          >
        </div>
      </div>
    </div>
    <el-backtop :right="20" :bottom="100" />
  </div>
</template>

<style scoped lang="scss">
.logo {
  float: left;
  margin: 15px 15px;
  img {
    width: 150px;
    height: 150px;
  }
}
.text {
  span {
    font-size: 2em;
    float: left;
    font-family: '思源宋体 ExtraLight';
  }
  font-size: 1em;
  font-family: '思源宋体 ExtraLight';
}
.container {
  position: relative;
  left: 0;
  right: 0;
  height: 600px;
  width: 100%;
  background-color: #202020;
}
.glass {
  position: absolute;
  overflow: hidden;
  padding: 5px 20px;
  width: 90vw;
  height: 491px;
  top: 40px;
  left: 50%;
  transform: translateX(-49%);
  border-radius: 2%;
  color: #eee;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  box-shadow:
    inset 1px 1px 6px rgba(255, 255, 255, 0.3),
    2px 2px 15px rgba(0, 0, 0, 0.5);
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 60px;
  left: 0;
}

.yuan {
  background: #fff;
  position: absolute;
  top: 400px;
  left: 1vw;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 1px 1px 20px #000;
  opacity: 0.8;
}
.yuan:nth-child(1) {
  width: 100px;
  height: 100px;
  background-color: #f69c61;
  animation: am1 ease-in-out 3s infinite alternate;
}
.yuan:nth-child(2) {
  top: 5vh;
  left: 85vw;
  width: 70px;
  height: 70px;
  background-color: aqua;
  animation: am1 4s ease-in-out infinite alternate-reverse;
}
.yuan:nth-child(3) {
  top: 70vh;
  left: 90vw;
  width: 90px;
  height: 90px;
  background-color: #8f7eda;
  animation: am1 2.5s ease-in-out infinite alternate;
}
@keyframes am1 {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-15px);
  }
}

.container3 {
  width: 90vw;
  height: 500px;
}
.container3-box1 {
  position: relative;
  transform: translate(160px, 75px);
  background-color: #878787;
  width: 70vw;
  height: 80%;
  border-radius: 1%;
  opacity: 0.8;
}
.container3-box2 {
  position: absolute;
  background-color: #292929;
  border-radius: 1%;
  box-shadow: inset 1px 1px 5px #393939 2px 2px 10px #000000;
  top: -45px;
  left: 45px;
  width: 70vw;
  height: 100%;
  .image-b {
    position: absolute;
    top: 50%;
    margin-left: 40px;
    transform: translateY(-50%);
  }
  .container3-content {
    display: flex;
    width: calc(60vw - 170px);
    justify-content: space-around;
    position: absolute;
    left: 240px;
    top: 50px;
    span {
      position: relative;
      cursor: default;
      display: inline-block;
      color: #eee;
      font-size: 2em;
      width: 32px;
      letter-spacing: 10px;
    }
    span:nth-child(1)::before {
      position: absolute;
      left: 45px;
      top: 10px;
      width: 118px;
      content: '我们的目标是建设成为湖南科技大学最活跃的自发性学生科研团队。团队注重自主创新，致力于通过学生的主动性和创造性推动科研项目的发展。成员在各学科领域交叉，利用各自的专业知识，以增强自身综合能力为主，推动团队的自主创新。';
      font-size: 10px;
    }
    span:nth-child(2)::before {
      position: absolute;
      left: 45px;
      top: 10px;
      width: 118px;
      content: '团队的成员来自不同学院，学科背景交叉，具有互补性。强调成员之间的协同合作以提高整体团队的综合能力。商学院的同学为团队提供商业支撑，技术研发同学作为技术骨干，策划设计的同学负责产品的外观设计，展现了多学科合作的特点。';
      font-size: 10px;
    }
    span:nth-child(3)::before {
      position: absolute;
      left: 45px;
      top: 10px;
      width: 118px;
      content: '团队的发展历程中，每一届成员都在为团队的进步而奋斗。团队涉足多个领域，参与各类重量级赛事，斩获国家级、省级、校级奖项，获得软件著作权和实用新型专利，发表SCI论文，展现了团队成员在科研和创新方面挑战自我的态度。';
      font-size: 10px;
    }
  }
}
.container4 {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
  // .container4-card {
  //   position: relative;
  // }
}
.container4-card {
  width: 26%;
}
.container4-card:nth-child(3n + 1) {
  margin-left: 60px;
}
.card-top-content,
.card-bottom-content {
  width: 250px;
  height: 150px;
  transition: 0.2s;
}
.card-bottom-content {
  height: 122px;
}

.card-top-content {
  position: relative;
  z-index: 10;
  display: flex;
  transition: 0.5s;
  background-color: #676565;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #eeeded;
  transform: translateY(50px);
  :deep(img) {
    width: 80px;
    height: 80px;
  }

}
.container4-card:hover .card-top-content {
  transform: translateY(0px);
  background-color: #6f598c;
}
.container4-card:hover .card-bottom-content {
  transform: translateY(0px);
}
.card-bottom-content {
  p {
    font-size: 11px;
  }
  font-family: '思源宋体 ExtraLight';
  transform: translateY(-59px);
  transition: 0.5s;
  padding: 5px 10px;
  background-color: #fff;
}
.container5 {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    filter: brightness(0.8);
  }
  .box-left {
    position: relative;
    height: 466px;
    margin-right: 50px;
    img {
      border-radius: 3%;
      width: 350px;
    }
  }
  .box-right {
    display: flex;
    height: 466px;
    width: 280px;
    margin-right: 50px;
    flex-direction: column;
    justify-content: space-between;
    img {
      border-radius: 3%;
      width: 280px;
    }
    .c5-box1 {
      position: relative;
    }
    .c5-box2 {
      position: relative;
    }
  }
  .box-last {
    position: relative;
    img {
      border-radius: 3%;
      width: 250px;
    }
  }
  .bg0,
  .bg1,
  .bg2,
  .bg3 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #8b5ec7;
    opacity: 0;
    transition: 0.5s;
    border-radius: 3%;
  }
  .one {
    font-family: '思源宋体 ExtraLight';
    font-size: 20px;
    color: #eee;
  }
  .two {
    font-family: '思源宋体 ExtraLight';
    margin-top: 20px;
    padding: 20px;
    font-size: 13px;
    color: #eee;
  }
  .box-left:hover .bg0,
  .c5-box1:hover .bg1,
  .c5-box2:hover .bg2,
  .box-last:hover .bg3 {
    opacity: 1;
  }
  .bg1 {
    background-color: #b09742;
  }
  .bg2 {
    background-color: #4190b5;
  }
  .bg3 {
    background-color: #b45c5c;
  }
}
</style>
