import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated: state => !!state.token
  },
  actions: {
    async login(credentials) {
      try {
        const { data } = await axios.post('/api/login', credentials)
        this.token = data.token
        this.user = data.user
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      } catch (error) {
        throw new Error('Đăng nhập thất bại')
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})
