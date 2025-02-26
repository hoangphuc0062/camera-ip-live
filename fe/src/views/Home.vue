<template>
  <div>
    <div class="flex gap-2 m-4">
      <button v-for="s in sizes" :key="s" @click="setSize(s)" class="px-4 py-2 rounded text-white"
        :class="size === s ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'">
        {{ s }}x{{ s }}
      </button>
    </div>

    <div class="grid w-full" :class="gridClass" :style="{ gridTemplateColumns: `repeat(${size}, minmax(100px, 1fr))` }">
      <div v-for="(num, index) in totalCells" :key="index" class="border flex items-center justify-center w-full">
        {{ num }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Danh sách kích cỡ lưới có sẵn
const sizes = [1, 2, 3, 4, 5, 6, 7, 8];

// Kích thước mặc định
const size = ref(2);

// Tổng số ô trong lưới
const totalCells = computed(() => size.value * size.value);

// Xác định ô trung tâm (chính giữa lưới)
const centerIndex = computed(() => Math.floor(totalCells.value / 2));

// Hàm cập nhật kích thước
const setSize = (newSize) => {
  size.value = newSize;
};

// CSS động cho từng size
const gridClass = computed(() => {
  return {
    'grid-size-8': size.value === 8,
    'grid-size-7': size.value === 7,
    'grid-size-6': size.value === 6,
    'grid-size-5': size.value === 5,
    'grid-size-4': size.value === 4,
    'grid-size-3': size.value === 3,
    'grid-size-2': size.value === 2,
    'grid-size-1': size.value === 1
  };
});
</script>

<style>
/* CSS riêng cho từng size */
.grid-size-8 div {
  height: 120px;
}

.grid-size-7 div {
  height: 120px;
}

.grid-size-6 div {

  height: 133px;
}

.grid-size-5 div {
  height: 159px;
}

.grid-size-4 div {
  height: 199px;
}

.grid-size-3 div {
  height: 266px;
}

.grid-size-2 div {
  height: 399px;
}

.grid-size-1 div {
  height: 796px;
}
</style>
