<template>
  <ElDropdown :class="prefixCls" trigger="click" @command="setLang" style="margin-right:30px">
    <Icon
      :size="25"
      icon="ion:language"
      class="cursor-pointer !p-0"
      :class="$attrs.class"
      :color= '"#666666"'
    />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in langMap" :key="item.lang" :command="item.lang">
          {{ item.name }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
<script setup lang="ts">
import { computed, unref } from 'vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { propTypes } from '../../utils/propType';
import { useDesign } from '../../hooks/useDesign';
import useStore from "../../store/index";
import {  useStorage } from "../../hooks/useStorage";
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls('locale-dropdown');

// defineProps({
//   color: propTypes.string.def(''),
// });






const localeStore = useStore().useLocale;
const langMap = computed(() => localeStore.getLocaleMap);
const currentLang = computed(() => localeStore.getCurrentLocale);
const setLang = (lang: string) => {
  if (lang === unref(currentLang)) return;
  window.location.reload();
  localeStore.set_locale({
    lang
  });
  // const { changeLocale } = useLocale();
  // changeLocale(lang);
}
</script>
