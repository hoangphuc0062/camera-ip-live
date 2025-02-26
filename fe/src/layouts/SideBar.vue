<template>
  <div class="h-full flex flex-col justify-between">
    <div>
      <div class="h-full flex flex-col gap-2 p-4 border-r border-gray-200">
        <div class="w-full flex justify-center">
          <form @submit.prevent="handleSearch" class="flex items-center max-w-md w-full">
            <!-- Input -->
            <input type="text" id="search-input" v-model="searchQuery"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
              placeholder="Search..." />
            <!-- Button -->
            <button type="submit"
              class="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg hover:bg-blue-800 flex items-center gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 fill-current">
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              Search
            </button>
          </form>
        </div>

        <!-- Profile Dropdown -->
        <div v-for="(user, index) in users" :key="index" class="relative">
          <!-- Button để mở dropdown -->
          <button @click="toggleDropdown(index)" class="flex items-center space-x-2 p-2 border rounded-lg w-full">
            {{ user.ip }}
          </button>

          <!-- Dropdown Menu -->
          <div v-if="activeDropdown === index"
            class="absolute right-0 mt-2 w-full bg-white text-black rounded-md shadow-lg z-50 border">
            <div class="p-4 border-b">
              <p class="text-sm font-semibold">{{ user.name }}</p>
              <p class="text-xs">{{ user.username }}</p>
            </div>
            <ul class="py-1">
              <li class="px-4 py-2 text-sm hover:bg-gray-100 hover:text-black cursor-pointer">
                Cài đặt
              </li>
              <li @click="logout(index)" class="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer">
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class=" border-t broder-gray-200 flex items-center justify-center h-[300px]">
        <div
          class="relative w-40 h-40 rounded-full bg-gradient-to-b from-gray-800 to-black shadow-lg flex items-center justify-center p-4">
          <!-- Nút Up -->
          <button @click="move('up')"
            class="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full opacity-60 hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
              class="w-6 h-6 text-white cursor-pointer">
              <path
                d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          </button>
          <!-- Nút Left -->
          <button @click="move('left')"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full opacity-60 hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"
              class="w-6 h-6 text-white cursor-pointer">
              <path
                d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z" />
            </svg>
          </button>
          <!-- Nút Right -->
          <button @click="move('right')"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full opacity-60 hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor"
              class="w-6 h-6 text-white cursor-pointer">
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
          <!-- Nút Down -->
          <button @click="move('down')"
            class="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"
              class="w-6 h-6 text-white">
              <path
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </button>
          <!-- Nút Center (Camera) -->
          <button disabled
            class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-700 rounded-full shadow-inner flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
              class="w-6 h-6 text-white">
              <path
                d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
            </svg>

          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const activeDropdown = ref(null);

// Danh sách IP/User giả định
const users = ref([
  { ip: "192.168.1.1", name: "Nguyễn Văn A", username: "a@example.com" },
  { ip: "192.168.1.2", name: "Trần Thị B", username: "b@example.com" },
  { ip: "192.168.1.3", name: "Lê Văn C", username: "c@example.com" },
]);

// Mở dropdown đúng theo index
const toggleDropdown = (index) => {
  activeDropdown.value = activeDropdown.value === index ? null : index;
};

// Đóng dropdown khi bấm ra ngoài
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Xử lý đăng xuất
const logout = (index) => {
  console.log(`Đăng xuất: ${users.value[index].name}`);
  activeDropdown.value = null;
};
const searchQuery = ref("");
const handleSearch = () => {
  console.log("Tìm kiếm:", searchQuery.value);
};

// Hàm điều khiển camera
const move = (direction) => {
  console.log(`Camera moved: ${direction}`);
};
</script>
