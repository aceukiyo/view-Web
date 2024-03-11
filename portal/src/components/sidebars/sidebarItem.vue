<template>
	<!-- <template>
	<div class="line"></div>
</template> -->
	<template v-for="item in routes" :key="item.path">
		<el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
			<template #title v-if="item.meta.icon">
				<el-icon><svg-icon :icon-class="item.meta.icon" /></el-icon>
				<span>{{ item.meta.title }}</span>
			</template>
			<template #title v-else>{{ item.meta.title }}</template>
			<!-- resursive traversal -->
			<sidebarItem :routerList="( item.children as CustomRouteRecordRaw[])" />
		</el-sub-menu>	
		<el-menu-item :index="item.path" v-else>
			<template v-if="item.meta.icon">
				<el-icon><svg-icon :icon-class="item.meta.icon" /></el-icon>
				<span>{{ item.meta.title }}</span>
			</template>
			<template v-else>
				{{ item.meta.title }}
			</template>
		</el-menu-item>
	</template>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

type CustomRouteRecordRaw = RouteRecordRaw & {
	meta: {
		isShow?: boolean,
	};
};
const props = defineProps({
	routerList: {
		type: Array as () => any,
		required: true
	}
});
let routes = (props.routerList as  CustomRouteRecordRaw[]).filter(r => r.meta && r.meta.isShow) ;
</script>
<style lang="scss" scoped>
.line{
	height: 1px;
	background-color: #fff;
} 
.is-active {
	background: #fff;
	font-weight: 700;
}

.el-menu-item {
	background-color: #5880a5;
	&:hover {
		background-color: #fff;
		font-weight: 700;
	}
}

.el-menu--collapse {
	.el-menu-item {
		justify-content: center;
		background-color: #fff;
	}
}
</style>


