<template>
  <el-header height="60px">
    <div class="navbar">
      <div class="logo">
        <!-- 我的 博客 -->
        <div class="baby-carp"><span class="art-text">Baby Carp</span></div>
      </div>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        class="menu"
        @select="handleSelect"
      >
        <el-menu-item index="blogPage"> <h3 class="cursive-text">主页</h3></el-menu-item>
        <el-menu-item index="workTimeTracker"> <h3 class="cursive-text">工时 </h3></el-menu-item>
        <el-menu-item index="tools"><h3 class="cursive-text">工具</h3></el-menu-item>
        <el-menu-item index="articleList"><h3 class="cursive-text">记录</h3></el-menu-item>
        <el-sub-menu index="5">
          <template #title><h3 class="cursive-text">关于我</h3></template>
          <el-menu-item index="5-1">item one</el-menu-item>
          <el-sub-menu index="5-2">
            <template #title>切换主题</template>
            <el-menu-item index="light">白色</el-menu-item>
            <el-menu-item index="dark">黑色</el-menu-item>
            <el-menu-item index="fancy">自定义</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="5-3">item three</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </el-header>
</template>

<script setup>
import { ref } from "vue";
import { useThemeStore } from "../stores/themeStore";
import router from "@/router";
import { inject } from 'vue';


const tools = inject('tools');  // 注入全局工具
const activeIndex = ref(tools.getUrlPathName());
const themeStore = useThemeStore();

const handleSelect = (key, keyPath) => {
  menuChange(key);
};

const routerMapChange = {
    blogPage: () => {
    router.push("/blogPage");
  },
  workTimeTracker: () => {
    router.push("/workTimeTracker");
  },
  tools: () => {
    router.push("/tools");
  },
  articleList: () => {
    router.push("/articleList");
  },
  default: (key) => {
    themeStore.setTheme(key);
  },
};

function menuChange(key) {
  // 如果 key 存在于 routerMapChange 且为函数，则调用；否则调用 default
  if (typeof routerMapChange[key] === "function") {
    routerMapChange[key]();
  } else {
    routerMapChange["default"](key);
  }
}
</script>

<style scoped>
@import '../assets/css/navbar'
</style>