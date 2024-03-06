<template>
  <div>
    <BaseTable :id=data.id :border=data.border :showHeaderOverflow=data.showHeaderOverflow :showOverflow=data.showOverflow
      :height=data.height :columns=data.columns :columnConfig=data.columnConfig :customConfig=data.customConfig
      :printConfig=data.printConfig :sortConfig=data.sortConfig :filterConfig=data.filterConfig
      :formConfig=data.formConfig :toolbarConfig=data.toolbarConfig :proxyConfig=data.proxyConfig
      :importConfig=data.importConfig :export-config=data.exportConfig :checkbox-config=data.checkboxConfig
      :pager-config=data.pagerConfig :editRules={} :edit-config={} :options="optionList" @changeValue="currentChange">
    </BaseTable>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label=lang.detail name="detail">
        <BaseForm ref="form" label-width="100px" inline=true :options='options' @on-change="" @before-upload=""
          @on-preview="" @on-remove="" @before-remove="" @on-success="" @on-exceed=""></BaseForm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import BaseTable from "../../../components/tables/index.vue";
import { reactive, ref, toRefs, toRaw } from "vue";
import { useI18n } from "../../../hooks/useI18n";
import XEUtils from 'xe-utils';
import BaseForm from "../../../components/forms/index.vue";
import { FormOptions, FormInstance } from '../../../components/forms/types/index'
//api
import { getTuses } from "../../../api/apiPoint";
import type { TabsPaneContext } from 'element-plus';
import { paginatedList } from "../../../types/system/common"

let param = reactive<paginatedList>({
  currentPage: 1,
  pageSize: 10,
  searchText: ""
});
const data: any = reactive({
  id: "tsu",
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
  placeholder: "qing 使用"
});
const optionList = ref([
  { label: 'SYSTEM', value: 'SYSTEM' },
  { label: 'view_transport_event_bus', value: 'view_transport_event_bus' }
]);
let resultList = [
{ label: 'WB1', lastStorage: 'PID1', tsuType_label: 'Status1', location_label: 'Flight1', container: '2024-03-04', task: 'Area1', operator: 'Location1' },

]
let tableRowData: any = reactive({ weight: "", width: "", length: "", height: "" });
let { weight, width, length, height } = toRefs(tableRowData);
const { t } = useI18n();
const lang = { detail: t("details") }
const activeName = ref('detail');
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
data.formConfig = {
  titleWidth: 100,
  titleAlign: 'right',
  align: "right",
  items: [
    { field: 'searchText', align: 'right', span: 6, itemRender: { name: '$input', props: { placeholder: t("view_app.searchMes") } } },
    {
      span: 10, align: 'right', collapseNode: false, itemRender: {
        name: '$buttons', children: [
          { props: { type: 'submit', content: t("buttons.search"), status: 'primary' } }, { props: { type: 'reset', content: t("buttons.reset") } }]
      }
    }
  ]
},
  data.filterConfig = {
    showIcon: false
  },
  data.columns = [
    {
      title: t("columns.label"),
      className: "my-table",
      children: [
        {
          field: "label",
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
      field: 'lastStorage',
      title: t("columns.lastStorage"),
    },
    {
      field: 'tsuType_label',
      title: t("columns.tsuType"),
    },
    {
      title: t("columns.location"),
      titlePrefix: { useHTML: true, message: `<a  style="color:white" href=${"#/location"} >${t("view_app.locationTitle")}</a>`, icon: 'vxe-icon-question-circle-fill' },
      children: [
        {
          field: "location_label",
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
      field: 'container',
      title: t("columns.container"),
    },
    {
      field: 'task',
      title: t("columns.task"),
    },
    {
      title: t("columns.operator"),
      children: [
        {
          field: 'operator',
          filters: [
            { data: '' }
          ],
          filterMethod({ option, row, column }: { option: any, row: any, column: any }) {
            if (option.data) {
              return row[column.field] === option.data
            }
            return true
          },
          slots: {
            header: 'header_select'
          }
        }
      ]
    },
    {
      field: 'updated',
      title: t("columns.updated"),
      sortable: true,
      formatter({ cellValue, row, column }: { cellValue: any, row: any, column: any }) {
        return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm');
      }
    },
  ];
  data.proxyConfig.ajax = {
    query: ({ page, sort, sorts, filters, form }: { page?: any, sort?: any, sorts?: any, filters?: any, form?: any }) => {
      return new Promise(resolve => {
        resolve({
        result: resultList,
        page: {
          total: resultList.length,
        }
      });
    });
  },
    }
// data.proxyConfig.ajax = {
//   query: ({ page, sort, sorts, filters, form }: { page?: any, sort?: any, sorts?: any, filters?: any, form?: any }) => {
//     return new Promise(resolve => {
//       param.currentPage = page.currentPage;
//       param.pageSize = page.pageSize;
//       param.searchText = form.searchText;
//       getTuses(param).then(res => {
//         let resultList: any = []
//         const list: any = res.data;
//         list.dataList.map(function (item: any) {
//           let dataState: any = {};
//           dataState['id'] = item.id;
//           dataState['label'] = item.label;
//           dataState['weight'] = item.weight;
//           dataState['width'] = item.width;
//           dataState["length"] = item.length;
//           dataState['height'] = item.height;
//           dataState['lastStorage'] = item.lastStorage;
//           dataState['tsuType_label'] = item.tsuType?.label;
//           dataState['location_label'] = item.location?.label;
//           dataState['container'] = item.container;
//           dataState['task'] = item.task;
//           dataState['operator'] = item.operator;
//           dataState['updated'] = item.updated;
//           resultList.push(dataState);
//         });
//         resolve({
//           result: resultList,
//           page: {
//             total: list.totalCount,
//           }
//         })
//       })
//     })
//   },
//   delete: ({ body, form }: { body?: any, form?: any }) => {
//     return new Promise(resolve => {
//       resolve({
//         result: null,
//         page: {
//           total: 0,
//         }
//       })
//     })
//   }
// };
let options: FormOptions[] = [
  {
    type: 'input',
    value: weight,
    label: t("weight"),
    prop: 'weight',
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: width,
    label: t("width"),
    prop: 'width',
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: length,
    label: t("length"),
    prop: 'length',
    attrs: {
      disabled: true,
    }
  },
  {
    type: 'input',
    value: height,
    label: t("height"),
    prop: 'height',
    attrs: {
      disabled: true,
    }
  },
];
const currentChange = (valueProxy: any) => {
  let dataValue = toRaw(valueProxy);
  weight.value = dataValue.weight;
  width.value = dataValue.width;
  length.value = dataValue.length;
  height.value = dataValue.height;
}
</script>
<style></style>