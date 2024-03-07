<template>
    <!-- <el-button type="primary" style="margin-left: 16px" @click=toggleDrawer>
      open
    </el-button> -->
  
    
    <el-drawer :size="250"
          :with-header="false"
          :show-close="false"
          direction="ltr"
          :visible.sync="drawer">
         <sidebarItem :routerList="routerList" :drawer="drawer"></sidebarItem>
    </el-drawer>
  </template>
  
  <script lang="ts" setup>
  import sidebarItem from './sidebarItem.vue';
  import  router  from '../../router/index';
  import { ref } from 'vue'
  const drawer = ref(false)
  const routerList = router.options.routes ;
  const toggleDrawer = () => {
    drawer.value = !drawer.value;
};
  </script>