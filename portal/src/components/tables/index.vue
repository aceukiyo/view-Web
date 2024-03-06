<template>
  <div>
    <vxe-grid ref='xGrid' v-bind="gridOptions" v-on="gridEvent">
      <template #operate="{ row }">
        <vxe-button :content="lang.edit"></vxe-button>
        <vxe-button status="danger" :content="lang.delete"></vxe-button>
      </template>
      <template #header_input="{ column }">
        <vxe-input type="text" v-for="(option, index) in column.filters" :key="index" v-model="option.data"
          :placeholder="lang.filter" @change="confirmFilterEvent(option)" clearable></vxe-input>
      </template>
      <template #header_input_keydown="{ column }">
        <input type="text" v-for="(option, index) in column.filters" :key="index" v-model="option.data"
          @keydown.enter="confirmFilterEvent(option)" :placeholder="lang.enterFilter">
      </template>
      <template #header_select="{ column }">
        <vxe-select v-for="(option, index) in column.filters" :key="index" v-model="option.data" :options="props.options"
          @change="confirmFilterEvent(option)" placeholder="请选择" clearable transfer></vxe-select>
      </template>
      <template #toolbar_tools>
        <vxe-form :data="formData" @submit="searchEvent" @reset="resetEvent">
          <vxe-form-item field="name">
            <template #default>
              <vxe-input v-model="formData.name" type="text" placeholder="请输入名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button type="submit" status="primary" content="查询"></vxe-button>
              <vxe-button type="reset" content="重置"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-grid>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { VxeGridInstance, VxeGridListeners, VxeGridProps, VxeTableDefines } from 'vxe-table';
import { useI18n } from "../../hooks/useI18n";
const { t } = useI18n();
const lang = { edit: t("buttons.edit"), delete: t("buttons.delete"), filter: t("view_app.filterMes"), enterFilter: t("view_app.enterMes") }

interface tableType {
  id: string,
  border: boolean,
  stripe?: boolean,
  showHeaderOverflow: boolean,
  showOverflow: boolean,
  round: boolean,
  height: number,
  columns: Array<object>,
  rowConfig?: { keyField: string, isHover: boolean },
  columnConfig: { resizable: boolean, isCurrent: boolean, isHover: boolean },
  customConfig: { storage: boolean, checkMethod: any },
  printConfig: { columns: [], sheetName: string, mode: string, modes: string[] },
  sortConfig: any,
  filterConfig: any,
  pagerConfig: { enabled: boolean, pageSize?: number, total: number, pageSizes: number[] | undefined, currentPage: number, pagerCount: number },
  formConfig: {},
  toolbarConfig: { buttons?: Array<object> | undefined, refresh?: boolean | object, import?: boolean | object, export: boolean | object, print?: boolean | object, zoom?: boolean | object,custom?:boolean, tools?: any },
  proxyConfig: {
    form: boolean, ajax: {
      query: ({ page, sort, sorts, filters, form }: { page?: any, sort?: any, sorts?: any, filters?: any, form?: any }) => Promise<any>,
      delete?: ({ body, form }: { body?: any, form?: any }) => Promise<any>, save?: any
    }
  },
  importConfig: any,
  exportConfig: any,
  checkboxConfig: any,
  editRules: { [field: string]: VxeTableDefines.ValidatorRule[] },
  editConfig: any,
  options?: any
};
const formData = reactive({
  name: ''
})
const props = withDefaults(defineProps<tableType>(), {
  id: "full",
  border: true,
  showHeaderOverflow: true,
  showOverflow: true,
  round: false,
  height: 800,
  stripe: true,
  rowConfig: () => {
    return { keyField: "id", isHover: true, isCurrent: true }
  },
  columnConfig: () => {
    return { resizable: true, isCurrent: true, isHover: true }
  },
  customConfig: () => {
    return { storage: false, checkMethod: false }
  },
  sortConfig: () => {
    return { orders: ['asc', 'desc', 'null'], trigger: "cell" }
  },
  toolbarConfig: () => {
    return { buttons: undefined, refresh: true, import: false, export: false, print: true, zoom: true, custom: true }
  },
  pagerConfig: () => {
    return { enabled: true, pageSize: 10, total: 0, pageSizes: [10, 50, 100], currentPage: 1, pagerCount: 5 }
  }
})
interface RowVO {
  [key: string]: any
}
console.log("Tableprops", props);
const xGrid = ref<VxeGridInstance<RowVO>>();
const gridOptions = reactive<VxeGridProps<RowVO>>({
  id: props.id,
  border: props.border,
  stripe: props.stripe,
  showHeaderOverflow: props.showHeaderOverflow,
  showOverflow: props.showOverflow,
  round: props.round,
  height: props.height,
  rowConfig: props.rowConfig,
  columnConfig: {
    resizable: false,
    isCurrent: true,
    isHover: true
  },
  customConfig: props.customConfig,
  printConfig: {
    columns: props.printConfig.columns,
    sheetName: props.printConfig.sheetName,
    mode: props.printConfig.mode,
    modes: props.printConfig.modes
  },
  sortConfig: props.sortConfig,
  filterConfig: props.filterConfig,
  pagerConfig: props.pagerConfig,
  formConfig: props.formConfig,
  toolbarConfig: props.toolbarConfig,
  proxyConfig: {
    form: true,
    props: {},
    ajax: {
      query: props.proxyConfig.ajax.query,
      delete: props.proxyConfig.ajax.delete
    }
    //props.proxyConfig.ajax,
  },
  columns: props.columns,
  importConfig: props.importConfig,
  exportConfig: props.exportConfig,
  checkboxConfig: props.checkboxConfig,
  editRules: props.editRules,
  editConfig: props.editConfig,
  rowClassName: rowClass()
})

const emits = defineEmits(["changeValue", "checkValue", "checkStatus"]);
const gridEvent: VxeGridListeners<RowVO> = {
  proxyQuery() {
    console.log('数据代理查询事件')
  },
  proxyDelete() {
    console.log('数据代理删除事件')
  },
  proxySave() {
    console.log('数据代理保存事件')
  },
  currentChange({ newValue, oldValue, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) {
    emits("changeValue", newValue);
  },
  checkboxChange({ checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) {
    emits("checkValue", row, checked);
    // emits("checkStatus", checked);
  }
}
const confirmFilterEvent = (option: any) => {
  const $grid = xGrid.value;
  if ($grid) {
    // 设置为选中状态
    option.checked = true
    console.log("123", option, $grid)
    $grid.updateData()
  }
}

const searchEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.commitProxy('query')
  }
}

const resetEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.commitProxy('reload')
  }
}

function rowClass() {
  return 'row-yellow'
}
onMounted(() => {

});
</script>
<style scoped>
::v-deep .row-yellow {
  background-color: #edeb8952;
  z-index: 99;
}
</style>

