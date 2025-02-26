<template>
  <div class="bg-gray-800 text-white">
    <div class="border-b border-gray-200 p-5">
      <Header></Header>
    </div>
    <main class="flex w-full">
      <div class="min-w-2/12">
        <SideBar></SideBar>
      </div>
      <div class="min-w-10/12 container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import { RouterView } from 'vue-router';
import SideBar from './SideBar.vue';
</script>
