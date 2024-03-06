<template>
	<div class="sidebar">
		<div class="sidebar-logo flex-center">
			<svg-icon icon-class="logo" />
			<span></span>
		</div>

		<!-- 导航菜单 -->
    <!-- active-text-color：当前菜单项被选中时，字体的颜色 -->
		<!-- background-color：这个menu菜单的背景色 -->
		<!-- default-active：	当前激活菜单的 index -->
		<!-- text-color：菜单项字体颜色 -->
		<!-- unique-opened：unique-opened	是否只保持一个子菜单的展开 -->
		<!-- router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
		<div class="aside-drawer">
      <el-drawer
          :size="250"
          :with-header="false"
          :show-close="false"
          direction="ltr">
        <AsideMenu/>
      </el-drawer>
    </div>
		<!-- <el-menu
			active-text-color="#fff"
			background-color="#001529"
			:default-active="$route.path"
			text-color="#999"
			:unique-opened="true"
			router>
			<SideBarItem :routerList="routerList" />
		</el-menu> -->
	</div>
</template>
<script lang="ts" setup>
import SideBarItem from './sidebarItem.vue';
import  router  from '../../router/index';

const routerList = router.options.routes ;
</script>

<style  scoped>
.sidebar {
	height: 100%;
	.sidebar-logo {
		height: 48px;
		background-color: #002140;
		color: #fff;
		font-weight: 700;
		line-height: 48px;
		text-align: center;
		font-size: 20px;
	}
	.el-menu {
		height: calc(100% - 48px);
		border-right: 0;
		overflow: auto;
		width: 250px;
		background: linear-gradient(to bottom, #002140, gray); /* 渐变深灰色背景 */
		color: #fff; /* 白色文本 */
		padding: 20px;
	}
}
</style>

