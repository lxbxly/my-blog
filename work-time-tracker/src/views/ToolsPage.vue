<template>
  <div class="waterfall">
    <el-card
      v-for="(item, index) in items"
      :key="index"
      class="card"
      @click="handleCard(item)"
      :body-style="{ padding: '20px' }"
    >
      <div class="card-content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="800">
      <convert-image></convert-image>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
  
  <script setup>
import { ref, h, reactive } from "vue";
import { ElCard } from "element-plus";
import "element-plus/theme-chalk/el-card.css";
import { ElNotification } from "element-plus";
import ConvertImage from "../components/ConvertImage.vue";

const dialogFormVisible = ref(false);
const dialogTitle = ref('')

const items = ref([
  {
    id: "1",
    title: "图片转换",
    description: "用于转换图片格式",
    fn: () => {
      dialogFormVisible.value = true;
    },
  },
  {
    id: "2",
    title: "工具 2",
    description: "Description of 工具 2",
    fn: () => {},
  },
  {
    id: "3",
    title: "工具 3",
    description: "Description of 工具 3",
    fn: () => {},
  },
  {
    id: "4",
    title: "工具 4",
    description: "Description of 工具 4",
    fn: () => {},
  },
  {
    id: "5",
    title: "工具 5",
    description: "Description of 工具 5",
    fn: () => {},
  },
  // Add more items as needed
]);

const handleCard = (card) => {
  if (card.fn.toString().includes("=> {}")) {
    isBulid();
  } else {
    dialogTitle.value = card.title
    card.fn();
  }
};
const isBulid = () => {
  ElNotification({
    title: "靓仔，靓女，你好呀！",
    offset: 100,
    message: h("i", { style: "color: teal" }, "工具正在建设中，敬请期待！"),
  });
};
</script>
  
  <style scoped>
.waterfall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px;
  cursor: pointer;
}

.card {
  background: linear-gradient(
    45deg,
    rgba(176, 224, 230, 1),
    rgba(176, 224, 230, 0)
  );
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加平滑过渡效果 */
}

.card:hover {
  transform: translateY(-10px) rotate(-3deg); /* 鼠标悬浮时上移 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 鼠标悬浮时增加阴影 */
}

.card-content {
  text-align: center;
}
</style>
  