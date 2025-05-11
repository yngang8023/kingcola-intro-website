import footContentVue from '@/component/footCotent/footContent.vue';
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useRegisterAPI } from '/src/api/registrationAPI.js'
import footContent from '@/component/footCotent/footContent.vue'
const route = useRoute()
let TclassName = route.query.className
let TclassIntroduce = ''
const form = ref()
const formData = ref({
  id: '',
  direction: TclassName,
  name: '',
  sex: '',
  grade: '',
  major: '',
  phone: '',
  qq: '',
  introduction: ''
})
const rules = ref({
  id: [
    {
      required: true,
      message: '学号不能为空',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      message: '姓名不能为空',
      trigger: 'blur'
    }
  ],
  sex: [
    {
      required: true,
      message: '性别不能为空',
      trigger: 'blur'
    }
  ],
  grade: [
    {
      required: true,
      message: '年级不能为空',
      trigger: 'blur'
    }
  ],
  major: [
    {
      required: true,
      message: '专业不能为空',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '电话不能为空',
      trigger: 'blur'
    }
  ],
  qq: [
    {
      required: true,
      message: 'qq不能为空',
      trigger: 'blur'
    }
  ],
  introduction: [
    {
      required: true,
      message: '介绍不能为空',
      trigger: 'blur'
    }
  ]
})
const onSubmit = async () => {
  await form.value.validate()
  const res = await useRegisterAPI(formData.value)
  console.log(res.data)
  if (res.data.code === 200) {
    ElMessage({
      message: '报名信息提交成功',
      type: 'success'
    })
    formData.value = ref({})
  } else {
    ElMessage.error('服务异常，请稍后再试')
  }
}
const classIntro = ref([
  {
    id: 1,
    className: '前端开发',
    classIntroduce:
      '了解前端相关知识，想要开发网页、app、微信小程序或者对此有强烈的兴趣'
  },
  {
    id: 2,
    className: '后端开发',
    classIntroduce:
      '了解后端相关知识，想要开发网页、app、微信小程序或者对此有强烈的兴趣'
  },
  {
    id: 3,
    className: '机器学习',
    classIntroduce: '了解或者对机器学习、计算机视觉感兴趣'
  },
  {
    id: 4,
    className: '嵌入式开发',
    classIntroduce: '对树莓派、常规单片机有一定的了解或者强烈学习欲望'
  },
  {
    id: 5,
    className: '产品设计',
    classIntroduce:
      '有外观设计、logo设计、视频剪辑、动画制作、3D建模、宣传设计等相关基础'
  },
  {
    id: 6,
    className: '策划运营',
    classIntroduce:
      '对商业运营、产品模式、财务分析等有一定的了解，或者文字功底较强'
  }
])
switch (TclassName) {
  case '前端开发':
    TclassIntroduce = classIntro.value[0].classIntroduce
    break
  case '机器学习':
    TclassIntroduce = classIntro.value[2].classIntroduce
    break
  case '后端开发':
    TclassIntroduce = classIntro.value[1].classIntroduce
    break
  case '嵌入式开发':
    TclassIntroduce = classIntro.value[3].classIntroduce
    break
  case '产品设计':
    TclassIntroduce = classIntro.value[4].classIntroduce
    break
  case '策划运营':
    TclassIntroduce = classIntro.value[5].classIntroduce
    break
}
</script>

<template>
  <div class="re-box">
    <div class="box-left">
      <img :src="`/src/assets/${TclassName}.png`" alt="" />
      <div class="title">
        {{ TclassName }}
      </div>
      <div class="intro">报名要求：{{ TclassIntroduce }}</div>
    </div>

    <div class="box-right">
      <div class="zhan"></div>
      <el-form
        :model="formData"
        label-position="Left"
        label-width="100px"
        style="width: 550px"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="例：官方菌"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="formData.sex" class="ml-4">
            <el-radio label="男" size="large">男</el-radio>
            <el-radio label="女" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="formData.grade" placeholder="例：22级"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input
            v-model="formData.major"
            placeholder="例：信息安全"
          ></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="id">
          <el-input
            v-model="formData.id"
            placeholder="例：220503xxxx"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="例：1327882xxxx"
          ></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <el-input
            v-model="formData.qq"
            placeholder="例：24474xxxxx"
          ></el-input>
        </el-form-item>
        <el-form-item label="优势介绍" prop="introduction">
          <el-input
            v-model="formData.introduction"
            type="textarea"
            placeholder="介绍一下你的性格与优势~"
            resize="none"
            :rows="6"
          />
        </el-form-item>
        <div class="box-sma">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">报名</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="plain" @click="$router.push('/join')"
              >返回</el-button
            >
          </el-form-item>
        </div>
      </el-form>
      <div class="tip">
        <img src="/src/assets/fly.png" alt="" />
      </div>
    </div>
  </div>
  <footContent></footContent>
</template>

<style lang="scss" scoped>
.re-box {
  display: flex;
  width: 100%;
  height: 100vh;
  color: #ffffff;
  background: linear-gradient(to bottom, #232222, #434343);
}
.box-left {
  width: 30%;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  cursor: default;
  :deep(img) {
    width: 120px;
  }
  .title {
    margin: 10px 0;
    font-size: 20px;
  }
  .intro {
    font-size: 14px;
    padding: 20px 80px;
  }
}
.box-left:hover {
  opacity: 1;
}
.box-right {
  position: relative;
  margin: 10px;
  display: flex;
  align-items: center;
  width: 70%;
  height: 100vh;
}
.box-sma {
  display: flex;
  justify-content: space-around;
}
el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  el-button {
    height: 30px;
  }
}
.tip {
  position: absolute;
  right: 6vw;
  top: 5vh;
  img {
    width: 150px;
  }
}
</style>
