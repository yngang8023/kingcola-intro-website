import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'Kuser',
  () => {
    const token = ref('')
    const setToken = (newvaule) => {
      token.value = newvaule
    }

    return { token, setToken }
  },
  {
    persist: true
  }
)
