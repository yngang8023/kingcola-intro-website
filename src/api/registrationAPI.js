import instance from '@/utils/request.js'

export const useRegisterAPI = ({
  id,
  direction,
  name,
  sex,
  grade,
  major,
  phone,
  qq,
  introduction
}) =>
  instance.post('/registration', {
    id,
    direction,
    name,
    sex,
    grade,
    major,
    phone,
    qq,
    introduction
  })
