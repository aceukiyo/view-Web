<template>
	<div class="sidebar">
		<div class="sidebar-logo flex-center">
			<svg-icon icon-class="logo" />
			<span></span>
		</div>
		<!-- <div class="collapse-btn" @click="toggleDrawer">折叠按钮</div> -->

		<!-- el-drawer 抽屉 -->
		<!-- <el-drawer
			v-model:visible="showDrawer"
			size="250px"
			:with-header="false"
			:show-close="false"
			direction="ltr"
		>
			<SideBarItem :routerList="routerList" />
		</el-drawer> -->

		<el-menu

			active-text-color="#fff"
			background-color="#001529"
			:default-active="$route.path"
			text-color="#999"
			:unique-opened="true"
			router
		>
			<SideBarItem :routerList="routerList" />
		</el-menu>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SideBarItem from './sidebarItem.vue';
import router from '../../router/index';

// const showDrawer = ref(false);
const routerList = router.options.routes;

// const toggleDrawer = () => {
// 	showDrawer.value = !showDrawer.value;
// };
</script>

<style lang="scss" scoped>
.sidebar {
	height: 100%;
	.sidebar-logo {
		height: 48px;
		background-color: #fff;
		color: #fff;
		font-weight: 700;
		line-height: 48px;
		text-align: center;
		font-size: 20px;
	}

	/* .collapse-btn {
		cursor: pointer;
		padding: 10px;
		background-color: #333;
		color: #fff;
	} */

	.el-menu {
		height: calc(100% - 48px);
		border-right: 0;
		overflow: auto;
		width: 250px;
		/* background: linear-gradient(to bottom, #002140, gray); */
		background-color: #fff;
		color: #fff;
		padding: 20px;
	}
}
</style>
