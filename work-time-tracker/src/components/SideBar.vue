<template>
    <div class="sidebar">
      <h3>Popular Posts</h3>
      <ul>
        <li v-for="post in popularPosts" :key="post.id">{{ post.title }}</li>
      </ul>
      <h3>Categories</h3>
      <el-tag v-for="tag in categories" :key="tag">{{ tag }}</el-tag>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const popularPosts = ref([
    { id: 1, title: 'Understanding Vue 3 Composition API' },
    { id: 2, title: 'Top 10 JavaScript Frameworks in 2024' },
  ]);
  
  const categories = ref(['Vue.js', 'JavaScript', 'CSS', 'HTML']);
  </script>
  
  <style scoped>
  .sidebar {
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
  }
  </style>
  