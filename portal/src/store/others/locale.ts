import { defineStore } from 'pinia';
//utils
import i18n  from "../../utils/i18n/index";
import {isNullAndUnDef}  from "../../utils/is";
//hooks
import {useStorage} from "../../hooks/useStorage";

const { getStorage, setStorage } = useStorage();
const chromeLanguage:string =navigator.language;
export const useLanguageStore = defineStore('locale', {
	state: () => {
    return{
      currentLocale: isNullAndUnDef(getStorage("language"))?chromeLanguage:getStorage("language"),
      localeMap: [
        {
          lang: 'zh-CN',
          name: '简体中文'
        },
        {
          lang: 'en',
          name: 'English'
        }
      ]
    }
	},
	getters: {
    getCurrentLocale(): string {
      return this.currentLocale;
  },
    getLocaleMap(): {lang:string,name:string}[]{
      return this.localeMap;
    }
},
	actions: {
	   set_locale(locale:any){
      this.currentLocale = locale;
      debugger;
      setStorage('language', locale.lang);
     }
	}
});


