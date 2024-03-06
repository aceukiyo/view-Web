<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label=lang.all name="all">
        <BaseTable :id=data.id :border=data.border :showHeaderOverflow=data.showHeaderOverflow
          :showOverflow=data.showOverflow :height=data.height :columns=data.columns :columnConfig=data.columnConfig
          :customConfig=data.customConfig :printConfig=data.printConfig :sortConfig=data.sortConfig
          :filterConfig=data.filterConfig :formConfig=data.formConfig :toolbarConfig=data.toolbarConfig
          :proxyConfig=data.proxyConfig :importConfig=data.importConfig :export-config=data.exportConfig
          :checkbox-config=data.checkboxConfig :pager-config=data.pagerConfig :editRules={} :edit-config={}
          @changeValue="currentChange" :options="optionList">
        </BaseTable>
      </el-tab-pane>
      <el-tab-pane :label=lang.storageLocation name="storageLocation"></el-tab-pane>
    </el-tabs>
    <el-tabs type="border-card" v-model="activeSecondName" @tab-click="handleSecondClick">
      <el-tab-pane :label=lang.detail name="detail">
        <BaseForm ref="form" label-width="280px" inline=true :options='options' @on-change="" @before-upload=""
          @on-preview="" @on-remove="" @before-remove="" @on-success="" @on-exceed=""></BaseForm>
      </el-tab-pane>
      <el-tab-pane :label=lang.lock name="lock"></el-tab-pane>
    </el-tabs>
  </div>
</template>


<script lang="ts" setup>
import BaseTable from "../../../components/tables/index.vue";
import BaseForm from "../../../components/forms/index.vue";
import { useI18n } from "../../../hooks/useI18n";
import type { TabsPaneContext, DropdownInstance } from 'element-plus';
import { reactive, ref, toRefs, toRaw } from "vue";
import { FormOptions, FormInstance } from '../../../components/forms/types/index';
import { paginatedList } from "../../../types/system/common";
import { getLocations } from "../../../api/apiPoint";
import XEUtils from 'xe-utils';
let param = reactive<paginatedList>({
  currentPage: 1,
  pageSize: 10,
  searchText: ""
});
const activeName = ref('all');
const activeSecondName = ref("detail");
const { t } = useI18n();
const lang = { detail: t("tags.detail"), all: t("tags.all"), storageLocation: t("tags.storageLocation"), lock: t("tags.lock") }
const optionList = ref([
  { label: '是', value: '是' },
  { label: '否', value: '否' }
]);
let tableRowData: any = reactive({
  label: "", qualifiedName: "", longName: "", mfName: "", height: "", width: "", maxWeight: "", side: "", x: "", y: "", z: "",
  lockMask: "", tsuCount: "", nameFormat: "", operator: "", created: "", updated: ""
});
let { label, qualifiedName, longName, mfName, height, width, maxWeight, side, x, y, z, lockMask, tsuCount, nameFormat, operator, created, updated } = toRefs(tableRowData);
const data: any = reactive({
  id: "location",
  border: false,
  showHeaderOverflow: true,
  showOverflow: true,
  columns: [],
  rowConfig: { keyField: "id", isHover: true },
  customConfig: {},
  printConfig: {},
  sortConfig: {},
  filterConfig: {},
  pagerConfig: {},
  formConfig: {},
  toolbarConfig: {},
  proxyConfig: { ajax: { query: ({ page, sort, sorts, filters, form }: { page?: any, sort?: any, sorts?: any, filters?: any, form?: any }) => Promise<any>, delete: ({ body, form }: { body?: any, form?: any }) => Promise<any> } },
  importConfig: {},
  exportConfig: {},
  checkboxConfig: {},
  editRules: {},
  editConfig: {},
  type: "text",
  placeholder: "请使用"
});
data.formConfig = {
  titleWidth: 0,
  titleAlign: 'left',
  align: "left",
  items: [
    { field: 'searchText', align: 'right', span: 4, itemRender: { name: '$input', props: { placeholder: t("view_app.searchMes") } } },
    {
      span: 3, align: 'right', collapseNode: false, itemRender: {
        name: '$buttons', children: [
          { props: { type: 'submit', content: t("buttons.search"), status: 'primary' } }, { props: { type: 'reset', content: t("buttons.reset") } }]
      }
    }
  ]
},
  data.filterConfig = {
    showIcon: false
  },
  data.toolbarConfig = {
    tools: [{
      name: "Available operations",
      type: "text",
      dropdowns: [
        {
          name: "Create location",
          type: "button",
          status: "primary"
        }
      ],
    }]
  };
data.columns = [
  {
    title: t("columns.fullyQualifiedName"),
    children: [
      {
        field: "fullyQualifiedName",
        filters: [
          { data: '' }
        ],
        filterMethod({ option, row, column }: { option: any, row: any, column: any }) {
          if (option.data) {
            return XEUtils.toValueString(row[column.field]).toLowerCase().indexOf(option.data.toLowerCase()) > -1
          }
          return true
        },
        slots: { header: 'header_input' }
      }
    ]
  },
  {
    title: t("columns.locationType"),
    children: [
      {
        field: "locationType",
        filters: [
          { data: '' }
        ],
        filterMethod({ option, row, column }: { option: any, row: any, column: any }) {
          if (option.data) {
            return XEUtils.toValueString(row[column.field]).toLowerCase().indexOf(option.data.toLowerCase()) > -1
          }
          return true
        },
        slots: { header: 'header_input' }
      }
    ]
  },
  {
    title: t("columns.parentName"),
    children: [
      {
        field: "parentName",
        filters: [
          { data: '' }
        ],
        filterMethod({ option, row, column }: { option: any, row: any, column: any }) {
          if (option.data) {
            return XEUtils.toValueString(row[column.field]).toLowerCase().indexOf(option.data.toLowerCase()) > -1
          }
          return true
        },
        slots: { header: 'header_input' }
      }
    ]
  },
  {
    title: t("columns.locationName"),
    children: [
      {
        field: "locationName",
        filters: [
          { data: '' }
        ],
        filterMethod({ option, row, column }: { option: any, row: any, column: any }) {
          if (option.data) {
            return XEUtils.toValueString(row[column.field]).toLowerCase().indexOf(option.data.toLowerCase()) > -1;
          }
          return true;
        },
        slots: { header: 'header_input' }
      }
    ]
  },
  {
    title: t("columns.isLock"),
    children: [
      {
        field: "isLock",
        filters: [
          { data: '' }
        ],
        filterMethod({ option, row, column }: { option: any, row: any, column: any }) {
          if (option.data) {
            return XEUtils.toValueString(row[column.field]).toLowerCase().indexOf(option.data.toLowerCase()) > -1;
          }
          return true;
        },
        slots: { header: 'header_select' }
      }
    ]
  }
];

data.proxyConfig.ajax = {
  query: ({ page, sort, sorts, filters, form }: { page?: any, sort?: any, sorts?: any, filters?: any, form?: any }) => {
    return new Promise(resolve => {
      param.currentPage = page.currentPage;
      param.pageSize = page.pageSize;
      param.searchText = form.searchText;
      getLocations(param).then(res => {
        let resultList: any = []
        const list: any = res.data;
        list.dataList.map(function (item: any) {
          let dataState: any = {};
          dataState['id'] = item.id;
          dataState['fullyQualifiedName'] = item.fullQualifiedName;
          dataState['locationType'] = item.locationType?.textKey;
          dataState['parentName'] = item.parent?.mFName;
          dataState["locationName"] = item.name;
          dataState["isLock"] = (Array.isArray(item.locks) && item.locks.length === 0) ? "否" : "是";

          dataState['label'] = item.label;
          dataState['qualifiedName'] = item.qualifiedName;
          dataState['longName'] = item.longName;
          dataState['mfName'] = item.mfName;
          dataState['height'] = item.height;

          dataState['width'] = item.width;
          dataState['maxWeight'] = item.maxWeight;
          dataState['side'] = item.side;
          dataState['x'] = item.x;
          dataState['y'] = item.y;
          dataState['z'] = item.z;
          dataState['lockMask'] = item.lockMask;
          dataState['tsuCount'] = item.tsuCount;

          dataState['nameFormat'] = item.nameFormat;
          dataState['operator'] = item.operator;
          dataState['created'] = XEUtils.toDateString(item.created, 'yyyy-MM-dd HH:ss:mm')
          dataState['updated'] = XEUtils.toDateString(item.updated, 'yyyy-MM-dd HH:ss:mm');
          resultList.push(dataState);
        });
        resolve({
          result: resultList,
          page: {
            total: list.totalCount,
          }
        })
      })
    })
  },
  delete: ({ body, form }: { body?: any, form?: any }) => {
    return new Promise(resolve => {
      resolve({
        result: null,
        page: {
          total: 0,
        }
      })
    })
  }
};
let options: FormOptions[] = [
  {
    type: 'input',
    value: label,
    prop: "label",
    label: t("columns.label"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: qualifiedName,
    prop: "qualifiedName",
    label: t("columns.qualifiedName"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: longName,
    prop: "longName",
    label: t("columns.longName"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: mfName,
    prop: "mfName",
    label: t("columns.mfName"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: height,
    prop: "height",
    label: t("columns.height"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: width,
    prop: "width",
    label: t("columns.width"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: maxWeight,
    prop: "maxWeight",
    label: t("columns.maxWeight"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: side,
    prop: "side",
    label: t("columns.side"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: x,
    prop: "x",
    label: t("columns.x"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: y,
    prop: "y",
    label: t("columns.y"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: z,
    prop: "z",
    label: t("columns.z"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: lockMask,
    prop: "lockMask",
    label: t("columns.lockMask"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: tsuCount,
    prop: "tsuCount",
    label: t("columns.tsuCount"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: nameFormat,
    prop: "nameFormat",
    label: t("columns.nameFormat"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: operator,
    prop: "operator",
    label: t("columns.operator"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: created,
    prop: "created",
    label: t("columns.created"),
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: updated,
    prop: "updated",
    label: t("columns.updated"),
    attrs: {
      disabled: true,
    }
  },
];
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
};
const handleSecondClick = (tab: TabsPaneContext, event: Event) => {

}

const currentChange = (valueProxy: any) => {
  let dataValue = toRaw(valueProxy);
  console.log("1111", dataValue);
  label.value = dataValue.label;
  qualifiedName.value = dataValue.qualifiedName;
  longName.value = dataValue.longName;
  mfName.value = dataValue.mfName;
  height.value = dataValue.height;

  width.value = dataValue.width;
  maxWeight.value = dataValue.maxWeight;
  side.value = dataValue.side;
  x.value = dataValue.x;
  y.value = dataValue.y;
  z.value = dataValue.z;
  lockMask.value = dataValue.lockMask;
  tsuCount.value = dataValue.tsuCount;

  nameFormat.value = dataValue.nameFormat;
  operator.value = dataValue.operator;
  created.value = dataValue.created;
  updated.value = dataValue.updated;
}
</script>

<style></style>