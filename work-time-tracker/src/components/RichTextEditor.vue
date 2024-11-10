<script setup>
import { ref, watch, defineEmits } from "vue";
import Editor from "@tinymce/tinymce-vue";

const props = defineProps(["state", "content"]);

const emit = defineEmits();

// 确保editor组件加载成功后赋值
setTimeout(() => {
  initValue.value = props.content;
}, 1000);

const initValue = ref(props.content);
const editorLoading = ref(props.state === "add" ? false : true);
const initCOnfig = ref({
  toolbar_mode: "sliding",
  language: "zh_CN", // 设置语言为简体中文
  height: 800,
  menubar: true,
  zIndex: 9999, // 设置 z-index 值
  plugins: [
    // Core editing features
    "anchor",
    "autolink",
    "charmap",
    "codesample",
    "emoticons",
    "image",
    "link",
    "lists",
    "media",
    "searchreplace",
    "table",
    "visualblocks",
    "wordcount",
    // Your account includes a free trial of TinyMCE premium features
    // Try the most popular premium features until Nov 24, 2024:
    "checklist",
    "mediaembed",
    "casechange",
    "export",
    "formatpainter",
    "pageembed",
    "a11ychecker",
    "tinymcespellchecker",
    "permanentpen",
    "powerpaste",
    "advtable",
    "advcode",
    "editimage",
    "advtemplate",
    "ai",
    "mentions",
    "tinycomments",
    "tableofcontents",
    "footnotes",
    "mergetags",
    "autocorrect",
    "typography",
    "inlinecss",
    //   'markdown',
    // Early access to document converters
    //   'importword',
    //   'exportword',
    //   'exportpdf',
  ],
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  tinycomments_mode: "embedded",
  tinycomments_author: "Author name",
  mergetags_list: [
    { value: "First.Name", title: "First Name" },
    { value: "Email", title: "Email" },
  ],
  ai_request: (request, respondWith) =>
    respondWith.string(() =>
      Promise.reject("See docs to implement AI Assistant")
    ),
  exportpdf_converter_options: {
    format: "Letter",
    margin_top: "1in",
    margin_right: "1in",
    margin_bottom: "1in",
    margin_left: "1in",
  },
  exportword_converter_options: { document: { size: "Letter" } },
  importword_converter_options: {
    formatting: {
      styles: "inline",
      resets: "inline",
      defaults: "inline",
    },
  },
});
// 监听 `initValue` 的变化
watch(initValue, (newContent) => {
  emit("updateContent", newContent);
  editorLoading.value = false;
});
</script>

<template>
  <main v-loading="editorLoading" id="sample">
    <Editor
      api-key="gx5uvia41xmy6owtx3svewsc3a4qyievrvhtpq9r7wqoo3bj"
      :init="initCOnfig"
      :disabled="state === 'view'"
      v-model="initValue"
    ></Editor>
  </main>
</template>


<style>
/* 覆盖 TinyMCE 弹出菜单的 z-index */
.tox-tinymce-aux,
.tox .tox-menu,
.tox .tox-selected-menu,
.tox-pop,
.tox-tooltip {
  z-index: 3000 !important;
}
</style>