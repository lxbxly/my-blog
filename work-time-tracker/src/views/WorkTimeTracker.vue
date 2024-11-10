<template>
    <el-container>
      <el-header>
        <h1>工时记录</h1>
      </el-header>
      <el-main>
        <CalendarView />
      </el-main>
    </el-container>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import CalendarView from '../components/CalendarView.vue'; // 根据实际路径引入
  
  export default defineComponent({
    components: {
      CalendarView,
    },
  });
  </script>
  
  <style>
  /* 全局样式或组件样式可以在这里定义 */
  h1 {
    text-align: center;
    margin: 20px 0;
  }
  </style>
  