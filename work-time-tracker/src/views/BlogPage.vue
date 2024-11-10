<template>
  <div class="blog-page">
    <HeroSection />
    <div class="content">
      <div class="main">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :articleId="article.id"
          :title="article.title"
          :author="article.author"
          :content="article.content"
          :date="article.created_at"
          :category="article.status"
        />
      </div>
      <SideBar />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import HeroSection from "../components/HeroSection.vue";
import ArticleCard from "../components/ArticleCard.vue";
import SideBar from "../components/SideBar.vue";

import { getArticles } from "@/common/articleControl";
const articles = ref([]);

onMounted(() => {
  getArticles().then((result) => {
    articles.value = result.data.splice(0, 2);
  });
});
</script>

<style>
.blog-page {
  height: calc(100% - 500px);
}
/* 使内容部分可以动态扩展 */
.content {
  display: flex;
  flex: 1; /* 占据剩余空间 */
  gap: 20px;
  padding: 20px;
  height: 100%;
}

/* 主体和侧边栏布局 */
.main {
  flex: 3;
  overflow-y: auto;
}

.sidebar {
  flex: 1;
}
</style>