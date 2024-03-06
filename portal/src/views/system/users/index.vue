
<template>
  <div class="flex w-100% h-100%">
    <ContentWrap class="flex-[10] ml-20px">
      <base-button size="default" type="primary" @click="addAction">{{ t("buttons.create") }}
      </base-button>
      <BaseTable :id=data.id :border=data.border :showHeaderOverflow=data.showHeaderOverflow
        :showOverflow=data.showOverflow :height=data.height :columns=data.columns :rowConfig=data.rowConfig
        :columnConfig=data.columnConfig :customConfig=data.customConfig :printConfig=data.printConfig
        :sortConfig=data.sortConfig :filterConfig=data.filterConfig :formConfig=data.formConfig
        :toolbarConfig=data.toolbarConfig :proxyConfig=data.proxyConfig :importConfig=data.importConfig
        :export-config=data.exportConfig :checkbox-config=data.checkboxConfig :pager-config=data.pagerConfig :editRules={}
        :edit-config={} @checkValue="currentChecked"></BaseTable>
    </ContentWrap>
    <Dialog v-model="dialogVisible" :title="dialogTitle">
      <add></add>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, unref, nextTick, watch, reactive, toRaw } from 'vue';
import BaseButton from '../../../components/buttons/index.vue';
import Dialog from "../../../components/dailogs/index.vue";
import BaseTable from "../../../components/tables/index.vue";
import ContentWrap from "../../../components/contentWraps/index.vue";
import { useI18n } from "../../../hooks/useI18n";
import add from "./add.vue";

//API
import { getUsers } from "../../../api/apiPoint";

const { t } = useI18n();
interface BasicParameter {
  currentPage: number,
  pageSize: number,
  searchText: string,
}
let param = reactive<BasicParameter>({
  currentPage: 1,
  pageSize: 10,
  searchText: ""
});
const dialogVisible = ref(false);
const dialogTitle = ref('');
const isChecked = ref(false);
function addAction() {
  dialogTitle.value = t("buttons.create");
  dialogVisible.value = true;
}
const data: any = reactive({
  id: "user",
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
data.toolbarConfig = {
  refresh: true,
  zoom: true,
  buttons: [{ code: "delete", name: t("buttons.deleteCheck"), status: "danger", placement: "bottom", visible: isChecked }],
  slots: {
    tools: 'toolbar_tools'
  }
},
  data.columns = [
    { type: 'checkbox', width: 120 },
    {
      title: t("userName"),
      children: [
        {
          field: "userName",
          filters: [
            { data: '' }
          ],
          slots: { header: 'header_input' }
        }

      ]
    },
    { field: 'name', title: t("name"), sortable: true, },
    {
      field: 'role',
      title: t("role"),
      sortable: true,
      filters: [
        { label: '管理员', value: 'admin' },
        { label: '用户', value: 'user' },
        { label: '超级管理员', value: 'superAdmin' },
      ],
      filterMultiple: false,
    },
    {
      field: 'email', title: t("email"), filterRender: { name: "input" },
    },
    { field: 'shortName', title: t("shortName") },
    {
      field: 'updateDate',
      title: 'Update Date',
    },
    { title: '操作', width: 300, slots: { default: 'operate' } }
  ];
data.proxyConfig.ajax = {
  query: ({ page, sort, sorts, filters, form }: { page?: any, sort?: any, sorts?: any, filters?: any, form?: any }) => {
    return new Promise(resolve => {
      param.currentPage = page.currentPage;
      param.pageSize = page.pageSize;
      console.log("111", filters, form)
      getUsers(param).then(res => {
        let resultList: any = []
        const list: any = res.data;
        list.dataList.map(function (item: any) {
          let dataState: any = {};
          dataState['id'] = item.id;
          dataState['email'] = item.email;
          dataState['englishName'] = item.englishName;
          dataState['name'] = item.name;
          dataState["locationName"] = item.name;
          dataState["position"] = item.position;
          dataState['shortName'] = item.shortName;
          dataState['userName'] = item.userName;
          dataState["role"] = ((item.roles?.map((r: any) => r.name)).join("/")).toString();
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
      console.log("1123", body)
      resolve({
        result: null,
        page: {
          total: 0,
        }
      })
    })

  }
};
const currentChecked = (valueProxy: any, checked: boolean) => {
  let dataValue = toRaw(valueProxy);
  isChecked.value = checked;
  console.log("1111", dataValue, checked);
}
data.pagerConfig = {
  enabled: true,
  currentPage: 1,
  pageSize: 10
};



</script>

