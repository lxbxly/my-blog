<template>
  <div class="article">
    <!-- 文章列表 -->
    <div class="article-list">
      <ArticleCard
        addArticle="addArticle"
        @updataArticleList="handlerUpdataArticle"
      />
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :articleId="article.id"
        :title="article.title"
        :content="article.content"
        :author="article.author"
        :date="article.created_at"
        :category="article.status"
        @updataArticleList="handlerUpdataArticle"
      />
    </div>
    <el-backtop target=".article-list" :bottom="135">
      <div class="floating-box">UP</div>
    </el-backtop>
  </div>
</template>
  
<script setup>
import { onMounted, ref, provide } from "vue";
import ArticleCard from "../components/ArticleCard.vue";

import { getArticles } from "@/common/articleControl";

const articles = ref([]);

const handlerUpdataArticle = () => {
  getArticles().then((result) => {
    articles.value = result.data;
  });
};

onMounted(() => {
  handlerUpdataArticle();
});

provide("updataArticleList", handlerUpdataArticle);
</script>
  
  <style scoped>
/* 文章列表样式 */
.article {
  padding: 20px;
  width: 100%;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.article-list {
  width: 70%;
  padding: 0 10px;
  overflow-y: auto;
}

/* 每一项文章的标题 */
.article-item {
  margin-bottom: 20px;
}

.article-title {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #4b6766;
}

.article-title:hover {
  text-decoration: underline;
}

/* 文章内容样式 */
.article-content {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 浮动盒子样式 */
.floating-box {
  width: 200px;
  height: 70px;
  background: linear-gradient(145deg, #6be6ff, #bcd7ff);
  border-radius: 50% 50% 0 0;
  color: #b8aaa0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  animation: floatUp 2s ease-in-out infinite;
}

/* 浮动动画 */
@keyframes floatUp {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* 向上移动 */
  }
  100% {
    transform: translateY(0);
  }
}
</style>
  