<template>
  <div>
    <el-form :model="form">
      <el-form-item label="图片预览" :label-width="100">
        <el-upload class="avatar-uploader" :show-file-list="false">
          <img v-if="form.url" :src="form.url" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片链接" :label-width="100">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图片格式" :label-width="100">
        <el-radio-group v-model="form.region">
          <el-radio value="jpg">.jpg</el-radio>
          <el-radio value="png">.png</el-radio>
          <el-radio value="base64">base64</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.region !== 'base64'"
        label="图片质量"
        :label-width="100"
      >
        <el-slider v-model="picQuality" :step="10" show-stops />
      </el-form-item>
      <el-form-item
        v-if="form.name !== 'base64'"
        label="图片名称"
        :label-width="100"
      >
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>

      <el-form-item label="图片操作" label-position="right" :label-width="100">
        <div v-if="form.region === 'base64'">
          <el-button color="#626aef" :dark="isDark" @click="translatePicture"
            >转换</el-button
          >
          <el-button
            v-if="form.region === 'base64'"
            color="#626aef"
            :dark="isDark"
            @click="copyPicUrl"
            >复制</el-button
          >
        </div>
        <el-button
          v-else
          color="#626aef"
          :dark="isDark"
          @click="translatePicture"
          >下载</el-button
        >
        <el-button color="#626aef" :dark="isDark" plain @click="resetForm"
          >清空</el-button
        >
      </el-form-item>

      <el-form-item
        v-if="form.region === 'base64'"
        label="base64"
        :label-width="100"
      >
        <el-input
          v-model="picConvertUrl"
          rows="8"
          disabled="true"
          type="textarea"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, inject, ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const defaultForm = {
  url: "",
  textarea: "",
  name: "defaultName",
  region: "jpg",
};

const tools = inject("tools");
const picConvertUrl = ref("");

const form = reactive({
  url: "",
  textarea: "",
  name: "defaultName",
  region: "jpg",
});
const picQuality = ref(100);

const translatePicture = async () => {
  try {
    const dataURL = await tools.convertAndDownloadImage(
      form.url,
      form.region,
      picQuality.value,
      form.name,
    );
    console.log(12312312);

    picConvertUrl.value = dataURL;
    ElMessage({
      message: "转换成功",
      type: "success",
    });
  } catch (error) {
    ElMessage("转换失败！");
  }
};

const copyPicUrl = () => {
  // 尝试使用 Clipboard API
  navigator.clipboard
    .writeText(picConvertUrl.value)
    .then(() => {
      console.log("Text copied to clipboard");
      ElMessage({
        message: "复制成功",
        type: "success",
      });
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
};

const resetForm = () => {
  Object.assign(form, defaultForm);
  picConvertUrl.value = "";
  picQuality.value = 100;
};
</script>

<style>
.avatar {
  width: 200px;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>