<template>
  <div style="border: 1px solid #ccc; maxwidth: 600px">
    <!-- Toolbar -->
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="'default'"
    />
    <Editor
      style="height: 450px; overflow-y: hidden"
      v-model="props.textHtml"
      :defaultConfig="editorConfig"
      :mode="'default'"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; //css
import { onBeforeUnmount, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import type { IEditorConfig, IToolbarConfig } from "@wangeditor/core";
const emits = defineEmits(["getHtmlVal"]);
const props = defineProps({
  textHtml: {
    type: String,
    default: "",
  },
});
const editorRef = shallowRef();
// toolbar configuration
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [
    "insertVideo", //  remove the insert video function
    "fullScreen", // remove the full screen function
  ],
};
// Editor configuration
const editorConfig: Partial<IEditorConfig> = {
  // the page does not automatically focus
  autoFocus: true,
  MENU_CONF: {},
};

if(editorConfig.MENU_CONF){
  enum type {
    image=1,
    video=2
  };
  editorConfig.MENU_CONF["uploadImage"] = {
  async customUpload(file: any, insertFn: any) {
    upLoadFile(type.image, file, insertFn);
  },
};
editorConfig.MENU_CONF["uploadVideo"] = {
  async customUpload(file: any, insertFn: any) {
    upLoadFile(type.video, file, insertFn);
  },
};
editorConfig.MENU_CONF['uploadImage'] = {
    base64LimitSize: 5 * 1024 // 5kb
}
}
const upLoadFile = (type: number, file: any, insertFn: any) => {
};

// when the commponentis destroyed,the editor is also destroyed
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
const handleCreated = (editor: any) => {
  editorRef.value = editor;
  console.log(editor.getAllMenuKeys());
};
// get the inout content
const handleChange = (editor: any) => {
  emits("getHtmlVal", editor.getHtml());
};
</script>
<style lang="scss" scoped>
:deep() .w-e-textarea-video-container {
  video,
  img {
    max-width: 787px;
  }
}
</style>

