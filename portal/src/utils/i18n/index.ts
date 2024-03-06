import { createI18n } from 'vue-i18n';
import zhCn from './lang/zh';
import en from './lang/en';
import useStore,{useLocaleStoreWithOut} from "../../store/index";

const getCurrentLocale  = useLocaleStoreWithOut().getCurrentLocale;
console.log("the current language ",getCurrentLocale);
const i18n = createI18n({
  locale: getLanguage(getCurrentLocale),
  messages: {
    zhCn,
    en
  },
  legacy: false,
  globalInjection:true,
});

function getLanguage(lang:string){
switch(lang){
  case "zh-CN":
    return 'zhCn';
    case "en":
    return "en";
}
}
export default i18n;
