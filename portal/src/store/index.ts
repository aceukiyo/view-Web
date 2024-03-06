import  {useUserInfoStore}  from "./others/userInfos";
import { useTagsStore } from "./others/tags";
import { useSidebarStore } from "./others/sidebar";
import { useAppStore } from "./app";
import {useLanguageStore} from "./others/locale";
// 
import {store} from "./setUpStore";
export default function useStore() {
  return {
    userInfo: useUserInfoStore(),
    userTag: useTagsStore(),
    userSidebar: useSidebarStore(),
    userApp: useAppStore(),
    useLocale: useLanguageStore()
  }
}

export const useLocaleStoreWithOut = () => {
  return useLanguageStore(store)
}
