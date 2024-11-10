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
        <el-menu-item index="blogPage">
          <h3 class="cursive-text">主页</h3></el-menu-item
        >
        <el-menu-item index="workTimeTracker">
          <h3 class="cursive-text">工时</h3></el-menu-item
        >
        <el-menu-item index="tools"
          ><h3 class="cursive-text">工具</h3></el-menu-item
        >
        <el-menu-item index="articleList"
          ><h3 class="cursive-text">文章</h3></el-menu-item
        >
        <el-menu-item index="aboutMain"
          ><h3 class="cursive-text">关于我</h3></el-menu-item
        >
      </el-menu>
    </div>
  </el-header>
</template>

<script setup>
import { ref } from "vue";
import { useThemeStore } from "../stores/themeStore";
import router from "@/router";
import { inject } from "vue";

const tools = inject("tools"); // 注入全局工具
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
  aboutMain: () => {
    router.push("/aboutMain");
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
@import "../assets/css/navbar";
</style>