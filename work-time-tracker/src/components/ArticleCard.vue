<template>
  <div>
    <el-card v-if="addArticle" class="article-card add-article" shadow="hover">
      <ArticleDetail label="添加文章" state="add"></ArticleDetail>
    </el-card>
    <el-card v-else class="article-card" shadow="hover">
      <h3>{{ title }}</h3>
      <h5>作者：{{ author }}</h5>
      <div class="meta">
        <span>{{ tools.formatDate(date, "YYYY/MM/DD") }}</span>
        <el-tag>{{ category }}</el-tag>
      </div>
      <ArticleDetail
        label="查看文章详情"
        state="view"
        :title="title"
        :articleId="articleId"
      ></ArticleDetail>
      <ArticleDetail
        v-if="!isBlogPage"
        label="编辑文档"
        state="edit"
        :title="title"
        :articleId="articleId"
      ></ArticleDetail>
      <el-divider />
      <div class="content-html">
        <p v-html="content"></p>
      </div>
    </el-card>
  </div>
</template>
  
  <script setup>
import { inject } from "vue";
import ArticleDetail from "./ArticleDetail.vue";

const tools = inject("tools");
const isBlogPage = tools.getUrlPathName() === "blogPage";
defineProps([
  "title",
  "content",
  "date",
  "author",
  "category",
  "articleId",
  "addArticle",
]);
</script>
  
  <style>
.article-card {
  margin-bottom: 20px;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.el-divider {
  margin: 15px 0;
}
.article-card .el-card__body {
  background: linear-gradient(
    -90deg,
    rgb(192, 227, 231),
    rgba(44, 179, 197, 0)
  ) !important;
}
/* .content-html {
  max-height: 725px;
  overflow-y: auto;
} */
</style>
  