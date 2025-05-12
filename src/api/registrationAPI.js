import instance from '@/utils/request.js'

/**
 * 提交报名表单
 * 
 * @param {Object} formData 报名表单数据
 * @param {string} formData.id 学号
 * @param {string} formData.direction 报名方向
 * @param {string} formData.name 姓名
 * @param {string} formData.sex 性别
 * @param {string} formData.grade 年级
 * @param {string} formData.major 专业
 * @param {string} formData.phone 手机号
 * @param {string} formData.qq QQ号
 * @param {string} formData.email 邮箱
 * @param {string} formData.wechat 微信号(可选)
 * @param {string} formData.portfolio 作品集链接(可选)
 * @param {string} formData.experience 相关经验(可选)
 * @param {Array<string>} formData.skills 技能列表
 * @param {string} formData.expectation 期望(可选)
 * @param {string} formData.introduction 个人介绍
 * @returns {Promise} 接口请求Promise
 */
export const submitRegistration = (formData) => {
  return instance.post('/registration', formData)
}
