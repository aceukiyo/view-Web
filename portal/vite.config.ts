import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin,VxeTableResolve } from "vite-plugin-style-import";
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		createStyleImportPlugin({
			resolves: [
				VxeTableResolve()
			],
		})
	],

	css: {
		preprocessorOptions: {
			less: {
				additionalData: '@import "./src/styles/variables.module.less";',
				javascriptEnabled: true
			}
		}
	},
	optimizeDeps: {
		include: ['schart.js']
	},
	server:{
		//host:"127.0.0.1",
		port:3000,
		open:true,
	}
});
