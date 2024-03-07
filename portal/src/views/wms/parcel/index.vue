<template>
  <div>
    <BaseTable :id=data.id :border=data.border :showHeaderOverflow=data.showHeaderOverflow :showOverflow=data.showOverflow
      :height=data.height :columns=data.columns :columnConfig=data.columnConfig :customConfig=data.customConfig
      :printConfig=data.printConfig :sortConfig=data.sortConfig :filterConfig=data.filterConfig
      :formConfig=data.formConfig :toolbarConfig=data.toolbarConfig :proxyConfig=data.proxyConfig
      :importConfig=data.importConfig :export-config=data.exportConfig :checkbox-config=data.checkboxConfig
      :pager-config=data.pagerConfig :editRules={} :edit-config={} :options="optionList" @changeValue="currentChange">
    </BaseTable>
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
import { getParcels } from "../../../api/apiPoint";
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
  placeholder: ""
});
const optionList = ref([
  { label: 'SYSTEM', value: 'SYSTEM' },
  { label: 'view_transport_event_bus', value: 'view_transport_event_bus' }
]);
let resultList = [
  { wb: 'WB1', pid: 'PID1', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-04', storageArea: null, storageLocation: 'Location1' },
  { wb: 'WB2', pid: 'PID2', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-05', storageArea: null, storageLocation: 'Location2' },
  { wb: 'WB3', pid: 'PID1', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-04', storageArea: null, storageLocation: 'Location1' },
  { wb: 'WB4', pid: 'PID2', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-05', storageArea: null, storageLocation: 'Location2' },
  { wb: 'WB5', pid: 'PID1', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-04', storageArea: null, storageLocation: 'Location1' },
  { wb: 'WB6', pid: 'PID2', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-05', storageArea: null, storageLocation: 'Location2' },
  { wb: 'WB7', pid: 'PID1', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-04', storageArea: null, storageLocation: 'Location1' },
  { wb: 'WB8', pid: 'PID2', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-05', storageArea: null, storageLocation: 'Location2' },
  { wb: 'WB9', pid: 'PID1', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-04', storageArea: null, storageLocation: 'Location1' },
  { wb: 'WB10', pid: 'PID2', custom_status: 'INSP', flightNo: null, flightDate: '2024-03-05', storageArea: null, storageLocation: 'Location2' },

  // test data...
];
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
      title: t("columns.wb"),
      className: "parcel",
      children: [
        {
          field: "wb",
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
      field: 'pid',
      title: t("columns.pid"),
    },
    {
      field: 'custome_status',
      title: t("columns.customStatus"),
    },
    {
      title: t("columns.flightNo"),
      //titlePrefix: { useHTML: true, message: `<a  style="color:white" href=${"#/location"} >${t("view_app.locationTitle")}</a>`, icon: 'vxe-icon-question-circle-fill' },
      children: [
        {
          field: "flightNo",
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
      field: 'flightDate',
      title: t("columns.flight_date"),
    },
    {
      field: 'storageArea',
      title: t("columns.storage_area"),
    },
    {
      title: t("columns.storage_location"),
      children: [
        {
          field: 'storageLocation',
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
            header: 'header_input'
          }
        }
      ]
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
  // ...
};
// data.proxyConfig.ajax = {
//   query: ({ page, sort, sorts, filters, form }: { page?: any, sort?: any, sorts?: any, filters?: any, form?: any }) => {
//     return new Promise(resolve => {
//       param.currentPage = page.currentPage;
//       param.pageSize = page.pageSize;
//       param.searchText = form.searchText;
//       getParcels(param).then(res => {
//         let resultList: any = []
//         const list: any = res.data;

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

const currentChange = (valueProxy: any) => {
  let dataValue = toRaw(valueProxy);

}
</script>
<style></style>