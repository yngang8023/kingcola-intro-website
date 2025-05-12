import footContentVue from '@/component/footCotent/footContent.vue';
<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { submitRegistration } from '@/api/registrationAPI.js'
import footContent from '@/component/footCotent/footContent.vue'
import frontendIcon from '@/assets/前端开发.png'
import backendIcon from '@/assets/后端开发.png'
import mlIcon from '@/assets/机器学习.png'
import embeddedIcon from '@/assets/嵌入式开发.png'
import productIcon from '@/assets/产品设计.png'
import planningIcon from '@/assets/策划运营.png'

const route = useRoute()
const router = useRouter()
const isSubmitting = ref(false)
const isFormComplete = ref(false)
const form = ref()

// 图标映射
const iconMap = {
  '前端开发': frontendIcon,
  '后端开发': backendIcon,
  '机器学习': mlIcon,
  '嵌入式开发': embeddedIcon,
  '产品设计': productIcon,
  '策划运营': planningIcon
}

// 获取图标路径的函数
const getIconPath = (className) => {
  return iconMap[className] || ''
}

// 获取岗位类型
let TclassName = route.query.className || '前端开发'
let TclassIntroduce = ''

// 表单数据
const formData = ref({
  id: '',
  direction: TclassName,
  name: '',
  sex: '',
  grade: '',
  major: '',
  phone: '',
  qq: '',
  email: '',
  wechat: '',
  portfolio: '',
  experience: '',
  skills: [],
  expectation: '',
  introduction: ''
})

// 表单验证规则
const rules = ref({
  id: [
    { required: true, message: '学号不能为空', trigger: 'blur' },
    { pattern: /^\d{8,12}$/, message: '请输入正确的学号格式', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度应在2-20个字符之间', trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '性别不能为空', trigger: 'change' }
  ],
  grade: [
    { required: true, message: '年级不能为空', trigger: 'change' }
  ],
  major: [
    { required: true, message: '专业不能为空', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '电话不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  qq: [
    { required: true, message: 'QQ号不能为空', trigger: 'blur' },
    { pattern: /^\d{5,12}$/, message: '请输入正确的QQ号码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  skills: [
    { type: 'array', message: '请至少选择一项技能', trigger: 'change' }
  ],
  introduction: [
    { required: true, message: '个人介绍不能为空', trigger: 'blur' },
    { min: 10, max: 500, message: '介绍长度应在10-500个字符之间', trigger: 'blur' }
  ]
})

// 不同方向的技能选项
const directionSkills = reactive({
  '前端开发': ['HTML/CSS', 'JavaScript', 'Vue', 'React', 'TypeScript', '小程序开发', '移动端开发', 'UI/UX设计'],
  '后端开发': ['Java', 'C++', 'Python', 'Node.js', 'Go', 'PHP', 'MySQL', 'MongoDB', 'Redis', '微服务', 'Docker'],
  '机器学习': ['Python', 'TensorFlow', 'PyTorch', '数据分析', '深度学习', '计算机视觉', '自然语言处理', '强化学习'],
  '嵌入式开发': ['C/C++', '单片机', 'Arduino', '树莓派', 'STM32', '电路设计', '信号处理', 'RTOS'],
  '产品设计': ['UI设计', 'Photoshop', 'Illustrator', '视频剪辑', '3D建模', '动画制作', '交互设计', '用户研究'],
  '策划运营': ['活动策划', '文案写作', '市场分析', '数据分析', '社群运营', '内容创作', '新媒体运营', '产品规划']
})

// 不同方向的额外问题
const directionQuestions = reactive({
  '前端开发': {
    experience: '请分享你的前端开发经历或者相关项目经验或者作品集链接(GitHub/Gitee/CSDN/博客等)',
    expectation: '你希望在前端方向学习哪些技术？'
  },
  '后端开发': {
    experience: '请分享你的后端开发经历或者相关项目经验或者作品集链接(GitHub/Gitee/CSDN/博客等)',
    expectation: '你对后端哪些技术栈感兴趣？'
  },
  '机器学习': {
    experience: '请分享你的机器学习相关经历或项目经验或者作品集链接(GitHub/Gitee/CSDN/博客等)',
    expectation: '你对机器学习哪个方向最感兴趣？'
  },
  '嵌入式开发': {
    experience: '请分享你的嵌入式开发经历或相关项目经验或者作品集链接(GitHub/Gitee/CSDN/博客等)',
    expectation: '你对嵌入式开发哪个领域最感兴趣？'
  },
  '产品设计': {
    experience: '请分享你的设计作品或相关经历',
    portfolio: '请提供你的作品集链接（如有）',
    expectation: '你希望在设计方面重点提升哪些能力？'
  },
  '策划运营': {
    experience: '请分享你的策划或运营经历',
    expectation: '你对哪个领域的运营最感兴趣？'
  }
})

// 获取当前方向的技能列表
const currentSkillOptions = computed(() => {
  return directionSkills[TclassName] || directionSkills['前端开发']
})

// 获取当前方向的问题描述
const currentQuestions = computed(() => {
  return directionQuestions[TclassName] || directionQuestions['前端开发']
})

// 表单完成度
const formCompletionPercentage = computed(() => {
  const requiredFields = ['id', 'name', 'sex', 'grade', 'major', 'phone', 'qq', 'email', 'introduction']
  // 确保技能也被计算在内
  if (formData.value.skills && formData.value.skills.length === 0) {
    return Math.floor((requiredFields.filter(field => formData.value[field] && formData.value[field].toString().trim() !== '').length / (requiredFields.length + 1)) * 100)
  }
  const completedFields = requiredFields.filter(field => formData.value[field] && formData.value[field].toString().trim() !== '')
  return Math.floor((completedFields.length / requiredFields.length) * 100)
})

// 监听表单完成度和数据变化
watch(formData.value, () => {
  checkFormCompletion()
}, { deep: true })

// 监听表单完成度
const checkFormCompletion = () => {
  isFormComplete.value = formCompletionPercentage.value === 100
}

// 方向介绍
const classIntro = ref([
  {
    id: 1,
    className: '前端开发',
    classIntroduce: '了解前端相关知识，想要开发网页、app、微信小程序或者对此有强烈的兴趣',
    icon: 'icon-xiangmu-new',
    color: '#5ec5df'
  },
  {
    id: 2,
    className: '后端开发',
    classIntroduce: '了解后端相关知识，想要开发网页、app、微信小程序或者对此有强烈的兴趣',
    icon: 'icon-modern',
    color: '#8f7eda'
  },
  {
    id: 3,
    className: '机器学习',
    classIntroduce: '了解或者对机器学习、计算机视觉感兴趣',
    icon: 'icon-consistency',
    color: '#f89860'
  },
  {
    id: 4,
    className: '嵌入式开发',
    classIntroduce: '对树莓派、常规单片机有一定的了解或者强烈学习欲望',
    icon: 'icon-responsive',
    color: '#5ab552'
  },
  {
    id: 5,
    className: '产品设计',
    classIntroduce: '有外观设计、logo设计、视频剪辑、动画制作、3D建模、宣传设计等相关基础',
    icon: 'icon-wenhua',
    color: '#e8556e'
  },
  {
    id: 6,
    className: '策划运营',
    classIntroduce: '对商业运营、产品模式、财务分析等有一定的了解，或者文字功底较强',
    icon: 'icon-award',
    color: '#f7d046'
  }
])

// 获取方向介绍
const getCurrentDirectionInfo = () => {
  const directionInfo = classIntro.value.find(item => item.className === TclassName)
  if (directionInfo) {
    TclassIntroduce = directionInfo.classIntroduce
    return directionInfo
  }
  return classIntro.value[0]
}

// 当前方向信息
const currentDirection = computed(() => getCurrentDirectionInfo())

// 提交表单
const onSubmit = async () => {
  if (isSubmitting.value) return

  try {
    await form.value.validate()
    isSubmitting.value = true

    // 确认提交
    await ElMessageBox.confirm(
      '确定要提交报名信息吗？请确保信息真实有效',
      '提交确认',
      {
        confirmButtonText: '确定提交',
        cancelButtonText: '再检查一下',
        type: 'info'
      }
    )

    try {
      const response = await submitRegistration(formData.value)

      ElMessage({
        message: '恭喜你！报名信息提交成功',
        type: 'success',
        duration: 5000
      })

      // 提交成功后跳转
      setTimeout(() => {
        router.push('/success')
      }, 2000)
    } catch (error) {
      console.error('API调用错误:', error)
      if (error.message) {
        ElMessage.error(error.message)
      } else {
        ElMessage.error('提交失败，请稍后再试')
      }
    }
  } catch (error) {
    if (error === 'cancel') return
    console.error('表单提交错误:', error)
    ElMessage.error('表单验证失败，请检查填写的信息')
  } finally {
    isSubmitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  form.value.resetFields()
}

// 返回上一页
const goBack = () => {
  router.push('/join')
}

onMounted(() => {
  // 动态修改页面主题色
  document.documentElement.style.setProperty('--primary-color', currentDirection.value.color)
  // 初始化检查表单完成度
  checkFormCompletion()
})
</script>

<template>
  <div class="registration-container" :style="{ '--theme-color': currentDirection.color }">
    <div class="page-header">
      <div class="back-button" @click="goBack">
        <i class="el-icon-arrow-left"></i> 返回
      </div>
      <h1 class="main-title">{{ TclassName }}方向报名</h1>
    </div>

    <div class="registration-content">
      <!-- 左侧信息 -->
      <div class="info-panel">
        <div class="direction-info">
          <div class="direction-icon">
            <img :src="getIconPath(TclassName)" :alt="TclassName" />
          </div>
          <h2 class="direction-title">{{ TclassName }}</h2>
          <div class="direction-desc">{{ TclassIntroduce }}</div>

          <div class="progress-container">
            <div class="progress-title">
              <span>报名表单完成度</span>
              <span class="percentage">{{ formCompletionPercentage }}%</span>
            </div>
            <el-progress :percentage="formCompletionPercentage"
              :color="formCompletionPercentage < 100 ? currentDirection.color : '#67c23a'" :stroke-width="10" />
          </div>

          <div class="tips">
            <h3>报名小贴士</h3>
            <ul>
              <li>填写真实有效的联系方式，方便我们联系你</li>
              <li>介绍你的优势和特长，增加录取机会</li>
              <li>提交前仔细检查信息是否有误</li>
              <li>技能和经验尽可能详细，帮助我们了解你</li>
            </ul>
          </div>

          <div class="decoration">
            <img src="/src/assets/fly.png" alt="装饰图" />
          </div>
        </div>
      </div>

      <!-- 右侧表单 -->
      <div class="form-panel">
        <el-form ref="form" :model="formData" :rules="rules" label-position="top" @input="checkFormCompletion"
          class="registration-form">
          <!-- 基本信息 -->
          <div class="form-section">
            <h3 class="section-title">基本信息</h3>

            <div class="form-row">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入真实姓名"></el-input>
              </el-form-item>

              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="formData.sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item label="年级" prop="grade">
                <el-select v-model="formData.grade" placeholder="请选择年级">
                  <el-option label="大一" value="大一"></el-option>
                  <el-option label="大二" value="大二"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="专业" prop="major">
                <el-input v-model="formData.major" placeholder="请输入所学专业"></el-input>
              </el-form-item>
            </div>

            <el-form-item label="学号" prop="id">
              <el-input v-model="formData.id" placeholder="请输入学号"></el-input>
            </el-form-item>
          </div>

          <!-- 联系方式 -->
          <div class="form-section">
            <h3 class="section-title">联系方式</h3>

            <div class="form-row">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>

              <el-form-item label="QQ号" prop="qq">
                <el-input v-model="formData.qq" placeholder="请输入QQ号"></el-input>
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="formData.email" placeholder="请输入电子邮箱"></el-input>
              </el-form-item>

              <el-form-item label="微信号" prop="wechat">
                <el-input v-model="formData.wechat" placeholder="选填"></el-input>
              </el-form-item>
            </div>
          </div>

          <!-- 专业技能 -->
          <div class="form-section">
            <h3 class="section-title">{{ TclassName }}相关信息</h3>

            <el-form-item label="相关技能" prop="skills">
              <el-checkbox-group v-model="formData.skills">
                <el-checkbox v-for="skill in currentSkillOptions" :key="skill" :label="skill">
                  {{ skill }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item :label="currentQuestions.experience" prop="experience">
              <el-input v-model="formData.experience" type="textarea" placeholder="请分享您的相关经历或项目经验（选填）"
                :rows="3"></el-input>
            </el-form-item>

            <el-form-item v-if="currentQuestions.portfolio" label="作品集链接" prop="portfolio">
              <el-input v-model="formData.portfolio" placeholder="请提供您的作品集链接，如GitHub、Gitee等（选填）"></el-input>
            </el-form-item>

            <el-form-item :label="currentQuestions.expectation" prop="expectation">
              <el-input v-model="formData.expectation" type="textarea" placeholder="请分享您的期望和目标（选填）"
                :rows="2"></el-input>
            </el-form-item>

            <el-form-item label="个人介绍" prop="introduction">
              <el-input v-model="formData.introduction" type="textarea" placeholder="请介绍一下你的性格与优势，以及为什么选择这个方向"
                resize="none" :rows="4" />
            </el-form-item>
          </div>

          <div class="form-actions">
            <el-button type="primary" @click="onSubmit" :loading="isSubmitting" :disabled="!isFormComplete">
              {{ isSubmitting ? '提交中...' : '提交报名' }}
            </el-button>
            <el-button @click="resetForm">重置表单</el-button>
            <el-button @click="goBack">返回</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.registration-container {
  --theme-color: #5ec5df;
  --theme-color-rgb: 94, 197, 223;
  color: #ffffff;
  background: linear-gradient(to bottom, #1a1a1a, #333333);
  min-height: 100vh;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;

  .page-header {
    position: relative;
    padding: 2rem 3rem;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    .back-button {
      position: absolute;
      left: 2rem;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.8);
      transition: all 0.3s;

      &:hover {
        color: var(--theme-color);
      }
    }

    .main-title {
      font-size: 2rem;
      font-weight: bold;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
      color: var(--theme-color);
      margin: 0;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }
  }
}

.registration-content {
  display: flex;
  max-width: 1200px;
  margin: 2rem auto;
  gap: 2rem;
  padding: 0 1rem;
  flex: 1;
  animation: fadeIn 0.5s ease-out;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.info-panel {
  flex: 0 0 300px;

  @media (max-width: 992px) {
    flex: auto;
  }
}

.direction-info {
  background: rgba(30, 30, 30, 0.8);
  border-radius: 10px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--theme-color);
  }
}

.direction-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }
}

.direction-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--theme-color);
}

.direction-desc {
  margin-bottom: 2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
}

.progress-container {
  margin: 2rem 0;

  .progress-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;

    .percentage {
      font-weight: bold;
      color: var(--theme-color);
    }
  }
}

.tips {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.2);

  h3 {
    margin-top: 0;
    font-size: 1.1rem;
    color: var(--theme-color);
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.2rem;
    margin: 0;

    li {
      margin-bottom: 0.6rem;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.4;
    }
  }
}

.decoration {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  opacity: 0.7;
  transform: rotate(5deg);
  transition: all 0.5s ease;

  &:hover {
    transform: rotate(0deg) scale(1.05);
    opacity: 0.9;
  }

  img {
    width: 100px;
  }

  @media (max-width: 992px) {
    display: none;
  }
}

.form-panel {
  flex: 1;
}

.registration-form {
  background: rgba(30, 30, 30, 0.8);
  border-radius: 10px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  :deep(.el-form-item__label) {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }

  :deep(.el-input__inner),
  :deep(.el-textarea__inner) {
    background-color: #232222;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:focus {
      border-color: var(--theme-color);
      box-shadow: 0 0 8px rgba(var(--theme-color-rgb), 0.4);
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  :deep(.el-input__wrapper),
  :deep(.el-textarea__wrapper) {
    background-color: #232222 !important;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;
    border-radius: 4px;

    &.is-focus {
      box-shadow: 0 0 0 1px var(--theme-color) inset !important;
    }
  }

  :deep(.el-input__inner::placeholder),
  :deep(.el-textarea__inner::placeholder) {
    color: rgba(255, 255, 255, 0.4);
  }

  :deep(.el-radio) {
    margin-right: 20px;
  }

  :deep(.el-radio__input .el-radio__inner) {
    background-color: #232222;
    border-color: rgba(255, 255, 255, 0.3);
  }

  :deep(.el-radio__label) {
    color: rgba(255, 255, 255, 0.9);
  }

  :deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }

  :deep(.el-checkbox__input .el-checkbox__inner) {
    background-color: #232222;
    border-color: rgba(255, 255, 255, 0.3);
  }

  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }

  :deep(.el-checkbox__label) {
    color: rgba(255, 255, 255, 0.9);
  }

  :deep(.el-select .el-input__inner) {
    background-color: #232222;
  }

  :deep(.el-select .el-input__wrapper) {
    background-color: #232222 !important;
  }

  :deep(.el-select-dropdown__item.hover) {
    background-color: rgba(var(--theme-color-rgb), 0.1);
  }

  :deep(.el-button--primary) {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background-color: var(--theme-color);
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }

  :deep(.el-button--primary:disabled) {
    background-color: rgba(var(--theme-color-rgb), 0.6);
    border-color: rgba(var(--theme-color-rgb), 0.6);
    color: rgba(255, 255, 255, 0.7);
  }

  :deep(.el-button--default) {
    background-color: #232222;
    border-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;

    &:hover {
      background-color: #333333;
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 1.2rem;
  color: var(--theme-color);
  margin-top: 0;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--theme-color);
    border-radius: 3px;
  }
}

.form-row {
  display: flex;
  gap: 1rem;

  &> :deep(.el-form-item) {
    flex: 1;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;

    :deep(.el-button) {
      width: 100%;
      margin-bottom: 0.8rem;
      margin-left: 0 !important;
    }
  }

  :deep(.el-button) {
    padding: 12px 30px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  :deep(.el-button--primary) {
    background-color: var(--theme-color);
    border-color: var(--theme-color);

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      opacity: 0.9;
      box-shadow: 0 5px 15px rgba(var(--theme-color-rgb), 0.3);
    }
  }
}

:deep(.el-progress-bar__inner) {
  background-color: var(--theme-color) !important;
  transition: width 0.6s ease;
}

:deep(.el-select-dropdown) {
  background-color: #232222;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.el-popper) {
  background-color: #232222 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.el-popper__arrow) {
  background-color: #232222 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.el-popper__arrow::before) {
  background-color: #232222 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.el-select-dropdown__item) {
  color: rgba(255, 255, 255, 0.9);

  &.selected {
    color: var(--theme-color);
    background-color: rgba(var(--theme-color-rgb), 0.1);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

:deep(.el-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

:deep(.el-checkbox) {
  margin-right: 1.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

/* 增加主题色RGB变量用于透明度设置 */
:root {
  --theme-color-rgb: 94, 197, 223;
  /* 默认颜色的RGB值 */
}

/* 响应式调整 */
@media (max-width: 768px) {
  .registration-form {
    padding: 1.5rem;
  }
}

/* 添加一些动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
