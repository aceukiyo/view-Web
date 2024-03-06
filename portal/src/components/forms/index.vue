<template>
  <el-form
    ref="form"
    v-if="model"
    :validate-on-rule-change='false'
    :model='model'
    :rules='rules'
    v-bind="$attrs"
   >
    <template v-for="(item,index) in options" :key="index">
      <el-form-item
        v-if="!item.children || !item.children!.length"
        :prop="item.prop"
        :label="item.label"
       >
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-bind="item.attrs"
          :is="formType(item.type)"
          :placeholder="item.placeholder"
          v-model="model[item.prop!]"
          >
        </component>
        <!-- <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
         >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload> -->
        <div class="full-screen-container" >
          <div id="toolbar" v-if="item.type === 'editor'" style="z-index: 101;"></div>
          <div id="editor" v-if="item.type === 'editor'" style="height: 200px; z-index: 100;"></div>
        </div>
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :prop="item.prop"
        :label="item.label"
       >
        <component
          v-bind="item.attrs"
          :is="formType(item.type)"
          :multiple="item.multiple"
          :placeholder="item.placeholder"
          v-model="model[item.prop!]"
         >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="formType(child.type)"
            :label='child.label'
            :value='child.value'
          >
          </component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form='form' :model='model'></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted, watch, nextTick } from 'vue'
import { FormOptions, FormInstance } from './types/index';
import cloneDeep from 'lodash/cloneDeep';
import {ElInput,ElInputNumber,ElSelect,ElOption,ElTimeSelect,ElCascader,ElCheckbox
,ElCheckboxGroup,ElCheckboxButton,ElColorPicker,ElDatePicker,ElTimePicker,ElRadio,ElRadioGroup
,ElRadioButton,ElRate,ElSlider,ElSwitch,ElTransfer}  from "element-plus";

let props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function
  }
});
console.log("formProps",props.options);
let emits = defineEmits([
  'on-preview', 'on-remove', 'on-success', 'on-error', 
  'on-progress', 'on_change', 'before-upload', 'before-remove','on-exceed'
]);

let model = ref<any>(null);
let rules = ref<any>(null);
let edit = ref();
let form = ref<FormInstance | null>();
let initForm = () => {
  if(props.options && props.options.length){
    let m: any = {}
    let r: any = {}
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
      // 初始化富文本编辑器
      if(item.type === 'editor'){
        nextTick(()=> {
          // if(document.getElementById('editor') && document.getElementById('toolbar')){
          //   const editorConfig: Partial<IEditorConfig> = {}
          //   editorConfig.placeholder = item.placeholder!
          //   editorConfig.onChange = (editor: IDomEditor) => {
          //     // 当编辑器选区、内容变化时，即触发
          //     // console.log('content', editor.children)
          //     // console.log('html', editor.getHtml())
          //     // console.log('text', editor.getText());
              
          //     model.value[item.prop!] = editor.getHtml()
          //   }

          //   // 创建编辑器
          //   const editor = createEditor({
          //     selector: '#editor',
          //     config: editorConfig,
          //     mode: 'default' // 或 'simple' 参考下文
          //   })
          //   // 创建工具栏
          //   const toolbar = createToolbar({
          //     editor,
          //     selector: '#toolbar',
          //     mode: 'default' // 或 'simple' 参考下文
          //   })
          //   edit.value = editor
          // }
        })
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}
onMounted(() => {
  initForm()
})
const formType:any=(type:string)=>{
 switch(type){
 case "input":
  return ElInput;
  case "input-number":
  return ElInputNumber;
  case "select":
    return ElSelect;
  case "option":
    return ElOption;
    case "time-select":
      return ElTimeSelect;
     case "cascader":
      return ElCascader;
      case "checkbox":
      return ElCheckbox;
      case "checkbox-group":
      return ElCheckboxGroup;
      case "checkbox-button":
      return ElCheckboxButton;
      case "color-picker":
      return ElColorPicker;
      case "date-picker":
      return ElDatePicker;
      case "time-picker":
      return ElTimePicker;
      case "radio":
      return ElRadio;
      case "radio-group":
      return  ElRadioGroup;
      case "radio-button":
      return  ElRadioButton;
      case "rate":
      return  ElRate;
      case "slider":
      return ElSlider;
      case "switch":
      return ElSwitch;
      case "transfer":
      return ElTransfer;
 }
};
let resetFields = () => {
  form.value!.resetFields()
  if(props.options && props.options.length){
    edit.value.clear()
  }
};

// 表单验证
let validate = () => {
  return form.value!.validate
}

// 获取表单数据
let getFormData = () => {
  return model.value
}
defineExpose({
  resetFields,
  validate,
  getFormData
})

// 监听父组件传递过来的options
watch(() => props.options, () => {
  initForm()
},{ deep: true })


let onPreview = (file: File) => {
  emits('on-preview', file)
};

let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
};

let onSuccess = (response: any, file: File, fileList: FileList) => {
  let uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList})
}

let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList })
}

let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}

let beforeUpload = (file: File) => {
  emits('before-upload', file)
}

let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList})
}

let onExceed = (file: File, fileList: FileList) => {
  emits('on-exceed', { file, fileList })
}
</script>
<style lang="" scoped>

</style>