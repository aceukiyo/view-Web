<template>
  <div>
    <baseForm ref="form" label-width="100px" :options='options' @on-change="handleChange"
      @before-upload="handleBeforeUpload" @on-preview="handlePreview" @on-remove="handleRemove"
      @before-remove="beforeRemove" @on-success="handleSuccess" @on-exceed="handleExceed">
      <template #uploadArea>
        <el-button type="primary" size="small">点击上传</el-button>
      </template>
      <template #uploadTip>
        <div style="color:#ccc;font-size:12px;">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">{{ t("submit") }}</el-button>
        <el-button @click='resetForm'>{{ t("reset") }}</el-button>
      </template>
    </baseForm>
  </div>
</template>

<script lang="ts" setup>
import { FormOptions, FormInstance } from '../../../components/forms/types/index'
import baseForm from "../../../components/forms/index.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from "../../../hooks/useI18n";
//api
import { saveUser } from "../../../api/apiPoint";
let form = ref();
const { t } = useI18n();
const { push, go } = useRouter();

interface Scope {
  form: FormInstance,
  model: any,
}

let options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: t("userName"),
    prop: 'username',
    rules: [
      {
        required: true,
        message: t("12343454"),
        trigger: 'blur'
      },
      {
        message: t(""),
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true,
    }
  },
  {
    type: 'input',
    value: '',
    label: t("password"),
    prop: 'password',
    rules: [
      {
        required: true,
        message: t("12343454"),
        trigger: 'blur'
      },
      {
        message: t(""),
        trigger: 'blur'
      }
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    }
  },
  {
    type: 'input',
    value: '',
    label: t('email'),
    prop: 'email',
    rules: [
      {
        required: true,
        message: '邮箱不能为空',
        trigger: 'blur'
      },
      {
        pattern: "",
        message: '邮箱不符合',
        trigger: 'blur'
      }
    ],
  },
  {
    type: 'select',
    value: '',
    multiple: true,
    placeholder: '请选择角色',
    prop: 'roleIds',
    label: t('role'),
    attrs: {
      style: {
        width: '100%',
      },
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'blur'
      }
    ],
    children: [
      {
        type: 'option',
        label: t('admin'),
        value: 'admin'
      },
      {
        type: 'option',
        label: t('user'),
        value: 'user'
      },
    ]
  },
  {
    type: 'input',
    value: '',
    label: t('shortName'),
    prop: 'shortName',
  },
  {
    type: 'input',
    value: '',
    label: t('name'),
    prop: 'name',
  },
  {
    type: 'input',
    value: '',
    label: t('englishName'),
    prop: 'englishName',
  },

  // {
  //   type: 'checkbox-group',
  //   value: [],
  //   prop: 'like',
  //   label: '哈哈哈',
  //   rules: [
  //     {
  //       required: true,
  //       message: '哈哈哈哈不能为空',
  //       trigger: 'blur'
  //     }
  //   ],
  //   children: [
  //     {
  //       type: 'checkbox',
  //       label: '测试五',
  //       value: '1'
  //     },
  //     {
  //       type: 'checkbox',
  //       label: '一样',
  //       value: '2'
  //     },
  //     {
  //       type: 'checkbox',
  //       label: '两样',
  //       value: '3'
  //     }
  //   ]
  // },
  //  {
  //   type: 'radio-group',
  //   value: '',
  //   prop: 'gender',
  //   label: '测试六',
  //   rules: [
  //     {
  //       required: true,
  //       message: '不能为空',
  //       trigger: 'blur'
  //     }
  //   ],
  //   children: [
  //     {
  //       type: 'radio',
  //       label: 'radio1',
  //       value: '1'
  //     },
  //     {
  //       type: 'radio',
  //       label: 'radio2',
  //       value: '2'
  //     },
  //     {
  //       type: 'radio',
  //       label: '保密',
  //       value: '3'
  //     }
  //   ]
  // },
]

let submitForm = (scope: any) => {
  scope.form.validate(async (valid: any) => {
    if (valid) {
      var reponese = await saveUser(scope.model);
      if (reponese.data) {
        ElMessage.success('提交成功');
        go(0);
        resetForm();
      } else {
        ElMessage.error('表单填写错误');
      }
    }
  });
}

let resetForm = () => {
  console.log('重置');
  form.value.resetFields()
}

let handleRemove = (file: any, fileList: any) => {
  console.log('handleRemove')
  console.log(file, fileList)
}

let handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}

let beforeRemove = (val: any) => {
  console.log('beforeRemove')
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}

let handleExceed = (val: any) => {
  console.log('handleExceed', val)
  ElMessage.warning(
    `The limit is 3, you selected ${val.files.length
    } files this time, add up to ${val.files.length + val.fileList.length} totally`
  )
}

let handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}

let handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}

let handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
  console.log(val)
}

</script>

<style lang="less" scoped></style>