<template>

  <div class=" flex justify-between">
    <!-- dang nhap -->
    <div>
      <form @submit.prevent="handleLogin" class="flex gap-3">
        <div class="flex flex-col">
          <input v-model="username" type="text" placeholder="Enter username"
            class="border border-amber-50 p-2 rounded" />
          <span v-if="errors.username" class="text-red-500 text-sm mt-2">{{ errors.username }}</span>
        </div>

        <div class="flex flex-col">
          <input v-model="password" type="password" placeholder="Enter password"
            class="border p-2 border-amber-50 rounded" />
          <span v-if="errors.password" class="text-red-500 text-sm mt-2">{{ errors.password }}</span>
        </div>
        <div>
          <button type="submit" class="bg-blue-700 p-2 hover:bg-blue-800 rounded">Login</button>
        </div>
      </form>
    </div>
    <!-- tao nhom -->
    <div>
      <button class="flex items-center gap-x-2 bg-blue-700 p-2 px-4 text-white hover:bg-blue-800 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 fill-current">
          <path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
        Create Group Camera
      </button>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errors = ref({ username: '', password: '' })
const router = useRouter()

const handleLogin = () => {
  errors.value = { username: '', password: '' } // Reset lỗi

  if (!username.value.trim()) errors.value.username = 'username not empty'
  if (!password.value.trim()) errors.value.password = 'password not empty'

  if (!errors.value.username && !errors.value.password) {
    console.log('Đăng nhập với:', username.value, password.value)
    // Sau khi xử lý đăng nhập thành công:
    // router.push('/dashboard')
  }
}
</script>
