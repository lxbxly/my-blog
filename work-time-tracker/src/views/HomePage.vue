<template>
  <div class="app-container">
    <NavBar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>
  
  <script setup>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
</script>
  
  <style scoped>
/* 外部容器使用 Flex 布局 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 最小高度为视口高度 */
  height: 100vh;
}

/* Footer 设置 */
footer {
  margin-top: auto; /* 将 Footer 推到页面底部 */
}

/* 路由切换时的动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
  