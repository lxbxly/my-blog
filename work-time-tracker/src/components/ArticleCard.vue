<template>
  <div class="atricle-card-out">
    <el-card
      v-if="addArticle"
      class="article-card add-article"
      @click="handlerAddArticle"
      shadow="hover"
    >
      <ArticleDetail
        ref="articleDetail"
        label="添加文章"
        state="add"
      ></ArticleDetail>
    </el-card>
    <!-- 添加 transition 动画效果 -->
    <div v-else>
      <transition name="fade">
        <el-card v-if="showCard" class="article-card" shadow="hover">
          <!-- 右上角关闭按钮 -->
          <button v-if="!isBlogPage" class="close-btn" @click="closeCard">
            ×
          </button>

          <h3>{{ title }}</h3>
          <div class="author">
            <h5>作者：{{ author }}</h5>
          </div>
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
      </transition>
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ArticleDetail from "./ArticleDetail.vue";
import { deleteArticles } from "@/common/articleControl";

const tools = inject("tools");
const updataArticleList = inject("updataArticleList");
const isBlogPage = tools.getUrlPathName() === "blogPage";
const showCard = ref(true);

// 创建 ref 引用子组件实例
const articleDetail = ref(null);

const proos = defineProps([
  "title",
  "content",
  "date",
  "author",
  "category",
  "articleId",
  "addArticle",
]);

// 点击关闭按钮时调用
const closeCard = () => {
  ElMessageBox.confirm("你确定删除文章嘛？")
    .then(() => {
      handlerDeleteArticles();
    })
    .catch(() => {
      // catch error
    });
};

const handlerDeleteArticles = () => {
  deleteArticles(proos.articleId).then((result) => {
    if (result.status === "200") {
      ElMessage({
        message: result.message,
        type: "success",
        plain: true,
      });
      // 触发淡出效果
      showCard.value = false;
      setTimeout(() => {
        updataArticleList();
      }, 500); // 动画时长与CSS中保持一致
    } else {
      ElMessage({
        message: result.message,
        type: "error",
        plain: true,
      });
    }
  });
};
const handlerAddArticle = () => {
  if (articleDetail.value) {
    articleDetail.value.viewAtricleDetail();
  }
};
</script>
<style>
.article-card {
  margin-bottom: 20px;
  position: relative; /* 为了定位关闭按钮 */
}

.add-article {
  position: sticky;
  top: 20px;
  z-index: 1000;
  cursor: pointer;
}

/* 关闭按钮样式 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #ff4d4f; /* 悬停时变红 */
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.author {
  margin: 5px 0;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.el-divider {
  margin: 5px 0 15px 0 !important;
}

.article-card .el-card__body {
  background: linear-gradient(
    -90deg,
    rgb(192, 227, 231),
    rgba(44, 179, 197, 0)
  ) !important;
}
</style>