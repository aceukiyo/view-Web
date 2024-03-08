import { createApp } from 'vue';
import  {setupElementPlus}  from '../src/plugin/elementPlus';
import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';
import './assets/css/icon.css';
import {createPinia} from "pinia"
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'vxe-table/lib/style.css'
import i18n from './utils/i18n';
//初始化vxe-table style
import 'vxe-table/lib/style.css';
//初始化less
import "../src/styles/index.less";
import './mock.js';
import {
    VXETable,
    Icon,
    Button,
    Column,
    Menu,
    Table,
    VxeGrid,
    Filter,
    Toolbar,
    Pager,
    Form,
    Input,
    FormItem,
    Select,
    Edit,
    Keyboard,
    Tooltip,
    Option,
    Optgroup,
    List
  } from 'vxe-table';

import {setupStore} from "./store/setUpStore";
const app = createApp(App);
function useTable (app: any) {
    app.use(Icon)
    .use(Column)
    .use(Table).use(VxeGrid)
    .use(Filter).use(Toolbar).use(Button).use(Pager)
    .use(Form).use(Input).use(FormItem).use(Select)
    .use(Edit).use(Keyboard).use(Tooltip).use(Menu)
    .use(Option).use(Optgroup).use(List)
  }
setupStore(app);
setupElementPlus(app);
app.use(router);
app.use(i18n);
app.use(useTable);
app.mount('#app');
