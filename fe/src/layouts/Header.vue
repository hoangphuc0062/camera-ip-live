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
          <button type="submit" class="bg-blue-700 p-2 hover:bg-blue-800 rounded cursor-pointer">Login</button>
        </div>
      </form>
    </div>
    <!-- tao nhom -->
    <div>
      <div class="p-4">
        <!-- Button to open dialog -->
        <button @click="openDialog"
          class="flex items-center gap-x-2 bg-blue-700 p-2 px-4 text-white hover:bg-blue-800 rounded cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 fill-current">
            <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
          Create Group Camera
        </button>

        <!-- Dialog -->
        <div v-if="isDialogOpen"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black z-50">
          <div class="bg-white p-6 rounded-lg shadow-lg w-96 ">
            <h2 class="text-lg font-bold mb-4">Create Group Camera</h2>
            <form @submit.prevent="createGroup">
              <input type="text" placeholder="Enter group name" class="border border-black p-2 rounded w-full" />
              <!-- Close Button -->
              <button @click="closeDialog"
                class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                Close
              </button>
              <button type="submit"
                class="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
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




const isDialogOpen = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

const nameGroup = ref('')
const createGroup = () => {
  console.log('Tạo nhóm camera với tên:', nameGroup.value)
  if (!nameGroup.value.trim()) {
    alert('Tên nhóm không được để trống')
    return
  }
  // Sau khi tạo nhóm camera thành công:
  // Đóng dialog
  closeDialog()
}



</script>
