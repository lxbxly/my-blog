<template>
  <div class="article-detail">
    <el-button type="text" @click="viewAtricleDetail">{{ label }}</el-button>

    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="90%"
      top="8vh"
      :before-close="handleClose"
    >
      <template #header="{ titleId, titleClass }">
        <div v-if="state === 'view'" class="my-header">
          <h4>
            {{ editorTitle }}
            <h5>{{ editorAuthor }}</h5>
          </h4>
        </div>
        <div v-else class="my-header">
          <h4 :id="titleId" :class="titleClass">
            <el-input
              v-model="editorTitle"
              :disabled="state === 'view'"
              class="input-underline"
            ></el-input>
            <el-input
              v-model="editorAuthor"
              :disabled="state === 'view'"
              class="input-underline"
            ></el-input>
          </h4>
        </div>
      </template>
      <!-- 富文本 -->
      <RichTextEditor
        :content="editorContent"
        @updateContent="handleUpdateContent"
        :state="state"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">返回</el-button>
          <el-button
            v-if="state !== 'view'"
            type="primary"
            @click="submitContent"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import RichTextEditor from "./RichTextEditor.vue";
import {
  addArticles,
  getArticles,
  updataArticles,
} from "@/common/articleControl";

const props = defineProps(["label", "state", "articleId"]);
const updataArticleList = inject("updataArticleList"); // 注入父组件提供的事件

const dialogVisible = ref(false);

const editorContent = ref("");
const editorTitle = ref("");
const editorAuthor = ref("lxb");
const editorStatus = ref("published");

const handleUpdateContent = (content) => {
  editorContent.value = content;
};

const handleClose = () => {
  if (props.state === "view") {
    resetFormValue();
    dialogVisible.value = false;
  } else {
    ElMessageBox.confirm("未提交，你确定关闭编辑框嘛！")
      .then(() => {
        resetFormValue();
        dialogVisible.value = false;
      })
      .catch(() => {
        // catch error
      });
  }
};
// 提交内容到服务器
const submitContent = async () => {
  if (props.state === "add") {
    await addArticles({
      title: editorTitle.value,
      content: editorContent.value,
      author: editorAuthor.value,
      status: editorStatus.value,
    })
      .then((result) => {
        ElMessage({
          message: result.message,
          type: "success",
          plain: true,
        });
        updataArticleList();
        resetFormValue();
        dialogVisible.value = false;
      })
      .catch((error) => {
        console.error("上传失败", error);
      });
  } else if (props.state === "edit") {
    // TODO
    await updataArticles({
      id: props.articleId,
      title: editorTitle.value,
      content: editorContent.value,
      author: editorAuthor.value,
      status: editorStatus.value,
    })
      .then((result) => {
        ElMessage({
          message: result.message,
          type: "success",
          plain: true,
        });
        updataArticleList();
        resetFormValue();
        dialogVisible.value = false;
      })
      .catch((error) => {
        console.error("上传失败", error);
      });
  } else {
    updataArticleList();
    resetFormValue();
    dialogVisible.value = false;
  }
};
// 获取文档
const viewAtricleDetail = () => {
  dialogVisible.value = true;

  if (props.state !== "add") {
    getArticles(props.articleId).then((result) => {
      const { content, title, author } = result.data[0];

      editorContent.value = content;
      editorTitle.value = title;
      editorAuthor.value = author;
    });
  }
};

const resetFormValue = () => {
  editorContent.value = "";
  editorTitle.value = "";
  editorAuthor.value = "";
};
</script>

<style>
.article-detail {
  margin-right: 10px;
  width: 60px;
  display: inline;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
/* 通用的输入框样式 */
/* 去掉左、上、右边框，只保留下边框 */
.el-input__wrapper {
  border-left: none; /* 去掉左边框 */
  border-top: none; /* 去掉上边框 */
  border-right: none; /* 去掉右边框 */
  border-bottom: 2px solid #3498db; /* 设置下边框 */
  outline: none; /* 去掉聚焦时的默认高亮边框 */
  padding: 8px 0; /* 设置上下内边距 */
  width: 10vw; /* 输入框占满父容器宽度 */
  transition: border-color 0.3s ease; /* 添加过渡动画效果 */
}

/* 鼠标悬停时的效果 */
.el-input__wrapper:hover {
  border-bottom-color: #2980b9; /* 改变下边框颜色 */
}

/* 输入框聚焦时的效果 */
.el-input__wrapper:focus {
  border-bottom-color: #2ecc71; /* 聚焦时改变下边框颜色 */
}
</style>